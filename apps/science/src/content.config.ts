import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const publicationScope = z.enum(["public", "internal", "consent_required"]);
const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.md" }),
  schema: z.object({
    route: z.string().regex(/^[a-z0-9-]+(\/[a-z0-9-]+)*$/), locale: z.enum(["ru", "en"]),
    seoTitle: z.string().min(1), seoDescription: z.string().min(1), h1: z.string().min(1), summary: z.string().min(1),
    ctaLabel: z.string().min(1).optional(), ctaHref: z.string().min(1).optional(),
    ctaSecondaryLabel: z.string().min(1).optional(), ctaSecondaryHref: z.string().min(1).optional(),
    sections: z.array(z.enum(["credentials", "publications", "contact-form", "profiles"])).default([]),
    updatedAt: z.coerce.date(), publicationScope: publicationScope.default("public"),
  }),
});
const publications = defineCollection({
  loader: glob({ base: "./src/content/publications", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string().min(1), authors: z.array(z.string().min(1)).min(1), nataliaNameVariant: z.enum(["Dolgova", "Ovchinnikova"]),
    year: z.number().int().min(1900).max(2100), type: z.enum(["thesis", "journal_article", "book_chapter", "conference_paper", "abstract", "professional_article", "presentation"]),
    venue: z.string().min(1), doi: z.string().min(1).optional(), url: z.url().optional(), language: z.string().min(2),
    researchAreas: z.array(z.string().min(1)).min(1), featured: z.boolean().default(false), publicationScope: publicationScope.default("public"),
  }).refine((data) => Boolean(data.doi || data.url), { message: "Publication requires DOI or URL" }),
});
export const collections = { pages, publications };
