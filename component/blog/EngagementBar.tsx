import React from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { MdOutlineBookmarkAdd } from "react-icons/md";

export const EngagementBar = () => {
  return (
    <div className="border-b w-full flex items-center justify-between px-5 pb-2 mt-10">
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
  );
};
