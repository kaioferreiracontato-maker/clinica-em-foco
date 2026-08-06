// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Domínio de produção (ativa canonical/OG absolutos). Trocar quando houver domínio próprio.
  site: "https://clinica-em-foco-ten.vercel.app",

  build: {
    // LP single-page: inlina todo o CSS no HTML (sem folha externa bloqueando render).
    inlineStylesheets: "always",
  },
});
