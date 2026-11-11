import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL || "https://tvet.si";

export default defineConfig({
  site,
  trailingSlash: "always",
  i18n: {
    locales: ["ru", "en", "zh", "de", "fr", "es"],
    defaultLocale: "ru",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => page !== new URL("/", site).toString(),
      i18n: {
        defaultLocale: "ru",
        locales: { ru: "ru-RU", en: "en", zh: "zh-Hans", de: "de-DE", fr: "fr-FR", es: "es-ES" },
      },
    }),
  ],
});

