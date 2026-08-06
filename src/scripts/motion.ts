import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __revealFailsafe?: number;
  }
}

const revealAll = () => {
  document.documentElement.classList.remove("anim");
  try {
    gsap.set(".reveal", { clearProps: "opacity,transform" });
  } catch {}
};

// Header flutuante: revela o CTA e adensa o fundo ao rolar (sempre ativo).
const nav = document.querySelector<HTMLElement>("[data-nav]");
if (nav) {
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 90);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduce) {
  document.documentElement.classList.remove("anim");
} else {
  const start = () => {
    try {
      if (window.__revealFailsafe) clearTimeout(window.__revealFailsafe);
      gsap.registerPlugin(ScrollTrigger);

      // Reveals em lote no scroll (o hero anima via CSS, sem depender daqui).
      const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
      gsap.set(targets, { opacity: 0, y: 26 });
      ScrollTrigger.batch(targets, {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "expo.out",
            overwrite: true,
          }),
      });

      // Parallax suave das lentes decorativas.
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: (el.closest("section") as Element) ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      if ("fonts" in document) (document as any).fonts.ready.then(refresh);
      setTimeout(refresh, 400);
    } catch {
      revealAll();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
}
