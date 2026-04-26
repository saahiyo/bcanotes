import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BCA YCMOU - Learning Resources',
    short_name: 'BCA YCMOU',
    description:
      'The ultimate learning resources portal for BCA YCMOU students. Access notes, e-books, question papers, and solved practicals — 100% free.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    categories: ['education', 'reference'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
