// app/blog/[slug]/page.tsx
import { client } from "@/lib/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanityUrl";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import type { PortableTextBlock } from "@portabletext/types";
import type { Metadata } from "next";

// Types
interface BlogPost {
  title: string;
  titleImage: {
    asset: {
      url: string;
    };
  };
  content: PortableTextBlock[];
  _createdAt: string;
  category: string;
  author: string;
  smallDescription?: string;
  slug: {
    current: string;
  };
}

interface ImageValue {
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

interface PortableTextComponentProps {
  children?: React.ReactNode;
}

interface ImageComponentProps {
  value: ImageValue;
}

const query = `*[_type == "blog" && slug.current == $slug][0]{
  title,
  titleImage{asset->{url}},
  content,
  _createdAt,
  category,
  author,
  smallDescription,
  slug
}`;

const components: PortableTextComponents = {
  types: {
    image: ({ value }: ImageComponentProps) => (
      <div className="relative my-6">
        <Image
          src={urlFor(value).width(800).height(600).url()}
          alt={value.alt || "Blog image"}
          width={800}
          height={600}
          className="rounded-2xl aspect-[4/3] md:aspect-[5/3] w-4/6 mx-auto my-14 object-cover"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: PortableTextComponentProps) => (
      <h1 className="text-3xl font-bold my-6 mt-14">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps) => (
      <h2 className="text-2xl font-semibold my-5 mt-14">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps) => (
      <h3 className="text-xl font-semibold my-4 mt-12">{children}</h3>
    ),
    normal: ({ children }: PortableTextComponentProps) => (
      <p className=" leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <ul className="list-disc pl-6 my-2">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <ol className="list-decimal pl-6 my-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <li className="mb-1">{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <li className="mb-1">{children}</li>
    ),
  },
};

export const revalidate = 60;

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await client.fetch<BlogPost>(query, { slug });

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const publishedDate = new Date(blog._createdAt).toISOString();
  const modifiedDate = new Date().toISOString();

  return {
    title: blog.title,
    description: blog.smallDescription || `Read ${blog.title} by ${blog.author} on Binaya Shrestha's blog. Discover insights about ${blog.category.toLowerCase()} and more.`,
    keywords: [
      blog.category.toLowerCase(),
      blog.title.toLowerCase(),
      "blog",
      "technology",
      "web development",
      "programming",
      "tutorial",
      "binaya shrestha"
    ],
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.title,
      description: blog.smallDescription || `Read ${blog.title} by ${blog.author} on Binaya Shrestha's blog.`,
      url: `https://blog.binayashrestha0.com.np/${slug}`,
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: [blog.author],
      section: blog.category,
      tags: [blog.category.toLowerCase()],
      images: [
        {
          url: blog.titleImage.asset.url,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.smallDescription || `Read ${blog.title} by ${blog.author} on Binaya Shrestha's blog.`,
      images: [blog.titleImage.asset.url],
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
  const blog = await client.fetch<BlogPost>(query, { slug });

  if (!blog) return <p>Blog not found</p>;

  const formattedDate = new Date(blog._createdAt).toISOString().split("T")[0];
  const publishedDate = new Date(blog._createdAt).toISOString();
  const modifiedDate = new Date().toISOString();

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.smallDescription || `Read ${blog.title} by ${blog.author}`,
    image: blog.titleImage.asset.url,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Person",
      name: "Binaya Shrestha",
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.binayashrestha0.com.np/${slug}`,
    },
    articleSection: blog.category,
    keywords: [blog.category.toLowerCase(), blog.title.toLowerCase()],
    url: `https://blog.binayashrestha0.com.np/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="w-full md:w-[80%] lg:w-[60%] mx-auto p-2 md:p-5 mt-5">
      <div className="relative mb-10 w-full">
        <Image
          src={blog.titleImage.asset.url}
          alt={blog.title}
          width={1000}
          height={1000}
          className="rounded-3xl object-cover aspect-square md:aspect-auto object-center"
        />

        <div className="absolute z-40 py-5 top-0 left-0 bg-background rounded-br-3xl px-5 max-w-[80%] clip-shape">
          <div className="corner-3xl absolute z-50 top-0 left-full" />
          <div className="corner-3xl absolute z-50 top-full left-0" />
          <span className="text-xs md:text-sm lg:text-base text-muted-foreground flex">
            {formattedDate} |
            <span className="capitalize">&nbsp; {blog.category}</span>{" "}
            <span className="text-sm text-muted-foreground flex-1 text-end">
              - {blog.author}{" "}
            </span>
          </span>
          <h1 className="text-2xl font-bold md:text-3xl md:mt-2 lg:text-4xl">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="border-b w-full flex items-center justify-between px-5 pb-2">
        <div className="flex gap-5 text-muted-foreground text-lg">
          <span className="flex gap-1 items-center">
            <FaRegComment />
            <span className="text-sm">10</span>
          </span>
          <span className="flex gap-1 items-center">
            <IoEyeOutline />
            <span className="text-sm">100</span>
          </span>
          <span className="flex gap-1 items-center">
            <FaRegHeart />
            <span className="text-sm">5</span>
          </span>
        </div>
        <div className="flex gap-5 text-muted-foreground text-lg">
          <RiShareForwardLine />
          <MdOutlineBookmarkAdd />
        </div>
      </div>

      <PortableText value={blog.content} components={components} />
      </article>
    </>
  );
}
