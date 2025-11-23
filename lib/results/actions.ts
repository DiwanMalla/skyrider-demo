"use server";

import { prisma } from "@/lib/prisma";
import { StudentResult, ResultFilter } from "./types";
import { revalidatePath } from "next/cache";

export async function saveResults(results: StudentResult[]) {
  try {
    // We need to handle upserts manually or use createMany with skipDuplicates if supported
    // For now, we'll iterate and upsert to ensure updates work
    // Optimizing: Use createMany for new, but since we might have updates, transaction is safer
    
    const operations = results.map((result) => {
      // Prepare data without ID if it's a new record, or use existing ID
      const { id, ...data } = result;
      
      return prisma.result.upsert({
        where: { id: result.id },
        update: {
          ...data,
          subjects: JSON.parse(JSON.stringify(data.subjects)), // Ensure JSON compatibility
        },
        create: {
          ...data,
          id: result.id,
          subjects: JSON.parse(JSON.stringify(data.subjects)),
        },
      });
    });

    await prisma.$transaction(operations);
    revalidatePath("/admin/results");
    revalidatePath("/results");
    return { success: true };
  } catch (error) {
    console.error("Failed to save results:", error);
    return { success: false, error: "Failed to save results" };
  }
}

export async function getResults(filter?: ResultFilter) {
  try {
    const where: any = {};

    if (filter?.grade) where.grade = filter.grade;
    if (filter?.batch) where.batch = filter.batch;
    if (filter?.symbolNumber) where.symbolNumber = filter.symbolNumber;
    if (filter?.status) where.status = filter.status;
    if (filter?.examType) where.examType = filter.examType;

    const results = await prisma.result.findMany({
      where,
      orderBy: { percentage: "desc" },
    });

    return results as unknown as StudentResult[];
  } catch (error) {
    console.error("Failed to fetch results:", error);
    return [];
  }
}

export async function getResultBySymbolNumber(
  symbolNumber: string,
  dob: string,
  batch?: string,
  examType?: string
) {
  try {
    const where: any = {
      symbolNumber,
      dob,
      published: true,
    };

    if (batch) where.batch = batch;
    if (examType) where.examType = examType;

    const result = await prisma.result.findFirst({
      where,
    });

    return result as unknown as StudentResult | null;
  } catch (error) {
    console.error("Failed to fetch result:", error);
    return null;
  }
}

export async function updateResult(id: string, data: Partial<StudentResult>) {
  try {
    const { id: _, ...updateData } = data;
    
    await prisma.result.update({
      where: { id },
      data: {
        ...updateData,
        subjects: updateData.subjects ? JSON.parse(JSON.stringify(updateData.subjects)) : undefined,
      },
    });
    
    revalidatePath("/admin/results");
    return { success: true };
  } catch (error) {
    console.error("Failed to update result:", error);
    return { success: false, error: "Failed to update result" };
  }
}

export async function deleteResult(id: string) {
  try {
    await prisma.result.delete({
      where: { id },
    });
    revalidatePath("/admin/results");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete result:", error);
    return { success: false, error: "Failed to delete result" };
  }
}

export async function getTopStudents(batch: string, examType: string, limit: number = 5) {
  try {
    const results = await prisma.result.findMany({
      where: {
        batch,
        examType,
        published: true,
      },
      orderBy: {
        percentage: "desc", // Sort by percentage for better accuracy
      },
      take: limit,
    });
    
    return results as unknown as StudentResult[];
  } catch (error) {
    console.error("Failed to fetch top students:", error);
    return [];
  }
}

export async function getExamFolders() {
  try {
    // Group by batch and examType
    // Prisma doesn't support distinct on multiple columns easily with return types in older versions
    // We'll fetch distinct combinations
    const results = await prisma.result.findMany({
      distinct: ['batch', 'examType'],
      select: {
        batch: true,
        examType: true,
      },
      orderBy: {
        batch: 'desc',
      },
    });

    return results;
  } catch (error) {
    console.error("Failed to fetch exam folders:", error);
    return [];
  }
}

export async function publishExamResults(batch: string, examType: string, published: boolean = true) {
  try {
    await prisma.result.updateMany({
      where: {
        batch,
        examType,
      },
      data: {
        published,
      },
    });
    revalidatePath("/admin/results");
    return { success: true };
  } catch (error) {
    console.error("Failed to publish exam results:", error);
    return { success: false, error: "Failed to publish results" };
  }
}
