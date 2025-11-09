import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the application interface
interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  program: string;
  educationLevel: string;
  previousSchool: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
  hearAboutUs: string;
  additionalInfo: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

// Path to store applications
const APPLICATIONS_FILE = path.join(process.cwd(), "data", "applications.json");

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([], null, 2));
  }
}

// Read applications from file
function readApplications(): Application[] {
  ensureDataDirectory();
  try {
    const data = fs.readFileSync(APPLICATIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading applications:", error);
    return [];
  }
}

// Write applications to file
function writeApplications(applications: Application[]) {
  ensureDataDirectory();
  try {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));
  } catch (error) {
    console.error("Error writing applications:", error);
    throw new Error("Failed to save application");
  }
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

// POST - Submit new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "address",
      "city",
      "state",
      "zipCode",
      "program",
      "educationLevel",
      "guardianName",
      "guardianPhone",
      "guardianEmail",
      "emergencyContact",
      "emergencyPhone",
    ];

    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email formats
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.guardianEmail)) {
      return NextResponse.json(
        { message: "Invalid guardian email format" },
        { status: 400 }
      );
    }

    // Validate phone formats
    if (!isValidPhone(body.phone)) {
      return NextResponse.json(
        { message: "Invalid phone number format" },
        { status: 400 }
      );
    }

    if (!isValidPhone(body.guardianPhone)) {
      return NextResponse.json(
        { message: "Invalid guardian phone number format" },
        { status: 400 }
      );
    }

    if (!isValidPhone(body.emergencyPhone)) {
      return NextResponse.json(
        { message: "Invalid emergency phone number format" },
        { status: 400 }
      );
    }

    // Read existing applications
    const applications = readApplications();

    // Check for duplicate email
    const existingApplication = applications.find(
      (app) => app.email.toLowerCase() === body.email.toLowerCase()
    );

    if (existingApplication) {
      return NextResponse.json(
        {
          message:
            "An application with this email already exists. Please contact us if you need to update your application.",
        },
        { status: 409 }
      );
    }

    // Create new application
    const newApplication: Application = {
      id: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      dateOfBirth: body.dateOfBirth.trim(),
      address: body.address.trim(),
      city: body.city.trim(),
      state: body.state.trim(),
      zipCode: body.zipCode.trim(),
      country: body.country?.trim() || "Nepal",
      program: body.program.trim(),
      educationLevel: body.educationLevel.trim(),
      previousSchool: body.previousSchool?.trim() || "",
      guardianName: body.guardianName.trim(),
      guardianPhone: body.guardianPhone.trim(),
      guardianEmail: body.guardianEmail.trim().toLowerCase(),
      medicalConditions: body.medicalConditions?.trim() || "",
      emergencyContact: body.emergencyContact.trim(),
      emergencyPhone: body.emergencyPhone.trim(),
      hearAboutUs: body.hearAboutUs?.trim() || "",
      additionalInfo: body.additionalInfo?.trim() || "",
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    // Add to applications array
    applications.push(newApplication);

    // Save to file
    writeApplications(applications);

    // Return success response
    return NextResponse.json(
      {
        message: "Application submitted successfully",
        applicationId: newApplication.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// GET - Retrieve all applications (protected route - will add auth later)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    const authHeader = request.headers.get("authorization");
    const publicToken = process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN;

    // Simple token check (you should use proper auth in production)
    if (authHeader && authHeader !== `Bearer ${publicToken}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const applications = readApplications();

    return NextResponse.json(
      {
        success: true,
        applications,
        total: applications.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
