import type { LocalizedText, Locale, PublicProfile } from "@natali/profile";

export type SiteStatus = "draft" | "public";

export interface LocalizedPaths {
  ru: string;
  en: string;
}

export interface SeoInput {
  siteUrl: string;
  locale: Locale;
  paths: LocalizedPaths;
  status: SiteStatus;
}

export interface AlternateLink {
  hreflang: "ru" | "en" | "x-default";
  href: string;
}

function normalizeSiteUrl(value: string): string {
  const url = new URL(value);
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url.toString();
}

export function absoluteUrl(siteUrl: string, path: string): string {
  return new URL(path.replace(/^\/+/, ""), normalizeSiteUrl(siteUrl)).toString();
}

export function buildSeo(input: SeoInput) {
  const canonical = absoluteUrl(input.siteUrl, input.paths[input.locale]);
  const alternates: AlternateLink[] = [
    { hreflang: "ru", href: absoluteUrl(input.siteUrl, input.paths.ru) },
    { hreflang: "en", href: absoluteUrl(input.siteUrl, input.paths.en) },
    { hreflang: "x-default", href: absoluteUrl(input.siteUrl, input.paths.ru) },
  ];

  return {
    canonical,
    alternates,
    robots:
      input.status === "public"
        ? "index, follow, max-image-preview:large"
        : "noindex, nofollow, noarchive",
  };
}

export interface PersonJsonLdDetails {
  jobTitle?: string;
  alternateName?: string;
  knowsAbout?: string[];
  sameAs?: string[];
}

export function createPersonJsonLd(
  profile: PublicProfile,
  locale: Locale,
  pageUrl: string,
  details?: PersonJsonLdDetails,
) {
  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.displayName[locale],
    url: pageUrl,
    knowsLanguage: profile.languages,
  };

  if (details?.jobTitle) {
    person.jobTitle = details.jobTitle;
  }
  if (details?.alternateName) {
    person.alternateName = details.alternateName;
  }
  if (details?.knowsAbout && details.knowsAbout.length > 0) {
    person.knowsAbout = details.knowsAbout;
  }
  if (details?.sameAs && details.sameAs.length > 0) {
    person.sameAs = details.sameAs;
  }

  return person;
}

export interface BreadcrumbInputItem {
  label: string;
  /** Путь на том же сайте, например `/ru/about/`. Последний элемент может быть без href. */
  path?: string;
}

export function createBreadcrumbJsonLd(
  siteUrl: string,
  items: BreadcrumbInputItem[],
  currentPageUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.path ? absoluteUrl(siteUrl, item.path) : index === items.length - 1 ? currentPageUrl : undefined,
    })),
  };
}

export function createWebPageJsonLd(input: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
  dateModified?: string;
}) {
  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale,
  };
  if (input.dateModified) {
    page.dateModified = input.dateModified;
  }
  return page;
}

export function localizedValue(value: LocalizedText, locale: Locale): string {
  return value[locale];
}

export function formatUpdated(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

export function formatMoney(
  amount: number,
  locale: Locale,
  options?: { maximumFractionDigits?: number },
): string {
  return new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-IE", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "symbol",
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  }).format(amount);
}

export function robotsTxt(status: SiteStatus, siteUrl: string): string {
  if (status !== "public") {
    return "User-agent: *\nDisallow: /\n";
  }

  return [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${absoluteUrl(siteUrl, "/sitemap-index.xml")}`,
    "",
  ].join("\n");
}
