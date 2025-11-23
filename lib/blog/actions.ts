"use server";

import { prisma } from "@/lib/prisma";
import { BlogSubmission, SubmissionStatus } from "./types";
import { revalidatePath } from "next/cache";
import { generateSlug } from "./utils";

export async function saveSubmission(submission: BlogSubmission) {
  try {
    let slug = generateSlug(submission.title);
    
    // Ensure unique slug
    let counter = 1;
    while (await prisma.blog.findUnique({ where: { slug } })) {
      slug = `${generateSlug(submission.title)}-${counter}`;
      counter++;
    }

    const { id, ...data } = submission;

    // Prepare author data as JSON string
    const authorData = JSON.stringify({
      name: data.authorName,
      role: data.authorRole,
      email: data.authorEmail,
    });

    await prisma.blog.create({
      data: {
        id: submission.id,
        slug,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.image || null, // Map image to coverImage
        author: authorData,     // Store structured author data as string
        category: data.category,
        tags: data.tags,
        readTime: data.readTime,
        status: data.status,
        // submittedAt is not in schema, using createdAt default
      },
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true, slug };
  } catch (error) {
    console.error("Failed to save blog submission:", error);
    return { success: false, error: "Failed to save blog" };
  }
}

export async function loadSubmissions() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Map Prisma result to BlogSubmission type
    return blogs.map((blog) => {
      let authorData = { name: blog.author, role: "Student Contributor", email: "" };
      try {
        // Try to parse author if it's JSON, otherwise treat as name
        if (blog.author.startsWith("{")) {
          authorData = JSON.parse(blog.author);
        }
      } catch (e) {
        // Fallback to using the string as name
      }

      return {
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        content: blog.content as unknown as string, // It's stored as Json but we might need string for editor? 
                                                    // Actually TiptapEditor expects string (HTML) or JSON. 
                                                    // If we saved HTML string as Json, it comes back as string.
        excerpt: blog.excerpt,
        category: blog.category,
        tags: blog.tags,
        authorName: authorData.name,
        authorRole: authorData.role,
        authorEmail: authorData.email,
        readTime: blog.readTime,
        image: blog.coverImage || undefined,
        status: blog.status as any,
        submittedAt: blog.createdAt.toISOString(),
      } as BlogSubmission;
    });
  } catch (error) {
    console.error("Failed to load blogs:", error);
    return [];
  }
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  try {
    await prisma.blog.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to update blog status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function removeSubmission(id: string) {
  try {
    await prisma.blog.delete({
      where: { id },
    });
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    
    if (!blog) return null;

    let authorData = { name: blog.author, role: "Student Contributor", email: "" };
    try {
      if (blog.author.startsWith("{")) {
        authorData = JSON.parse(blog.author);
      }
    } catch (e) {}

    return {
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      content: blog.content as unknown as string,
      excerpt: blog.excerpt,
      category: blog.category,
      tags: blog.tags,
      authorName: authorData.name,
      authorRole: authorData.role,
      authorEmail: authorData.email,
      readTime: blog.readTime,
      image: blog.coverImage || undefined,
      status: blog.status as any,
      submittedAt: blog.createdAt.toISOString(),
    } as BlogSubmission;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}
