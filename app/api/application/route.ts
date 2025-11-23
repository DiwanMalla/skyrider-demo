import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Check for duplicate email
    const existingApplication = await prisma.admission.findUnique({
      where: { email: body.email.trim().toLowerCase() },
    });

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
    const newApplication = await prisma.admission.create({
      data: {
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
        previousSchool: body.previousSchool?.trim() || null,
        guardianName: body.guardianName.trim(),
        guardianPhone: body.guardianPhone.trim(),
        guardianEmail: body.guardianEmail.trim().toLowerCase(),
        medicalConditions: body.medicalConditions?.trim() || null,
        emergencyContact: body.emergencyContact.trim(),
        emergencyPhone: body.emergencyPhone.trim(),
        hearAboutUs: body.hearAboutUs?.trim() || null,
        additionalInfo: body.additionalInfo?.trim() || null,
        status: "pending",
      },
    });

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

    const applications = await prisma.admission.findMany({
      orderBy: { submittedAt: "desc" },
    });

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
