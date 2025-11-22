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

    await prisma.blog.create({
      data: {
        ...data,
        id: submission.id, // Use client-generated ID or let DB generate? 
                           // If we want to respect client ID:
        slug,
        content: JSON.parse(JSON.stringify(data.content)),
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
    return blogs as unknown as BlogSubmission[];
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
    return blog as unknown as BlogSubmission | null;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}
