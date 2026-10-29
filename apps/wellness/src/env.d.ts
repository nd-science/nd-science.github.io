/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_STATUS?: "draft" | "public";
  readonly PUBLIC_SCIENCE_SITE_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL_WELLNESS?: string;
  readonly PUBLIC_CALENDAR_PROVIDER?: string;
  readonly PUBLIC_ANALYTICS_PROVIDER?: string;
  readonly FORMS_ENDPOINT_WELLNESS?: string;
  readonly PUBLIC_FORMS_ENABLED?: "true" | "false";
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN?: string;
  readonly PAYMENT_PROVIDER?: string;
  readonly PAYMENT_RETURN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
