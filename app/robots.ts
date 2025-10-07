import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/test-auth/'],
    },
    sitemap: 'https://blog.binayashrestha0.com.np/sitemap.xml',
  }
}
