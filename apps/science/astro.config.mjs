import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL || "https://science.invalid";
const isPublic = process.env.PUBLIC_SITE_STATUS === "public";

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
  integrations: isPublic
    ? [
        sitemap({
          i18n: {
            defaultLocale: "ru",
            locales: { ru: "ru-RU", en: "en" },
          },
        }),
      ]
    : [],
});

