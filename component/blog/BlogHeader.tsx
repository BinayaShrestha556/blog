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
  const formattedDate = new Date(_createdAt).toISOString().split("T")[0];

  return (
    <div className="relative w-full group h-full">
      <Image
        src={titleImage?.asset?.url || "/placeholder.jpg"}
        alt={title}
        width={1200}
        height={1200}
        className="rounded-3xl w-full h-full object-cover"
      />

      <div className="absolute z-40 py-5 top-0 left-0 bg-background rounded-br-3xl px-5 max-w-[80%] clip-shape">
        <div className="corner-3xl absolute z-50 top-0 left-full" />
        <div className="corner-3xl absolute z-50 top-full left-0" />
        <span className="text-xs md:text-sm lg:text-base text-muted-foreground flex">
          {formattedDate} |<span className="capitalize">&nbsp; {category}</span>{" "}
          <span className="text-sm text-muted-foreground flex-1 text-end">
            - {author}{" "}
          </span>
        </span>
        <h1 className="text-2xl font-bold md:text-3xl md:mt-2 lg:text-4xl">
          {title}
        </h1>
      </div>
    </div>
  );
};
