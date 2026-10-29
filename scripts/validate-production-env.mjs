import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const site = process.argv[2];
if (!new Set(["wellness", "science"]).has(site)) throw new Error("Pass wellness or science");
const root = resolve(import.meta.dirname, "..");
const failures = [];
const required = ["PUBLIC_SITE_URL", "PUBLIC_TURNSTILE_SITE_KEY", "PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN", "FORM_FROM_EMAIL", "FORM_TO_EMAIL", "TURNSTILE_SECRET_KEY", "RESEND_API_KEY"];
for (const key of required) if (!process.env[key]?.trim()) failures.push(`Missing ${key}`);
if (process.env.PUBLIC_SITE_STATUS !== "public") failures.push("PUBLIC_SITE_STATUS must be public");
if (process.env.PUBLIC_FORMS_ENABLED !== "true") failures.push("PUBLIC_FORMS_ENABLED must be true");
if (process.env.LEGAL_REVIEW_APPROVED !== "true") failures.push("LEGAL_REVIEW_APPROVED must be true after external legal review");
if (/\.invalid(?:\/|$)/i.test(process.env.PUBLIC_SITE_URL ?? "")) failures.push("PUBLIC_SITE_URL still uses .invalid");

if (site === "wellness") {
  if (!process.env.PUBLIC_SCIENCE_SITE_URL || /\.invalid/i.test(process.env.PUBLIC_SCIENCE_SITE_URL)) failures.push("PUBLIC_SCIENCE_SITE_URL must be a production URL");
  const credentialDir = resolve(root, "apps/wellness/public/documents/credentials");
  if (!existsSync(credentialDir) || !readdirSync(credentialDir).some((name) => name.endsWith(".pdf"))) failures.push("At least one redacted public credential PDF is required");
} else {
  if (!process.env.PUBLIC_WELLNESS_SITE_URL || /\.invalid/i.test(process.env.PUBLIC_WELLNESS_SITE_URL)) failures.push("PUBLIC_WELLNESS_SITE_URL must be a production URL");
  for (const file of ["apps/science/public/cv/natalia-dolgova-ru.pdf", "apps/science/public/cv/natalia-dolgova-en.pdf"]) if (!existsSync(resolve(root, file))) failures.push(`Missing ${file}`);
}

if (failures.length) { console.error(`${site} production gate failed:\n${failures.join("\n")}`); process.exitCode = 1; }
else console.log(`${site} production environment gate passed.`);
