import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const failures = [];
const expected = {
  wellness: ["home", "about", "for-individuals", "programs/stress-recovery", "practices/psychology", "practices/neurointegration", "practices/breathing", "practices/movement-qigong", "practices/play-and-story", "for-organizations", "resources", "booking", "faq"],
  science: ["home", "about", "research", "research/dissertation", "publications", "conferences", "education", "projects", "expert-services", "for-organizations", "contact"],
};

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function frontmatterValue(text, key) {
  return text.match(new RegExp(`^${key}:\\s*["']?([^\\r\\n"']+)["']?\\s*$`, "m"))?.[1]?.trim();
}

for (const [site, routes] of Object.entries(expected)) {
  const directory = resolve(root, `apps/${site}/src/content/pages`);
  const files = walk(directory).filter((file) => extname(file) === ".md");
  const records = files.map((file) => {
    const text = readFileSync(file, "utf8");
    return { file, locale: frontmatterValue(text, "locale"), route: frontmatterValue(text, "route"), text };
  });
  for (const locale of ["ru", "en"]) {
    const actual = records.filter((record) => record.locale === locale).map((record) => record.route).sort();
    const wanted = [...routes].sort();
    if (JSON.stringify(actual) !== JSON.stringify(wanted)) failures.push(`${site}/${locale}: expected ${wanted.length} routes, found ${actual.length}; routes differ`);
  }
  for (const route of routes) {
    const pair = records.filter((record) => record.route === route);
    if (pair.length !== 2) failures.push(`${site}: route ${route} does not have exactly one RU and one EN page`);
  }
}

const requiredFiles = [
  "docs/specs/00-professional-map.md", "docs/specs/10-wellness-site-spec.md", "docs/specs/20-science-site-spec.md",
  "docs/specs/30-shared-implementation-contract.md", "docs/specs/40-source-coverage-matrix.md",
  "apps/wellness/functions/api/enquiry.js", "apps/science/functions/api/enquiry.js", "packages/forms/src/index.mjs",
];
for (const file of requiredFiles) if (!existsSync(resolve(root, file))) failures.push(`Missing required file: ${file}`);

const sourceFiles = [
  ...walk(resolve(root, "apps/wellness/src")),
  ...walk(resolve(root, "apps/science/src")),
  resolve(root, "packages/profile/src/index.ts"),
].filter((file) => [".ts", ".astro", ".md", ".json"].includes(extname(file)));
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  if (/verificationStatus/.test(text)) failures.push(`Deprecated verificationStatus in ${relative(root, file)}`);
  if (/ожидают документальной проверки|await documentary verification|данные не прошли финальную верификацию/i.test(text)) failures.push(`Obsolete credibility disclaimer in ${relative(root, file)}`);
}

const profile = readFileSync(resolve(root, "packages/profile/src/index.ts"), "utf8");
for (const model of ["SiteConfig", "Credential", "ExperienceEntry", "Method", "Service", "Publication", "ResearchProject", "ContentPage", "WellnessEnquiry", "ScienceEnquiry"]) {
  if (!new RegExp(`export interface ${model}\\b`).test(profile)) failures.push(`Missing canonical interface ${model}`);
}
for (const status of ["lifecycleStatus", "publicationScope", "serviceAvailability"]) if (!profile.includes(status)) failures.push(`Missing canonical status ${status}`);

function service(id) { return JSON.parse(readFileSync(resolve(root, `apps/wellness/src/content/services/${id}.json`), "utf8")); }
const consultation = service("consultation");
const packageFive = service("five-session-package");
const fourWeeks = service("four-week-support");
const group = service("group-qigong");
if (consultation.price?.[0]?.amount !== 100 || consultation.price?.[1]?.amount !== 120) failures.push("Wellness consultation prices must be EUR 100 online / 120 in person");
if (packageFive.price?.[0]?.amount !== 500 || packageFive.price?.[1]?.amount !== 600) failures.push("Five-session package prices must be EUR 500 online / 600 in person");
if (fourWeeks.price?.amount !== 600) failures.push("Four-week support must be EUR 600");
if (group.price?.amount !== 35 || !group.includes?.[0]?.ru?.includes("четырёх")) failures.push("Group qigong must be EUR 35 and start at four participants");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Content validation passed: 13 Wellness and 11 Science routes in RU/EN, canonical models and commercial facts.");
}
