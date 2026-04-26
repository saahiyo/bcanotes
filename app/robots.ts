import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bcanotes.tech';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/viewer/', '/profile/', '/login', '/signup'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
