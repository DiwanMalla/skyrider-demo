import { NextResponse } from "next/server";

export interface ClassItem {
  id: string;
  name: string;
  grade: string;
  level: string;
  totalStudents: number;
  subjects: string[];
  teacher: string;
  schedule: string;
  room: string;
  status: "active" | "inactive";
}

// Mock data - replace with actual database calls
const classes: ClassItem[] = [
  {
    id: "nursery",
    name: "Nursery",
    grade: "Nursery",
    level: "elementary",
    totalStudents: 28,
    subjects: ["Early Learning", "Play Activities"],
    teacher: "Ms. Sarah Johnson",
    schedule: "Mon-Fri, 8:00 AM - 12:00 PM",
    room: "Room A-101",
    status: "active",
  },
  {
    id: "kg",
    name: "KG",
    grade: "KG",
    level: "elementary",
    totalStudents: 35,
    subjects: ["Basic English", "Basic Math", "Creative Arts"],
    teacher: "Ms. Emily Chen",
    schedule: "Mon-Fri, 8:00 AM - 1:00 PM",
    room: "Room A-102",
    status: "active",
  },
  {
    id: "grade-1",
    name: "Grade 1",
    grade: "1",
    level: "elementary",
    totalStudents: 32,
    subjects: ["English", "Mathematics", "Science", "Social Studies"],
    teacher: "Mr. David Brown",
    schedule: "Mon-Fri, 8:30 AM - 2:30 PM",
    room: "Room B-201",
    status: "active",
  },
  {
    id: "grade-2",
    name: "Grade 2",
    grade: "2",
    level: "elementary",
    totalStudents: 30,
    subjects: ["English", "Mathematics", "Science", "Social Studies"],
    teacher: "Ms. Maria Garcia",
    schedule: "Mon-Fri, 8:30 AM - 2:30 PM",
    room: "Room B-202",
    status: "active",
  },
  {
    id: "grade-3",
    name: "Grade 3",
    grade: "3",
    level: "elementary",
    totalStudents: 35,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Nepali"],
    teacher: "Mr. James Wilson",
    schedule: "Mon-Fri, 8:30 AM - 3:00 PM",
    room: "Room B-203",
    status: "active",
  },
  {
    id: "grade-6",
    name: "Grade 6",
    grade: "6",
    level: "middle",
    totalStudents: 42,
    subjects: [
      "English",
      "Mathematics",
      "Science",
      "Social Studies",
      "Nepali",
      "Computer",
    ],
    teacher: "Dr. Robert Taylor",
    schedule: "Mon-Fri, 8:30 AM - 3:30 PM",
    room: "Room C-301",
    status: "active",
  },
  {
    id: "grade-8",
    name: "Grade 8",
    grade: "8",
    level: "middle",
    totalStudents: 48,
    subjects: [
      "English",
      "Mathematics",
      "Science",
      "Social Studies",
      "Nepali",
      "Computer",
      "Optional Math",
    ],
    teacher: "Ms. Jennifer Lee",
    schedule: "Mon-Fri, 8:30 AM - 3:30 PM",
    room: "Room C-303",
    status: "active",
  },
  {
    id: "grade-10",
    name: "Grade 10",
    grade: "10",
    level: "middle",
    totalStudents: 45,
    subjects: [
      "English",
      "Mathematics",
      "Science",
      "Social Studies",
      "Nepali",
      "Computer",
      "Optional Math",
    ],
    teacher: "Mr. Michael Anderson",
    schedule: "Mon-Fri, 8:30 AM - 4:00 PM",
    room: "Room C-305",
    status: "active",
  },
  {
    id: "grade-11-science",
    name: "Grade 11 - Science",
    grade: "11",
    level: "high",
    totalStudents: 40,
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English"],
    teacher: "Dr. Patricia Martinez",
    schedule: "Mon-Fri, 9:00 AM - 4:00 PM",
    room: "Room D-401",
    status: "active",
  },
  {
    id: "grade-11-management",
    name: "Grade 11 - Management",
    grade: "11",
    level: "high",
    totalStudents: 35,
    subjects: [
      "Accountancy",
      "Economics",
      "Business Studies",
      "English",
      "Nepali",
    ],
    teacher: "Mr. Christopher Davis",
    schedule: "Mon-Fri, 9:00 AM - 4:00 PM",
    room: "Room D-402",
    status: "active",
  },
  {
    id: "grade-12-science",
    name: "Grade 12 - Science",
    grade: "12",
    level: "high",
    totalStudents: 38,
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English"],
    teacher: "Dr. Amanda White",
    schedule: "Mon-Fri, 9:00 AM - 4:00 PM",
    room: "Room D-403",
    status: "active",
  },
  {
    id: "grade-12-management",
    name: "Grade 12 - Management",
    grade: "12",
    level: "high",
    totalStudents: 32,
    subjects: [
      "Accountancy",
      "Economics",
      "Business Studies",
      "English",
      "Nepali",
    ],
    teacher: "Ms. Lisa Thompson",
    schedule: "Mon-Fri, 9:00 AM - 4:00 PM",
    room: "Room D-404",
    status: "active",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");
    const search = searchParams.get("search");

    let filteredClasses = classes;

    // Filter by level
    if (level && level !== "all") {
      filteredClasses = filteredClasses.filter((cls) => cls.level === level);
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredClasses = filteredClasses.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchLower) ||
          cls.teacher.toLowerCase().includes(searchLower) ||
          cls.subjects.some((subject) =>
            subject.toLowerCase().includes(searchLower)
          )
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredClasses,
      total: filteredClasses.length,
    });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}
