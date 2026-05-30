import React from "react";
import { BlogPost } from "@/lib/types";

interface BlogJsonLdProps {
  blog: BlogPost;
  slug: string;
}

export const BlogJsonLd: React.FC<BlogJsonLdProps> = ({ blog, slug }) => {
  const publishedDate = new Date(blog._createdAt).toISOString();
  const modifiedDate = blog._updatedAt
    ? new Date(blog._updatedAt).toISOString()
    : publishedDate;

  const imageUrl =
    blog.titleImage?.asset?.url ||
    "https://blog.binayashrestha0.com.np/og-image.jpg";

  // Calculate actual word count from PortableText content
  const calculateWordCount = (content: any[] = []) => {
    let textString = "";
    content.forEach((block) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        block.children.forEach((child: any) => {
          if (child.text) textString += child.text + " ";
        });
      }
    });
    return textString
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const trueWordCount = calculateWordCount(blog.content);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description:
      blog.smallDescription || `Read ${blog.title} by ${blog.author}`,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: blog.author,
      url: "https://blog.binayashrestha0.com.np/about",
    },
    publisher: {
      "@type": "Person",
      name: "Binaya Shrestha",
      url: "https://blog.binayashrestha0.com.np",
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.binayashrestha0.com.np/${slug}`,
    },
    articleSection: blog.category,
    keywords: [
      blog.category.toLowerCase(),
      blog.title.toLowerCase(),
      "technology",
      "web development",
      "programming",
    ],
    url: `https://blog.binayashrestha0.com.np/${slug}`,
    wordCount: trueWordCount,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      name: "Binaya Shrestha's Blog",
      url: "https://blog.binayashrestha0.com.np",
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://blog.binayashrestha0.com.np",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: blog.category,
        item: `https://blog.binayashrestha0.com.np/category/${blog.category.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://blog.binayashrestha0.com.np/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
};
