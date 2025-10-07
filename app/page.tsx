import Cards from "@/component/landingPage/cards";
import MostRecent from "@/component/landingPage/mostRecentCard";
import RecentCard from "@/component/landingPage/recentCard";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

const query = `*[_type == "blog"]{

  _id,
  _createdAt,
  title,
  slug,
  author,
  smallDescription,
  category,
  titleImage{
    asset->{
      url,
      metadata { lqip }
    }
  },
  content
} | order(_createdAt desc)`;

export const metadata: Metadata = {
  title: "Latest Tech Insights & Development Blog Posts",
  description:
    "Discover the latest technology insights, web development tutorials, and programming tips on Binaya Shrestha's blog. Stay updated with cutting-edge tech trends and practical coding solutions.",
  openGraph: {
    title: "Latest Tech Insights & Development Blog Posts",
    description:
      "Discover the latest technology insights, web development tutorials, and programming tips on Binaya Shrestha's blog. Stay updated with cutting-edge tech trends and practical coding solutions.",
    url: "https://blog.binayashrestha0.com.np",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Tech Insights & Development Blog Posts",
    description:
      "Discover the latest technology insights, web development tutorials, and programming tips on Binaya Shrestha's blog. Stay updated with cutting-edge tech trends and practical coding solutions.",
  },
};

export default async function HomePage() {
  const blogs = await client.fetch(query);

  // Structured data for the website
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Binaya Shrestha's Blog",
    description:
      "Explore the latest in technology, web development, and programming insights on Binaya Shrestha's blog.",
    url: "https://blog.binayashrestha0.com.np",
    author: {
      "@type": "Person",
      name: "Binaya Shrestha",
    },
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://blog.binayashrestha0.com.np/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // Structured data for blog posts
  const blogStructuredData = blogs.slice(0, 5).map((blog: any) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description:
      blog.smallDescription || `Read ${blog.title} by ${blog.author}`,
    image: blog.titleImage?.asset?.url,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Person",
      name: "Binaya Shrestha",
    },
    datePublished: new Date(blog._createdAt).toISOString(),
    url: `https://blog.binayashrestha0.com.np/${blog.slug.current}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.binayashrestha0.com.np/${blog.slug.current}`,
    },
    articleSection: blog.category,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      {blogStructuredData.map((data: any, index: number) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <div className="md:w-[80%]  m-auto">
        <div className="m-auto px-5 mt-3 md:mt-6">
          <h1 className="text-4xl font-bold text-primary ">Latest</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3  [grid-template-rows:repeat(5,150px)] lg:[grid-template-rows:repeat(3,160px)] mt-4   gap-2 px-3 lg:gap-1.5 m-auto">
          <div className="col-span-1 lg:col-span-2 lg:row-span-3  row-span-2 mb-6 lg:mb-0">
            <MostRecent
              title={blogs[0].title}
              createdAt={blogs[0]._createdAt}
              image={blogs[0].titleImage?.asset?.url}
              category={blogs[0].category}
              smallDescription={blogs[0].smallDescription}
              author={blogs[0].author}
              slug={blogs[0].slug.current}
            />
          </div>
          <RecentCard
            index={1}
            title={blogs[1].title}
            createdAt={blogs[1]._createdAt}
            image={blogs[1].titleImage?.asset?.url}
            category={blogs[1].category}
            smallDescription={blogs[1].smallDescription}
            author={blogs[1].author}
            slug={blogs[1].slug.current}
          />
          <RecentCard
            index={2}
            title={blogs[2].title}
            createdAt={blogs[2]._createdAt}
            image={blogs[2].titleImage?.asset?.url}
            category={blogs[2].category}
            smallDescription={blogs[2].smallDescription}
            author={blogs[2].author}
            slug={blogs[2].slug.current}
          />
          <RecentCard
            index={3}
            title={blogs[3].title}
            createdAt={blogs[3]._createdAt}
            image={blogs[3].titleImage?.asset?.url}
            category={blogs[3].category}
            smallDescription={blogs[3].smallDescription}
            author={blogs[3].author}
            slug={blogs[3].slug.current}
          />
        </div>
        <div className="w-full relative m-auto text-xl font-semibold tracking-widest mt-20 px-2 lg:mt-32  flex items-center justify-start ">
          <div className="w-full z-0 h-0.5 bg-foreground absolute rounded" />
          <h1 className=" bg-background  z-10 absolute left-10 m-auto text-xl font-semibold tracking-widest px-5 justify-self-start text-primary">
            ALL &nbsp; BLOGS
          </h1>
        </div>
        <div className="space-y-6 grid grid-cols-2 px-2 lg:grid-cols-4 md:grid-cols-3 gap-5  m-auto mt-10">
          {blogs.slice(4).map((blog: any) => (
            <Cards
              key={blog._id}
              slug={blog.slug.current}
              category={blog.category}
              smallDescription={blog.smallDescription}
              title={blog.title}
              createdAt={blog._createdAt}
              image={blog.titleImage?.asset?.url}
              author={blog.author}
            />
          ))}
        </div>
      </div>
    </>
  );
}
