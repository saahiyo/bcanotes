import type { MetadataRoute } from 'next';
import { subjectsData } from '@/data/subjects';
import { generateUnitSlug } from '@/lib/unit-slug';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bcanotes.tech';

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/question-papers`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practicals`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contribute`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  // Subject-level pages: /notes/operating-system
  const subjectPages: MetadataRoute.Sitemap = Object.keys(subjectsData).map((id) => ({
    url: `${baseUrl}/notes/${id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Unit-level pages: /notes/operating-system/unit-1-history-of-the-operating-systems
  const unitPages: MetadataRoute.Sitemap = Object.entries(subjectsData).flatMap(
    ([subjectId, subject]) =>
      subject.units.map((unit) => ({
        url: `${baseUrl}/notes/${subjectId}/${generateUnitSlug(unit.title)}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  );

  return [...staticPages, ...subjectPages, ...unitPages];
}
