import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Application {
  id: string;
  status: "pending" | "accepted" | "rejected";
  [key: string]: any;
}

const APPLICATIONS_FILE = path.join(process.cwd(), "data", "applications.json");

function readApplications(): Application[] {
  try {
    const data = fs.readFileSync(APPLICATIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading applications:", error);
    return [];
  }
}

function writeApplications(applications: Application[]) {
  try {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));
  } catch (error) {
    console.error("Error writing applications:", error);
    throw new Error("Failed to save applications");
  }
}

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

    // Read applications
    const applications = readApplications();

    // Find application
    const appIndex = applications.findIndex((app) => app.id === id);

    if (appIndex === -1) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    // Update status
    applications[appIndex].status = status;
    applications[appIndex].reviewedAt = new Date().toISOString();

    // Save updated applications
    writeApplications(applications);

    return NextResponse.json(
      {
        success: true,
        message: `Application ${status} successfully`,
        application: applications[appIndex],
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
