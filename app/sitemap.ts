import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blog.binayashrestha0.com.np'
  
  // Fetch all blog posts
  const blogs = await client.fetch(`*[_type == "blog"]{
    slug,
    _updatedAt
  }`)

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/subscribe`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic blog pages
  const blogPages = blogs.map((blog: any) => ({
    url: `${baseUrl}/${blog.slug.current}`,
    lastModified: new Date(blog._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...blogPages]
}
