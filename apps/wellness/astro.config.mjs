import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL || "https://natalicompass.com";

// Trigger deployment with Yandex verification: 7369f633f79a694f
export default defineConfig({
  site,
  trailingSlash: "always",
  i18n: {
    locales: ["ru", "en"],
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
        locales: { ru: "ru-RU", en: "en" },
      },
    }),
  ],
});

