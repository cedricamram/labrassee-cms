import type { MetadataRoute } from 'next'

// 2026-09-29 : /robots.txt répondait 404 — Google devinait seul ce qui était public.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/desabonnement'] }],
    sitemap: 'https://www.labrassee.cafe/sitemap.xml',
    host: 'https://www.labrassee.cafe',
  }
}
