import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Binaya Shrestha - Computer Science Student & Developer",
  description: "Learn about Binaya Shrestha, a Computer Science student passionate about web development, React, Next.js, and building real-world applications. Discover his journey in technology and creative projects.",
  keywords: [
    "Binaya Shrestha",
    "about",
    "computer science student",
    "web developer",
    "React developer",
    "Next.js developer",
    "programmer",
    "tech blogger"
  ],
  openGraph: {
    title: "About Binaya Shrestha - Computer Science Student & Developer",
    description: "Learn about Binaya Shrestha, a Computer Science student passionate about web development, React, Next.js, and building real-world applications.",
    url: "https://blog.binayashrestha0.com.np/about",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "About Binaya Shrestha - Computer Science Student & Developer",
    description: "Learn about Binaya Shrestha, a Computer Science student passionate about web development, React, Next.js, and building real-world applications.",
  },
  alternates: {
    canonical: "https://blog.binayashrestha0.com.np/about",
  },
};

const page = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Binaya Shrestha",
    description: "Computer Science student passionate about web development, React, Next.js, and building real-world applications",
    jobTitle: "Computer Science Student & Web Developer",
    url: "https://blog.binayashrestha0.com.np",
    sameAs: [
      "https://blog.binayashrestha0.com.np"
    ],
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Computer Science"
    ],
    alumniOf: "Computer Science Program"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="w-[80%] m-auto px-5 mt-7">
      <h1 className="text-4xl font-bold">About Me</h1>
      <p className="mt-8">
        I’m Binaya Shrestha, a Computer Science student with a love for building
        things on the web. I enjoy working with modern technologies like React,
        Next.js, Node.js, PostgreSQL, and MongoDB to turn ideas into real-world
        projects.
      </p>
      <p className="mt-8">
        Over the past few years, I’ve created apps ranging from a video-sharing
        platform to a CMS dashboard and even a music downloader. For me, every
        project is an opportunity to learn something new and solve real
        problems.
      </p>
      <p className="mt-8">
        Outside of coding, I’m into music, art, and design, and I like
        collaborating with people who share the same curiosity for technology
        and creativity.
      </p>
      <p className="mt-8">
        This blog is my space to share thoughts, experiments, and what I’m
        learning along the way.
      </p>
      </div>
    </>
  );
};

export default page;
