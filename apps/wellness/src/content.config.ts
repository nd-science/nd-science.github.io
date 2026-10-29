import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const localizedText = z.object({
  ru: z.string().min(1),
  en: z.string().min(1),
});

const publicationScope = z.enum(["public", "internal", "consent_required"]);

const pageSections = z.enum([
  "services",
  "methods",
  "faq",
  "credentials",
  "enquiry",
  "organisation-form",
]);

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.md" }),
  schema: z
    .object({
      route: z.string().regex(/^[a-z0-9-]+(\/[a-z0-9-]+)*$/, "Пустой маршрут указывается как home"),
      locale: z.enum(["ru", "en"]),
      seoTitle: z.string().min(1),
      seoDescription: z.string().min(1),
      h1: z.string().min(1),
      summary: z.string().min(1),
      audience: z
        .array(z.enum(["B2C", "B2B", "academic", "organisations", "public"]))
        .min(1),
      ctaLabel: z.string().min(1).optional(),
      ctaHref: z.string().min(1).optional(),
      ctaSecondaryLabel: z.string().min(1).optional(),
      ctaSecondaryHref: z.string().min(1).optional(),
      relatedServices: z.array(z.string()).default([]),
      sections: z.array(pageSections).default([]),
      updatedAt: z.coerce.date(),
      publicationScope: publicationScope.default("public"),
    })
    .refine(
      (data) =>
        (data.ctaLabel === undefined) === (data.ctaHref === undefined),
      { message: "ctaLabel и ctaHref указываются вместе" },
    )
    .refine(
      (data) =>
        (data.ctaSecondaryLabel === undefined) ===
        (data.ctaSecondaryHref === undefined),
      { message: "ctaSecondaryLabel и ctaSecondaryHref указываются вместе" },
    ),
});

const money = z.object({
  amount: z.number().nonnegative(),
  currency: z.literal("EUR"),
  unit: z.enum(["session", "participant", "programme"]).optional(),
  delivery: z.enum(["online", "in_person", "hybrid"]).optional(),
});

const services = defineCollection({
  loader: glob({ base: "./src/content/services", pattern: "**/*.json" }),
  schema: z.object({
    name: localizedText,
    audience: localizedText,
    task: localizedText,
    includes: z.array(localizedText).min(1),
    duration: localizedText.optional(),
    delivery: z.array(z.enum(["online", "in_person", "hybrid"])).min(1),
    price: z.union([money, z.array(money)]).optional(),
    priceLabel: localizedText.optional(),
    preparation: z.array(localizedText).optional(),
    outcome: localizedText,
    support: localizedText.optional(),
    limitations: z.array(localizedText).optional(),
    relatedMethods: z.array(z.string()).min(1),
    serviceAvailability: z.enum(["available", "pilot", "planned"]),
    publicationScope: publicationScope.default("public"),
    cta: z.object({ label: localizedText, href: z.string().min(1) }),
  }),
});

const methods = defineCollection({
  loader: glob({ base: "./src/content/methods", pattern: "**/*.json" }),
  schema: z.object({
    order: z.number().int().positive(),
    name: localizedText,
    summary: localizedText,
    useCases: z.array(localizedText).min(1),
    typicalPractice: localizedText.optional(),
    adaptation: localizedText.optional(),
    limitations: z.array(localizedText).optional(),
    credentials: z.array(z.string()).min(1),
    relatedServices: z.array(z.string()).min(1),
    lifecycleStatus: z.enum(["completed", "current", "in_progress", "planned"]),
    publicationScope: publicationScope.default("public"),
  }),
});

const faq = defineCollection({
  loader: glob({ base: "./src/content/faq", pattern: "**/*.json" }),
  schema: z.object({
    question: localizedText,
    answer: localizedText,
    publicationScope: publicationScope.default("public"),
  }),
});

export const collections = { pages, services, methods, faq };
