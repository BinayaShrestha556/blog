import React from "react";
import Image from "next/image";
import { BlogPost } from "@/lib/types";

type BlogHeaderProps = Pick<
  BlogPost,
  "title" | "titleImage" | "_createdAt" | "category" | "author"
>;

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  titleImage,
  _createdAt,
  category,
  author,
}) => {
  const formattedDate = new Date(_createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Heading */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
          <span>{formattedDate}</span>
          <span>·</span>
          <span className="capitalize">{category}</span>
          <span className="ml-auto">by {author}</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
          {title}
        </h1>
      </div>

      {/* Image */}
      <div className="relative w-full  overflow-hidden rounded-3xl">
        <Image
          src={titleImage?.asset?.url || "/placeholder.jpg"}
          alt={title}
          height={1200}
          width={1200}
          priority
          className="object-cover h-full w-full object-center"
        />
      </div>
    </div>
  );
};
