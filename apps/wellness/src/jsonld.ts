import { nataliaProfile } from "@natali/profile";
import { absoluteUrl } from "@natali/seo";
import type { CollectionEntry } from "astro:content";

export function faqPageJsonLd(
  items: CollectionEntry<"faq">[],
  locale: "ru" | "en",
  pageUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.data.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.data.answer[locale],
      },
    })),
  };
}

export function servicesJsonLd(
  items: CollectionEntry<"services">[],
  locale: "ru" | "en",
  pageUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl,
    name: nataliaProfile.displayName[locale],
    itemListElement: items.map((item) => {
      const prices = item.data.price
        ? Array.isArray(item.data.price)
          ? item.data.price
          : [item.data.price]
        : [];

      return {
        "@type": "ListItem",
        itemListElement: {
          "@type": "Service",
          name: item.data.name[locale],
          description: item.data.task[locale],
          provider: {
            "@type": "Person",
            name: nataliaProfile.displayName[locale],
          },
          ...(prices.length > 0
            ? {
                offers: prices.map((price) => ({
                  "@type": "Offer",
                  price: price.amount,
                  priceCurrency: price.currency,
                })),
              }
            : {}),
        },
      };
    }),
  };
}

export function webPageJsonLd(input: {
  siteUrl: string;
  path: string;
  name: string;
  description: string;
  locale: "ru" | "en";
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.siteUrl, input.path),
    inLanguage: input.locale,
    dateModified: input.dateModified,
    author: {
      "@type": "Person",
      name: nataliaProfile.displayName[input.locale],
    },
  };
}
