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
 *
 * Também repassa as UTMs da URL para os links do checkout, para a origem da
 * campanha chegar no relatório do Sympla (a inscrição acontece lá, fora do pixel).
 */
import { tracking } from "../config";

/** Domínio do checkout externo. Trocar se a inscrição mudar de plataforma. */
const CHECKOUT_HOST = "sympla.com.br";

/** Parâmetros repassados ao checkout. Prefixo `utm_` entra automaticamente. */
const FORWARD_PARAMS = ["placement", "fbclid", "gclid", "ttclid"];

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
  if (href.includes(CHECKOUT_HOST)) return "checkout_click";
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

/**
 * Repassa as UTMs da LP para os links do checkout.
 *
 * Sem isso a origem morre na página: o Sympla recebe a visita sem parâmetro e o
 * relatório de vendas dele não sabe de qual campanha veio a inscrição. Como a compra
 * acontece fora do alcance do pixel, esse repasse é a única ligação entre anúncio e
 * inscrição real.
 *
 * Parâmetro que já exista no link do checkout é preservado, não sobrescrito.
 */
function forwardParamsToCheckout() {
  const incoming = new URLSearchParams(window.location.search);
  const carry: [string, string][] = [];

  incoming.forEach((value, key) => {
    if (!value) return;
    if (key.startsWith("utm_") || FORWARD_PARAMS.includes(key)) carry.push([key, value]);
  });

  if (!carry.length) return;

  document.querySelectorAll<HTMLAnchorElement>(`a[href*="${CHECKOUT_HOST}"]`).forEach((link) => {
    const url = new URL(link.href);
    for (const [key, value] of carry) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    link.href = url.toString();
  });
}

initClicks();
initScrollDepth();
forwardParamsToCheckout();
