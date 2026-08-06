// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // ⚠ TROCAR: defina o domínio de produção para ativar canonical/OG absolutos.
  // Mantenha em sincronia com `seo.site` em src/config.ts.
  // site: "https://clinicaemfoco.com.br",

  build: {
    // LP single-page: inlina todo o CSS no HTML (sem folha externa bloqueando render).
    inlineStylesheets: "always",
  },
});
