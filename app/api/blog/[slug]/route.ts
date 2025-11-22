import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    console.log("Fetching blog post with slug:", slug);

    // Try to fetch from database
    const post = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
    });

    console.log("Database query result:", post);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post not found",
        },
        { status: 404 }
      );
    }

    let authorData = { name: post.author, role: "Contributor" };
    try {
      if (post.author.startsWith("{")) {
        const parsed = JSON.parse(post.author);
        authorData = {
          name: parsed.name || post.author,
          role: parsed.role || "Contributor",
        };
      }
    } catch (e) {
      // Keep default
    }

    // Transform the post to match the expected format
    const transformedPost = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content:
        typeof post.content === "string"
          ? post.content
          : JSON.stringify(post.content),
      author: {
        name: authorData.name,
        role: authorData.role,
      },
      category: post.category,
      tags: post.tags,
      image: post.coverImage || "/images/blog/student-contribution.png",
      date: post.createdAt.toISOString(),
      readTime: post.readTime,
      views: 0,
      likes: 0,
      status: post.status,
    };

    return NextResponse.json({
      success: true,
      data: transformedPost,
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog post",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
