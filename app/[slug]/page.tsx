export const revalidate = 12 * 3600; // revalidate every 12 hours
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const query = `*[_type == "blog" && slug.current == $slug][0]{
  title,
  titleImage{asset->{url}},
  content,
  _createdAt,
  category,
  author
}`;

import { urlFor } from "@/lib/sanityUrl";

import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { MdOutlineBookmarkAdd } from "react-icons/md";

const components = {
  types: {
    image: ({ value }: any) => (
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
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold my-6 mt-14">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold my-5 mt-14">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold my-4 mt-12">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className=" leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 my-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 my-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await client.fetch(query, { slug });

  if (!blog) return <p>Blog not found</p>;
  const formattedDate = new Date(blog._createdAt).toISOString().split("T")[0];

  return (
    <article className="w-full md:w-[80%] lg:w-[60%] mx-auto p-2 md:p-5 mt-5">
      {/* <div className="corner-br  z-50 bottom-0 left-full" /> */}

      <div className="relative mb-10   w-full ">
        <Image
          src={blog.titleImage.asset.url}
          alt={blog.title}
          width={1000}
          height={1000}
          className="rounded-3xl object-cover aspect-square md:aspect-auto  object-center "
        />

        <div className="absolute z-40 py-5 top-0 left-0 bg-background rounded-br-3xl   px-5 max-w-[80%]   clip-shape">
          <div className="corner-3xl absolute z-50 top-0 left-full" />
          <div className="corner-3xl absolute z-50 top-full left-0" />
          <span className="text-xs md:text-sm lg:text-base text-muted-foreground flex">
            {formattedDate} |
            <span className="capitalize  ">&nbsp; {blog.category}</span>{" "}
            <span className="text-sm text-muted-foreground flex-1 text-end ">
              - {blog.author}{" "}
            </span>
          </span>
          <h1 className="text-2xl font-bold md:text-3xl  md:mt-2 lg:text-4xl">
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
  );
}
