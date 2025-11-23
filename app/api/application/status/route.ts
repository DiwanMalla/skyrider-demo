import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get("authorization");
    const publicToken = process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN;

    if (!authHeader || authHeader !== `Bearer ${publicToken}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    // Validate input
    if (!id || !status) {
      return NextResponse.json(
        { message: "Application ID and status are required" },
        { status: 400 }
      );
    }

    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status. Must be 'accepted' or 'rejected'" },
        { status: 400 }
      );
    }

    // Update status
    const updatedApplication = await prisma.admission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Application ${status} successfully`,
        application: updatedApplication,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
