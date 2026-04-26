import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bcanotes.tech';

  // All subject IDs from the data file
  const subjectIds = [
    // Semester 1
    'problem-solving-using-computers',
    'programming-using-cpp',
    // Semester 2
    'computer-network',
    'evs',
    'dsa',
    // Semester 3
    'operating-system',
    'web-technology',
    'dbms',
    'python',
    // Semester 4
    'financial-and-investment-skills',
    'software-engineering',
    'java',
    'csa',
    // Semester 5
    'linux-administration',
    'advance-java',
    'quantitative-aptitude',
    'ecommerce-technology',
    // Semester 6
    'php-programming',
    'android-programming',
    'personality-and-career-skills',
  ];

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

  const subjectPages: MetadataRoute.Sitemap = subjectIds.map((id) => ({
    url: `${baseUrl}/notes/${id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...subjectPages];
}
