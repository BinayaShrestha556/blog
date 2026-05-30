// app/blog/[slug]/page.tsx
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import { BlogHeader } from "@/component/blog/BlogHeader";
import { EngagementBar } from "@/component/blog/EngagementBar";
import { PortableTextContent } from "@/component/blog/PortableTextContent";
import { BlogJsonLd } from "@/component/blog/BlogJsonLd";
import { BlogPost } from "@/lib/types";
import Cards from "@/component/landingPage/cards";

const query = `*[_type == "blog" && slug.current == $slug][0]{
  title,
  titleImage{asset->{url}},
  content[]{
    ...,
    asset->{url}
  },
  _createdAt,
  _updatedAt,
  category,
  author,
  smallDescription,
  slug
}`;

export const revalidate = 86400; // revalidate every 24 hours

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Cache metadata generation as well
  const blog = await client.fetch<BlogPost>(
    query,
    { slug },
    {
      next: {
        revalidate: 86400, // Cache for 24 hours
        tags: [`blog-${slug}`], // Tag for targeted revalidation
      },
    },
  );

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const publishedDate = new Date(blog._createdAt).toISOString();
  const modifiedDate = blog._updatedAt
    ? new Date(blog._updatedAt).toISOString()
    : publishedDate;
  const imageUrl =
    blog.titleImage?.asset?.url ||
    "https://blog.binayashrestha0.com.np/og-image.jpg";

  return {
    title: `${blog.title} | Binaya Shrestha's Blog`,
    description:
      blog.smallDescription ||
      `Read ${blog.title} by ${blog.author} on Binaya Shrestha's blog. Discover insights about ${blog.category.toLowerCase()} and more.`,
    keywords: [
      blog.category.toLowerCase(),
      blog.title.toLowerCase(),
      "blog",
      "technology",
      "web development",
      "programming",
      "tutorial",
      "binaya shrestha",
      "tech insights",
      "coding",
      "software development",
    ],
    authors: [{ name: blog.author }],
    category: blog.category,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${blog.title} | Binaya Shrestha's Blog`,
      description:
        blog.smallDescription ||
        `Read ${blog.title} by ${blog.author} on Binaya Shrestha's blog.`,
      url: `https://blog.binayashrestha0.com.np/${slug}`,
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: [blog.author],
      section: blog.category,
      tags: [blog.category.toLowerCase(), blog.title.toLowerCase()],
      siteName: "Binaya Shrestha's Blog",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Binaya Shrestha's Blog`,
      description:
        blog.smallDescription ||
        `Read ${blog.title} by ${blog.author} on Binaya Shrestha's blog.`,
      images: [imageUrl],
      creator: "@binayashrestha",
      site: "@binayashrestha",
    },
    alternates: {
      canonical: `https://blog.binayashrestha0.com.np/${slug}`,
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;

  // Use Next.js cache with 24-hour revalidation
  const blog = await client.fetch<BlogPost>(
    query,
    { slug },
    {
      next: {
        revalidate: 86400, // Cache for 24 hours
        tags: [`blog-${slug}`], // Tag for targeted revalidation
      },
    },
  );

  if (!blog) return <p>Blog not found</p>;

  // Fetch related posts (latest 4 posts excluding current one)
  const relatedPosts = await client.fetch<BlogPost[]>(
    `*[_type == "blog" && slug.current != $slug] | order(_createdAt desc) [0...4]{
      _id,
      title,
      slug,
      _createdAt,
      category,
      author,
      smallDescription,
      titleImage{asset->{url}}
    }`,
    { slug },
    {
      next: {
        revalidate: 86400,
        tags: ["related-blogs"],
      },
    },
  );

  return (
    <>
      <BlogJsonLd blog={blog} slug={slug} />
      <article>
        <div className="w-full md:w-[80%] lg:w-[60%] mx-auto p-2 md:p-5 mt-5">
          <BlogHeader
            title={blog.title}
            titleImage={blog.titleImage}
            _createdAt={blog._createdAt}
            category={blog.category}
            author={blog.author}
          />
          {/* <EngagementBar /> */}
          <div className="mt-8 border-b pb-12">
            <PortableTextContent value={blog.content} />
          </div>{" "}
          {/* Related Posts Section */}
        </div>
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto p-4 md:p-8">
          {relatedPosts.length > 0 && (
            <section className="mt-16 mb-10 pt-16">
              <h2 className="text-3xl font-bold mb-10 text-center md:text-left">
                You may want to read:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedPosts.map((post: any) => (
                  <Cards
                    key={post._id}
                    title={post.title}
                    image={post.titleImage?.asset?.url || "/placeholder.jpg"}
                    createdAt={post._createdAt}
                    category={post.category}
                    author={post.author}
                    slug={post.slug.current}
                    smallDescription={post.smallDescription}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>{" "}
    </>
  );
}
