import { NextResponse } from "next/server";

export interface Tutor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  subjects: string[];
  experience: number;
  qualification: string;
  image: string;
  bio: string;
  rating: number;
  totalStudents: number;
  classes: string[];
  availability: string;
  status: "active" | "on-leave" | "inactive";
}

// Mock data - replace with actual database calls
const tutors: Tutor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@skyrider.edu",
    phone: "+977-9801234567",
    specialization: ["Early Childhood Education", "Child Psychology"],
    subjects: ["Early Learning", "Play Activities"],
    experience: 15,
    qualification: "Ph.D. in Early Childhood Education",
    image: "/images/tutors/tutor-1.jpg",
    bio: "Passionate educator with 15 years of experience in early childhood education. Believes in nurturing young minds through play-based learning.",
    rating: 4.9,
    totalStudents: 28,
    classes: ["Nursery"],
    availability: "Mon-Fri, 8:00 AM - 2:00 PM",
    status: "active",
  },
  {
    id: "2",
    name: "Prof. Emily Chen",
    email: "emily.chen@skyrider.edu",
    phone: "+977-9801234568",
    specialization: ["Elementary Education", "Arts & Crafts"],
    subjects: ["Basic English", "Basic Math", "Creative Arts"],
    experience: 12,
    qualification: "M.Ed. in Elementary Education",
    image: "/images/tutors/tutor-2.jpg",
    bio: "Creative and enthusiastic teacher who loves combining academics with artistic expression to make learning fun and memorable.",
    rating: 4.8,
    totalStudents: 35,
    classes: ["KG"],
    availability: "Mon-Fri, 8:00 AM - 3:00 PM",
    status: "active",
  },
  {
    id: "3",
    name: "Mr. David Brown",
    email: "david.brown@skyrider.edu",
    phone: "+977-9801234569",
    specialization: ["Mathematics", "Science"],
    subjects: ["English", "Mathematics", "Science", "Social Studies"],
    experience: 10,
    qualification: "M.Sc. in Mathematics Education",
    image: "/images/tutors/tutor-3.jpg",
    bio: "Dedicated teacher focused on building strong mathematical foundations while making complex concepts easy to understand.",
    rating: 4.7,
    totalStudents: 32,
    classes: ["Grade 1"],
    availability: "Mon-Fri, 8:30 AM - 3:30 PM",
    status: "active",
  },
  {
    id: "4",
    name: "Ms. Maria Garcia",
    email: "maria.garcia@skyrider.edu",
    phone: "+977-9801234570",
    specialization: ["English Literature", "Creative Writing"],
    subjects: ["English", "Mathematics", "Science", "Social Studies"],
    experience: 8,
    qualification: "M.A. in English Literature",
    image: "/images/tutors/tutor-4.jpg",
    bio: "Passionate about fostering a love for reading and writing in young students while maintaining strong academic standards.",
    rating: 4.8,
    totalStudents: 30,
    classes: ["Grade 2"],
    availability: "Mon-Fri, 8:30 AM - 3:30 PM",
    status: "active",
  },
  {
    id: "5",
    name: "Dr. Robert Taylor",
    email: "robert.taylor@skyrider.edu",
    phone: "+977-9801234571",
    specialization: ["Physics", "Computer Science"],
    subjects: ["Mathematics", "Science", "Computer"],
    experience: 18,
    qualification: "Ph.D. in Physics",
    image: "/images/tutors/tutor-5.jpg",
    bio: "Experienced educator with a passion for STEM education. Believes in hands-on learning and real-world applications.",
    rating: 4.9,
    totalStudents: 42,
    classes: ["Grade 6"],
    availability: "Mon-Fri, 8:30 AM - 4:00 PM",
    status: "active",
  },
  {
    id: "6",
    name: "Ms. Jennifer Lee",
    email: "jennifer.lee@skyrider.edu",
    phone: "+977-9801234572",
    specialization: ["Mathematics", "Optional Mathematics"],
    subjects: ["Mathematics", "Optional Math", "Computer"],
    experience: 14,
    qualification: "M.Sc. in Applied Mathematics",
    image: "/images/tutors/tutor-6.jpg",
    bio: "Expert in advanced mathematics with a talent for breaking down complex problems into manageable steps.",
    rating: 4.9,
    totalStudents: 48,
    classes: ["Grade 8"],
    availability: "Mon-Fri, 8:30 AM - 4:00 PM",
    status: "active",
  },
  {
    id: "7",
    name: "Mr. Michael Anderson",
    email: "michael.anderson@skyrider.edu",
    phone: "+977-9801234573",
    specialization: ["Science", "Biology"],
    subjects: ["Science", "Biology", "Social Studies"],
    experience: 16,
    qualification: "M.Sc. in Biology",
    image: "/images/tutors/tutor-7.jpg",
    bio: "Biology enthusiast who brings scientific concepts to life through experiments and interactive demonstrations.",
    rating: 4.8,
    totalStudents: 45,
    classes: ["Grade 10"],
    availability: "Mon-Fri, 8:30 AM - 4:30 PM",
    status: "active",
  },
  {
    id: "8",
    name: "Dr. Patricia Martinez",
    email: "patricia.martinez@skyrider.edu",
    phone: "+977-9801234574",
    specialization: ["Physics", "Chemistry", "Advanced Sciences"],
    subjects: ["Physics", "Chemistry", "Biology"],
    experience: 20,
    qualification: "Ph.D. in Physical Chemistry",
    image: "/images/tutors/tutor-8.jpg",
    bio: "Renowned scientist and educator specializing in preparing students for competitive exams and higher education.",
    rating: 5.0,
    totalStudents: 40,
    classes: ["Grade 11 - Science"],
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    status: "active",
  },
  {
    id: "9",
    name: "Mr. Christopher Davis",
    email: "christopher.davis@skyrider.edu",
    phone: "+977-9801234575",
    specialization: ["Business Studies", "Economics", "Accountancy"],
    subjects: ["Accountancy", "Economics", "Business Studies"],
    experience: 13,
    qualification: "MBA, CFA",
    image: "/images/tutors/tutor-9.jpg",
    bio: "Business professional turned educator with real-world experience in finance and management.",
    rating: 4.8,
    totalStudents: 35,
    classes: ["Grade 11 - Management"],
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    status: "active",
  },
  {
    id: "10",
    name: "Dr. Amanda White",
    email: "amanda.white@skyrider.edu",
    phone: "+977-9801234576",
    specialization: ["Advanced Biology", "Medical Sciences"],
    subjects: ["Biology", "Chemistry", "Physics"],
    experience: 17,
    qualification: "Ph.D. in Molecular Biology",
    image: "/images/tutors/tutor-10.jpg",
    bio: "Medical sciences expert preparing students for medical entrance exams and university-level studies.",
    rating: 4.9,
    totalStudents: 38,
    classes: ["Grade 12 - Science"],
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    status: "active",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");
    const search = searchParams.get("search");
    const minExperience = searchParams.get("minExperience");

    let filteredTutors = tutors;

    // Filter by subject
    if (subject && subject !== "all") {
      filteredTutors = filteredTutors.filter((tutor) =>
        tutor.subjects.some((s) => s.toLowerCase() === subject.toLowerCase())
      );
    }

    // Filter by minimum experience
    if (minExperience) {
      const exp = parseInt(minExperience);
      filteredTutors = filteredTutors.filter(
        (tutor) => tutor.experience >= exp
      );
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTutors = filteredTutors.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(searchLower) ||
          tutor.specialization.some((spec) =>
            spec.toLowerCase().includes(searchLower)
          ) ||
          tutor.subjects.some((subject) =>
            subject.toLowerCase().includes(searchLower)
          )
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredTutors,
      total: filteredTutors.length,
    });
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tutors" },
      { status: 500 }
    );
  }
}
