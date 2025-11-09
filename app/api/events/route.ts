import { NextResponse } from "next/server";

// Mock data for events
const events = [
  {
    id: "1",
    title: "Annual Science Fair",
    description: "Showcase your innovative science projects and experiments. Students from all grades are encouraged to participate and demonstrate their scientific creativity.",
    date: "2025-11-15",
    time: "9:00 AM - 4:00 PM",
    location: "Main Auditorium",
    category: "academic",
    image: "/images/events/science-fair.jpg",
    organizer: "Science Department",
    capacity: 200,
    registered: 156,
    status: "upcoming",
    tags: ["Science", "Competition", "Innovation"],
  },
  {
    id: "2",
    title: "Winter Sports Day",
    description: "Join us for a day of athletic competitions, team sports, and outdoor activities. All students and parents are welcome to participate or cheer for their teams.",
    date: "2025-11-20",
    time: "8:00 AM - 5:00 PM",
    location: "Sports Complex",
    category: "sports",
    image: "/images/events/sports-day.jpg",
    organizer: "Physical Education Department",
    capacity: 500,
    registered: 423,
    status: "upcoming",
    tags: ["Sports", "Competition", "Outdoor"],
  },
  {
    id: "3",
    title: "Art Exhibition 2025",
    description: "Display of student artwork including paintings, sculptures, and digital art. A celebration of creativity and artistic expression from our talented students.",
    date: "2025-11-25",
    time: "10:00 AM - 6:00 PM",
    location: "Art Gallery",
    category: "cultural",
    image: "/images/events/art-exhibition.jpg",
    organizer: "Arts Department",
    capacity: 150,
    registered: 98,
    status: "upcoming",
    tags: ["Art", "Exhibition", "Creative"],
  },
  {
    id: "4",
    title: "Parent-Teacher Conference",
    description: "Meet with teachers to discuss your child's academic progress, behavior, and development. Schedule your appointments in advance.",
    date: "2025-11-18",
    time: "2:00 PM - 7:00 PM",
    location: "Classrooms",
    category: "academic",
    image: "/images/events/parent-teacher.jpg",
    organizer: "Administration",
    capacity: 300,
    registered: 245,
    status: "upcoming",
    tags: ["Parents", "Academic", "Meeting"],
  },
  {
    id: "5",
    title: "Music Concert",
    description: "An evening of musical performances by our school orchestra, choir, and individual talents. Come support our young musicians!",
    date: "2025-11-22",
    time: "6:00 PM - 9:00 PM",
    location: "Theater Hall",
    category: "cultural",
    image: "/images/events/music-concert.jpg",
    organizer: "Music Department",
    capacity: 250,
    registered: 187,
    status: "upcoming",
    tags: ["Music", "Performance", "Entertainment"],
  },
  {
    id: "6",
    title: "Coding Bootcamp",
    description: "Intensive coding workshop for students interested in programming. Learn Python, JavaScript, and web development fundamentals.",
    date: "2025-11-28",
    time: "9:00 AM - 3:00 PM",
    location: "Computer Lab",
    category: "workshop",
    image: "/images/events/coding-bootcamp.jpg",
    organizer: "Computer Science Department",
    capacity: 50,
    registered: 48,
    status: "upcoming",
    tags: ["Technology", "Workshop", "Coding"],
  },
  {
    id: "7",
    title: "Career Fair",
    description: "Meet professionals from various industries and learn about career opportunities. Perfect for high school students planning their future.",
    date: "2025-12-02",
    time: "10:00 AM - 4:00 PM",
    location: "Main Hall",
    category: "academic",
    image: "/images/events/career-fair.jpg",
    organizer: "Guidance Office",
    capacity: 400,
    registered: 312,
    status: "upcoming",
    tags: ["Career", "Networking", "Future"],
  },
  {
    id: "8",
    title: "Drama Club Performance",
    description: "Watch our talented drama club perform 'A Midsummer Night's Dream'. An enchanting theatrical experience for the whole family.",
    date: "2025-12-05",
    time: "7:00 PM - 9:30 PM",
    location: "Theater Hall",
    category: "cultural",
    image: "/images/events/drama-performance.jpg",
    organizer: "Drama Club",
    capacity: 200,
    registered: 165,
    status: "upcoming",
    tags: ["Drama", "Performance", "Theater"],
  },
  {
    id: "9",
    title: "Mathematics Olympiad",
    description: "Test your mathematical skills in our annual olympiad. Prizes for top performers in each grade level.",
    date: "2025-10-28",
    time: "9:00 AM - 12:00 PM",
    location: "Exam Hall",
    category: "academic",
    image: "/images/events/math-olympiad.jpg",
    organizer: "Mathematics Department",
    capacity: 100,
    registered: 87,
    status: "completed",
    tags: ["Mathematics", "Competition", "Academic"],
  },
  {
    id: "10",
    title: "Halloween Costume Party",
    description: "Dress up in your spookiest costumes and join us for a fun-filled Halloween celebration with games, treats, and prizes!",
    date: "2025-10-31",
    time: "4:00 PM - 7:00 PM",
    location: "School Grounds",
    category: "social",
    image: "/images/events/halloween-party.jpg",
    organizer: "Student Council",
    capacity: 350,
    registered: 298,
    status: "completed",
    tags: ["Social", "Festival", "Fun"],
  },
  {
    id: "11",
    title: "Thanksgiving Food Drive",
    description: "Help us collect food donations for families in need this Thanksgiving season. Drop off non-perishable items at the collection center.",
    date: "2025-11-24",
    time: "All Day",
    location: "Main Entrance",
    category: "social",
    image: "/images/events/food-drive.jpg",
    organizer: "Community Service Club",
    capacity: 0,
    registered: 0,
    status: "upcoming",
    tags: ["Community", "Service", "Charity"],
  },
  {
    id: "12",
    title: "Robotics Competition",
    description: "Watch our robotics team compete in regional championships. Support our tech-savvy students as they showcase their engineering skills!",
    date: "2025-12-08",
    time: "10:00 AM - 5:00 PM",
    location: "Engineering Lab",
    category: "academic",
    image: "/images/events/robotics.jpg",
    organizer: "Robotics Club",
    capacity: 80,
    registered: 76,
    status: "upcoming",
    tags: ["Robotics", "Technology", "Competition"],
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let filteredEvents = [...events];

    // Filter by category
    if (category && category !== "all") {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === category
      );
    }

    // Filter by status
    if (status && status !== "all") {
      filteredEvents = filteredEvents.filter(
        (event) => event.status === status
      );
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by date (upcoming events first)
    filteredEvents.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    return NextResponse.json({
      success: true,
      data: filteredEvents,
      total: filteredEvents.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch events",
      },
      { status: 500 }
    );
  }
}
