import { nataliaProfile, PERSON_CANONICAL_ID } from "@natali/profile";
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
            "@id": PERSON_CANONICAL_ID,
            name: nataliaProfile.displayName[locale],
          },
          areaServed: item.data.delivery.includes("in_person")
            ? [
                {
                  "@type": "City",
                  name: locale === "ru" ? "Белград" : "Belgrade",
                },
                {
                  "@type": "AdministrativeArea",
                  name: locale === "ru" ? "Онлайн по всему миру" : "Worldwide (Online)",
                },
              ]
            : [
                {
                  "@type": "AdministrativeArea",
                  name: locale === "ru" ? "Онлайн по всему миру" : "Worldwide (Online)",
                },
              ],
          availableLanguage: ["ru", "en"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "07:00",
            closes: "23:00",
          },
          ...(prices.length > 0
            ? {
                offers: prices.map((price) => ({
                  "@type": "Offer",
                  price: price.amount,
                  priceCurrency: price.currency,
                  description:
                    price.delivery === "in_person"
                      ? locale === "ru"
                        ? "Очно в Белграде"
                        : "In person in Belgrade"
                      : locale === "ru"
                        ? "Онлайн"
                        : "Online",
                  areaServed:
                    price.delivery === "in_person"
                      ? {
                          "@type": "City",
                          name: locale === "ru" ? "Белград" : "Belgrade",
                        }
                      : {
                          "@type": "AdministrativeArea",
                          name:
                            locale === "ru"
                              ? "Онлайн по всему миру"
                              : "Worldwide (Online)",
                        },
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
      "@id": PERSON_CANONICAL_ID,
      name: nataliaProfile.displayName[input.locale],
    },
  };
}
