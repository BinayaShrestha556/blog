import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface CardsProps {
  index?: number;
  image: string;
  title: string;
  createdAt: string;
  category: string;
  smallDescription?: string;
  author: string;
  slug: string;
}
const RecentCard: React.FC<CardsProps> = ({
  index,
  image,
  title,
  createdAt,
  category,
  smallDescription,
  author,
  slug,
}) => {
  const formattedDate = new Date(createdAt).toISOString().split("T")[0];
  const formatedDescription = smallDescription
    ? smallDescription.length > 100
      ? smallDescription.slice(0, 100) + "..."
      : smallDescription
    : "";
  console.log(index);
  return (
    <Link href={`/${slug}`} className="w-full flex bg-card h-full  group">
      <div
        className={cn(
          "relative aspect-square lg:aspect-square md:aspect-[4/3] object-cover rounded  overflow-hidden group-hover:scale-[101%] transition duration-100",
          index === 1 && "rounded-tl-3xl",
          index === 3 && "rounded-bl-3xl"
        )}
      >
        <Image
          src={image}
          alt={title}
          width={800}
          height={800}
          className="aspect-square md:aspect-video h-full object-cover  "
        />
      </div>
      <div className="px-4 py-2 flex-1 w-fit h-full flex flex-col justify-between ">
        <div>
          <h2 className="md:text-2xl md:leading-none font-semibold lg:text-lg group-hover:underline leading-5">
            {title}
          </h2>
          <p className="leading-[18px] md:mt-2 text-sm md:text-base md:leading-none lg:text-sm ">
            {formatedDescription}
          </p>
        </div>
        <div className="text-xs text-muted-foreground flex justify-between">
          <span>
            {formattedDate} | {category}
          </span>
          <span className="text-foreground">- {author}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecentCard;
