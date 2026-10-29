import { robotsTxt, type SiteStatus } from "@natali/seo";
import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const status: SiteStatus =
    import.meta.env.PUBLIC_SITE_STATUS === "public" ? "public" : "draft";
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || "https://science.invalid";

  return new Response(robotsTxt(status, siteUrl), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

