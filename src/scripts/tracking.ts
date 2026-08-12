/**
 * Camada de tracking da LP: só empurra dataLayer, nunca chama fbq/gtag.
 * Quem transforma isso em Pixel/GA4 é o GTM. Ver TRACKING.md.
 *
 * Eventos emitidos:
 *   checkout_click  clique em qualquer botão que leva ao Sympla (conversão principal)
 *   whatsapp_click  clique em link wa.me
 *   cta_click       clique em CTA interno (âncora) marcado com data-track
 *   outbound_click  clique em link externo genérico (mapa, Instagram)
 *   scroll_depth    25/50/75/90 por cento da página
 */
import { tracking } from "../config";

type Payload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Payload[];
  }
}

function push(event: string, params: Payload = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** Nome da seção onde o clique aconteceu, para segmentar CTA por posição. */
function locationOf(el: Element): string {
  const explicit = el.closest("[data-track-location]");
  if (explicit) return explicit.getAttribute("data-track-location") || "desconhecido";
  const section = el.closest("section[id], header[id], footer[id]");
  return section?.id || "desconhecido";
}

function classify(link: HTMLAnchorElement, href: string): string {
  if (href.includes("sympla.com.br")) return "checkout_click";
  if (href.includes("wa.me") || href.startsWith("https://api.whatsapp.com")) return "whatsapp_click";
  // Âncora interna só conta como CTA quando é botão; link de menu não vira evento.
  if (href.startsWith("#")) return link.classList.contains("btn") ? "cta_click" : "";
  if (/^https?:/i.test(href) && !href.includes(location.host)) return "outbound_click";
  return "";
}

function initClicks() {
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const event = link.getAttribute("data-track") || classify(link, href);
      if (!event) return;

      push(event, {
        cta_location: locationOf(link),
        cta_label: (link.textContent || "").trim().slice(0, 80),
        link_url: link.href,
      });
    },
    { capture: true },
  );
}

function initScrollDepth() {
  const marks = [...tracking.scrollDepth].sort((a, b) => a - b);
  let next = 0;

  const onScroll = () => {
    if (next >= marks.length) {
      window.removeEventListener("scroll", onScroll);
      return;
    }
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const percent = ((window.scrollY || doc.scrollTop) / scrollable) * 100;

    while (next < marks.length && percent >= marks[next]) {
      push("scroll_depth", { percent_scrolled: marks[next] });
      next++;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

initClicks();
initScrollDepth();
