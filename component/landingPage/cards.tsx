import Image from "next/image";
import Link from "next/link";
import React from "react";
interface CardsProps {
  image: string;
  title: string;
  createdAt: string;
  category: string;
  smallDescription?: string;
  author: string;
  slug: string;
}
const Cards: React.FC<CardsProps> = ({
  title,
  createdAt,
  image,
  category,
  smallDescription,
  author,
  slug,
}) => {
  const formattedDate = new Date(createdAt).toISOString().split("T")[0];
  return (
    <Link href={`/${slug}`} className="relative w-full group">
      <div className="relative group">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="rounded-xl aspect-[4/3] object-cover group"
        />
        {smallDescription && (
          <div className="absolute inset-0 bg-black/45 z-40 text-white opacity-0 rounded-xl group-hover:opacity-100 transition duration-300fs ">
            <p className="absolute bottom-0 p-5 text-sm">{smallDescription}</p>
          </div>
        )}
      </div>

      <div className="px-1 mt-3 ">
        <div className="flex justify-between text-muted-foreground">
          <p className="text-xs ">
            {formattedDate} • <span className="capitalize">{category}</span>
          </p>
          <span className="text-xs">- {author} </span>
        </div>
        <h3 className="font-semibold truncate group-hover:underline">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default Cards;
