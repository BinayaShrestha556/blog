// app/api/blog/[slug]/route.js
import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Validate slug parameter
    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // GROQ query to fetch blog post by slug
    const query = `*[_type == "blog" && slug.current == $slug][0]{
  title,
  titleImage{asset->{url}},
  content,
  _createdAt,
  category,
  author
}`;

    // Fetch data from Sanity
    const blog = await client.fetch(query, { slug });
    console.log(blog);
    // Check if blog post exists
    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Return the blog object
    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blog from Sanity:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post", message: error.message },
      { status: 500 }
    );
  }
}
