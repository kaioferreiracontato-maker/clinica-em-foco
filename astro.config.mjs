// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Domínio de produção (ativa canonical/OG absolutos).
  site: "https://clinicaemfoco.institutoblu.com.br",

  build: {
    // LP single-page: inlina todo o CSS no HTML (sem folha externa bloqueando render).
    inlineStylesheets: "always",
  },
});
