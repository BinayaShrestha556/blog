import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blog.binayashrestha0.com.np'
  
  // Fetch all blog posts with more details for better sitemap
  const blogs = await client.fetch(
    `*[_type == "blog"]{
      slug,
      _updatedAt,
      _createdAt,
      title,
      category
    }`,
    {},
    {
      next: { 
        revalidate: 86400, // Cache sitemap data for 24 hours
        tags: ['sitemap-blogs'] // Tag for targeted revalidation
      }
    }
  )

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

  // Dynamic blog pages with better prioritization
  const blogPages = blogs.map((blog: any) => {
    const isRecent = new Date(blog._createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days
    return {
      url: `${baseUrl}/${blog.slug.current}`,
      lastModified: new Date(blog._updatedAt),
      changeFrequency: isRecent ? 'daily' as const : 'weekly' as const,
      priority: isRecent ? 0.95 : 0.9,
    };
  })

  return [...staticPages, ...blogPages]
}


