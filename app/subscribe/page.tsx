"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-[80dvh] w-full flex flex-col justify-center items-center gap-4 lg:gap-5">
      <h1 className="text-3xl px-2 text-center font-bold">
        Subscribe to our newsletter
      </h1>
      <div className="flex p-2">
        <Input
          className="max-w-xl  border-border border focus-visible:ring-0  px-5 lg:px-10 py-3 h-auto lg:py-7 rounded-l-full"
          placeholder="Enter your email"
        />
        <Button className="h-full rounded-r-full px-10">Subscribe</Button>
      </div>
      <div className="flex">
        <p className="text-xs md:text-sm text-muted-foreground">
          By subscribing, you agree to our{" "}
          <Link
            className="text-primary underline underline-offset-2"
            href="/terms"
          >
            terms and conditions
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default page;
