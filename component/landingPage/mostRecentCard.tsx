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
const MostRecent: React.FC<CardsProps> = ({
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
    <Link href={`/${slug}`} className="w-full h-full">
      <div className="relative w-full group h-full">
        <Image
          src={image}
          alt={title}
          width={800}
          height={800}
          className="rounded-3xl w-full h-full object-cover"
        />
        <div className="absolute inset-0  bottom-0">
          <div className=" h-full p-2 md:p-5  w-full bg-black/45 z-40 text-xs lg:text-base text-white opacity-0 rounded-3xl group-hover:opacity-100 transition duration-300 ">
            <p className=" bottom-0 max-w-[85%] p-2 md:p-7">
              {smallDescription}
            </p>
          </div>
          <div className="absolute bottom-0 max-w-[70%] w-fit bg-white px-2 py-2 lg:py-6 rounded-tr-3xl">
            <div className="corner-3xl absolute bottom-[calc(100%-0.5px)] left-0  -rotate-90" />
            <div className="corner-3xl absolute left-[calc(100%-1px)] -bottom-[0.5px]  -rotate-90" />
            <span className="text-xs md:text-sm px-5">
              {formattedDate} | <span className=" capitalize">{category}</span>
            </span>

            <h2 className="text-xl md:text-4xl lg:text-5xl font-bold px-5  ">
              {title}
            </h2>
            <p className="text-sm md:text-base -mt-1 text-right font-medium px-5">
              - {author}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MostRecent;
