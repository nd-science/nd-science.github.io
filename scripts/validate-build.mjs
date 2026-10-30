import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const failures = [];
const routes = {
  wellness: ["", "about", "for-individuals", "programs/stress-recovery", "practices/psychology", "practices/neurointegration", "practices/breathing", "practices/movement-qigong", "practices/play-and-story", "for-organizations", "resources", "booking", "faq"],
  science: ["", "about", "research", "research/dissertation", "publications", "conferences", "education", "projects", "expert-services", "for-organizations", "contact"],
};

for (const [site, siteRoutes] of Object.entries(routes)) {
  for (const locale of ["ru", "en"]) {
    for (const route of siteRoutes) {
      const file = resolve(root, `apps/${site}/dist/${locale}/${route}/index.html`);
      if (!existsSync(file)) { failures.push(`Missing built route: ${site}/${locale}/${route || "home"}`); continue; }
      const html = readFileSync(file, "utf8");
      for (const token of [
        `lang="${locale}"`,
        "rel=\"canonical\"",
        "hreflang=\"ru\"",
        "hreflang=\"en\"",
        '"@type":"Person"',
        'id="main-content" tabindex="-1"',
        'content="nosniff"',
        'content="strict-origin-when-cross-origin"',
        'name="twitter:card"',
      ]) {
        if (!html.includes(token)) failures.push(`${site}/${locale}/${route || "home"}: missing ${token}`);
      }
      if (html.includes('h4 class="footer-heading"')) {
        failures.push(`${site}/${locale}/${route || "home"}: obsolete h4 footer heading found`);
      }
      const otherOrigin = site === "wellness" ? "science.invalid" : "wellness.invalid";
      if (route !== "about" && html.includes(otherOrigin)) failures.push(`${site}/${locale}/${route || "home"}: cross-site link is allowed only on About`);
    }
  }
}

for (const site of ["wellness", "science"]) {
  for (const sitemapFile of ["sitemap-index.xml", "sitemap-0.xml"]) {
    const sitemapPath = resolve(root, `apps/${site}/dist/${sitemapFile}`);
    if (!existsSync(sitemapPath)) failures.push(`${site}: missing ${sitemapFile}`);
  }
  const rootIndex = resolve(root, `apps/${site}/dist/index.html`);
  if (!existsSync(rootIndex)) {
    failures.push(`${site}: missing root index.html`);
  } else {
    const rootHtml = readFileSync(rootIndex, "utf8");
    if (!rootHtml.includes('content="0;url=/en/"')) {
      failures.push(`${site}/index.html: missing fallback refresh content="0;url=/en/"`);
    }
    if (!rootHtml.includes('location.replace') || !rootHtml.includes('navigator.languages')) {
      failures.push(`${site}/index.html: missing client-side language detection script`);
    }
    if (!rootHtml.includes('href="/ru/"') || !rootHtml.includes('href="/en/"')) {
      failures.push(`${site}/index.html: missing localized fallback links`);
    }
  }
}

const sciencePublications = readFileSync(resolve(root, "apps/science/dist/en/publications/index.html"), "utf8");
for (const type of ["ScholarlyArticle", "Person", "WebPage"]) if (!sciencePublications.includes(`\"@type\":\"${type}\"`)) failures.push(`Science publications: missing ${type} structured data`);
const scienceProjects = readFileSync(resolve(root, "apps/science/dist/en/projects/index.html"), "utf8");
if (!scienceProjects.includes('"@type":"ResearchProject"')) failures.push("Science projects: missing ResearchProject structured data");

if (process.env.PUBLIC_SITE_STATUS === "public") {
  for (const [site, siteRoutes] of Object.entries(routes)) {
    for (const locale of ["ru", "en"]) {
      for (const route of siteRoutes) {
        const file = resolve(root, `apps/${site}/dist/${locale}/${route}/index.html`);
        if (!existsSync(file)) continue;
        const html = readFileSync(file, "utf8");
        if (html.includes("draft-banner")) failures.push(`${site}/${locale}/${route || "home"}: draft banner must not appear in a public build`);
      }
    }
  }
}

if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
else console.log("Built-route validation passed for 48 localized pages, canonical/hreflang and structured data.");
