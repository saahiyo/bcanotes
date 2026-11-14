function resolveSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.bcanotes.tech")
    .trim()
    .replace(/\/+$/, "");

  // Normalize apex domain to www so canonicals & sitemaps never hit the 308 redirect
  if (raw === "https://bcanotes.tech" || raw === "http://bcanotes.tech") {
    return "https://www.bcanotes.tech";
  }

  return raw;
}

export const siteUrl = resolveSiteUrl();
