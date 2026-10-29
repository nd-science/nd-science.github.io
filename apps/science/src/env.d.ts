/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_STATUS?: "draft" | "public";
  readonly PUBLIC_GOOGLE_CALENDAR_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_WELLNESS_SITE_URL?: string;
  readonly PUBLIC_FORMS_ENABLED?: "true" | "false";
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

