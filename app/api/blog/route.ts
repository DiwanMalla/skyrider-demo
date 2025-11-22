import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mock data for blog posts (kept as fallback)
const blogPosts = [
  {
    id: "1",
    slug: "future-of-education-technology-classroom",
    title: "The Future of Education: Embracing Technology in the Classroom",
    excerpt:
      "Explore how digital tools and innovative teaching methods are transforming the learning experience for students worldwide.",
    content:
      "Technology has revolutionized every aspect of our lives, and education is no exception. From interactive whiteboards to virtual reality field trips, modern classrooms are becoming increasingly digital. This shift brings both opportunities and challenges for educators and students alike.",
    author: {
      name: "Dr. Sarah Johnson",
      role: "Education Director",
      avatar: "/images/authors/sarah.jpg",
    },
    category: "education",
    tags: ["Technology", "Innovation", "Digital Learning"],
    image: "/images/blog/future-education.jpg",
    date: "2025-11-05",
    readTime: "5 min read",
    views: 1234,
    likes: 89,
    status: "published",
  },
  {
    id: "2",
    slug: "building-strong-parent-teacher-partnerships",
    title: "Building Strong Parent-Teacher Partnerships",
    excerpt:
      "Discover effective strategies for fostering meaningful collaboration between parents and teachers to support student success.",
    content:
      "Strong parent-teacher partnerships are essential for student success. When parents and teachers work together, students benefit from consistent support and clear communication about their progress and needs.",
    author: {
      name: "Michael Chen",
      role: "School Counselor",
      avatar: "/images/authors/michael.jpg",
    },
    category: "parenting",
    tags: ["Parents", "Communication", "Collaboration"],
    image: "/images/blog/parent-teacher.jpg",
    date: "2025-11-03",
    readTime: "4 min read",
    views: 956,
    likes: 67,
    status: "published",
  },
  {
    id: "3",
    slug: "stem-education-preparing-students-careers",
    title: "STEM Education: Preparing Students for Tomorrow's Careers",
    excerpt:
      "Learn why STEM education is crucial for developing critical thinking and problem-solving skills in today's students.",
    content:
      "STEM education (Science, Technology, Engineering, and Mathematics) is more important than ever. As our world becomes increasingly technology-driven, students need strong STEM skills to succeed in future careers.",
    author: {
      name: "Dr. Emily Rodriguez",
      role: "STEM Coordinator",
      avatar: "/images/authors/emily.jpg",
    },
    category: "stem",
    tags: ["STEM", "Career", "Future Skills"],
    image: "/images/blog/stem-education.jpg",
    date: "2025-11-01",
    readTime: "6 min read",
    views: 1456,
    likes: 112,
    status: "published",
  },
  {
    id: "4",
    slug: "importance-social-emotional-learning",
    title: "The Importance of Social-Emotional Learning in Schools",
    excerpt:
      "Understanding how SEL programs help students develop essential life skills and emotional intelligence.",
    content:
      "Social-emotional learning (SEL) teaches students to understand and manage emotions, set goals, show empathy for others, establish positive relationships, and make responsible decisions.",
    author: {
      name: "Lisa Thompson",
      role: "Psychology Teacher",
      avatar: "/images/authors/lisa.jpg",
    },
    category: "wellness",
    tags: ["SEL", "Mental Health", "Student Development"],
    image: "/images/blog/social-emotional.jpg",
    date: "2025-10-30",
    readTime: "5 min read",
    views: 823,
    likes: 54,
    status: "published",
  },
  {
    id: "5",
    slug: "creating-inclusive-classrooms",
    title: "Creating Inclusive Classrooms: Strategies for Every Student",
    excerpt:
      "Practical approaches to ensure all students feel valued, respected, and able to learn effectively.",
    content:
      "Inclusive education means all students are welcomed and supported in their local schools and classrooms. Creating an inclusive classroom requires intentional planning and ongoing commitment.",
    author: {
      name: "David Martinez",
      role: "Special Education Coordinator",
      avatar: "/images/authors/david.jpg",
    },
    category: "inclusion",
    tags: ["Inclusion", "Diversity", "Accessibility"],
    image: "/images/blog/inclusive-classroom.jpg",
    date: "2025-10-28",
    readTime: "7 min read",
    views: 1089,
    likes: 78,
    status: "published",
  },
  {
    id: "6",
    slug: "power-project-based-learning",
    title: "The Power of Project-Based Learning",
    excerpt:
      "How hands-on projects engage students and deepen their understanding of complex concepts.",
    content:
      "Project-based learning (PBL) is a teaching method where students learn by actively engaging in real-world and personally meaningful projects. This approach helps students develop deep content knowledge as well as critical thinking, creativity, and communication skills.",
    author: {
      name: "Rachel Kim",
      role: "Curriculum Developer",
      avatar: "/images/authors/rachel.jpg",
    },
    category: "teaching",
    tags: ["PBL", "Active Learning", "Engagement"],
    image: "/images/blog/project-based.jpg",
    date: "2025-10-25",
    readTime: "5 min read",
    views: 967,
    likes: 71,
    status: "published",
  },
  {
    id: "7",
    slug: "supporting-student-mental-health",
    title: "Supporting Student Mental Health in a Post-Pandemic World",
    excerpt:
      "Addressing the mental health challenges students face and creating supportive school environments.",
    content:
      "The pandemic has significantly impacted student mental health. Schools must prioritize mental wellness and create environments where students feel safe to express their concerns and seek help.",
    author: {
      name: "Dr. James Wilson",
      role: "School Psychologist",
      avatar: "/images/authors/james.jpg",
    },
    category: "wellness",
    tags: ["Mental Health", "Support", "Well-being"],
    image: "/images/blog/mental-health.jpg",
    date: "2025-10-22",
    readTime: "6 min read",
    views: 1567,
    likes: 134,
    status: "published",
  },
  {
    id: "8",
    slug: "developing-critical-thinking-skills",
    title: "Developing Critical Thinking Skills in Young Learners",
    excerpt:
      "Effective techniques to help students think independently and analyze information critically.",
    content:
      "Critical thinking is the ability to think clearly and rationally, understanding the logical connection between ideas. Teaching students to think critically prepares them for success in school and beyond.",
    author: {
      name: "Amanda Foster",
      role: "Elementary Principal",
      avatar: "/images/authors/amanda.jpg",
    },
    category: "teaching",
    tags: ["Critical Thinking", "Skills", "Learning"],
    image: "/images/blog/critical-thinking.jpg",
    date: "2025-10-20",
    readTime: "4 min read",
    views: 734,
    likes: 52,
    status: "published",
  },
  {
    id: "9",
    slug: "role-arts-education-student-development",
    title: "The Role of Arts Education in Student Development",
    excerpt:
      "Why creative arts are essential for developing well-rounded, innovative thinkers.",
    content:
      "Arts education is crucial for developing creativity, self-expression, and critical thinking skills. Through music, visual arts, drama, and dance, students learn to see the world from different perspectives.",
    author: {
      name: "Maria Santos",
      role: "Arts Department Head",
      avatar: "/images/authors/maria.jpg",
    },
    category: "arts",
    tags: ["Arts", "Creativity", "Development"],
    image: "/images/blog/arts-education.jpg",
    date: "2025-10-18",
    readTime: "5 min read",
    views: 889,
    likes: 66,
    status: "published",
  },
  {
    id: "10",
    slug: "effective-homework-strategies",
    title: "Effective Homework Strategies for Better Learning Outcomes",
    excerpt:
      "Best practices for assigning meaningful homework that reinforces learning without overwhelming students.",
    content:
      "Homework should be purposeful, engaging, and aligned with learning objectives. When done right, it reinforces classroom learning and helps students develop independent study skills.",
    author: {
      name: "John Anderson",
      role: "Academic Coordinator",
      avatar: "/images/authors/john.jpg",
    },
    category: "teaching",
    tags: ["Homework", "Study Skills", "Learning"],
    image: "/images/blog/homework-strategies.jpg",
    date: "2025-10-15",
    readTime: "4 min read",
    views: 623,
    likes: 45,
    status: "published",
  },
  {
    id: "11",
    slug: "building-digital-citizenship",
    title: "Building Digital Citizenship in the Modern Classroom",
    excerpt:
      "Teaching students to navigate the digital world safely, responsibly, and ethically.",
    content:
      "Digital citizenship is about understanding how to use technology responsibly and safely. Students need guidance on online etiquette, privacy, security, and critical evaluation of digital information.",
    author: {
      name: "Dr. Sarah Johnson",
      role: "Education Director",
      avatar: "/images/authors/sarah.jpg",
    },
    category: "education",
    tags: ["Digital Citizenship", "Online Safety", "Technology"],
    image: "/images/blog/digital-citizenship.jpg",
    date: "2025-10-12",
    readTime: "6 min read",
    views: 1123,
    likes: 89,
    status: "published",
  },
  {
    id: "12",
    slug: "benefits-outdoor-education",
    title: "The Benefits of Outdoor Education and Nature-Based Learning",
    excerpt:
      "Exploring how outdoor experiences enhance student learning and environmental awareness.",
    content:
      "Outdoor education provides unique learning opportunities that cannot be replicated in a traditional classroom. Nature-based learning improves physical health, reduces stress, and fosters environmental stewardship.",
    author: {
      name: "Kevin Brown",
      role: "Environmental Science Teacher",
      avatar: "/images/authors/kevin.jpg",
    },
    category: "education",
    tags: ["Outdoor Education", "Nature", "Environment"],
    image: "/images/blog/outdoor-learning.jpg",
    date: "2025-10-10",
    readTime: "5 min read",
    views: 945,
    likes: 72,
    status: "published",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");

    // Try to fetch from database first
    try {
      let query: any = {
        where: {
          status: "published",
        },
        orderBy: {
          createdAt: "desc",
        },
      };

      // Filter by category
      if (category && category !== "all") {
        query.where.category = category;
      }

      // Filter by search query
      if (search) {
        query.where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } },
          { author: { contains: search, mode: "insensitive" } },
        ];
      }

      // Limit results if specified
      if (limit) {
        query.take = parseInt(limit);
      }

      const dbPosts = await prisma.blog.findMany(query);

      // Transform database posts to match the expected format
      const transformedPosts = dbPosts.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content:
          typeof post.content === "string"
            ? post.content
            : JSON.stringify(post.content),
        author: {
          name: post.author,
          role: "Contributor",
        },
        category: post.category,
        tags: post.tags,
        image: post.coverImage || "/images/blog/student-contribution.png",
        date: post.createdAt.toISOString(),
        readTime: post.readTime,
        views: 0,
        likes: 0,
        status: post.status,
      }));

      // Merge with mock data
      const allPosts = [...transformedPosts, ...blogPosts];

      return NextResponse.json({
        success: true,
        data: allPosts,
        total: allPosts.length,
      });
    } catch (dbError) {
      console.error("Database error, falling back to mock data:", dbError);
      // Fall back to mock data if database fails
      let filteredPosts = [...blogPosts];

      // Filter by category
      if (category && category !== "all") {
        filteredPosts = filteredPosts.filter(
          (post) => post.category === category
        );
      }

      // Filter by search query
      if (search) {
        const searchLower = search.toLowerCase();
        filteredPosts = filteredPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchLower) ||
            post.excerpt.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
            post.author.name.toLowerCase().includes(searchLower)
        );
      }

      // Sort by date (newest first)
      filteredPosts.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      // Limit results if specified
      if (limit) {
        filteredPosts = filteredPosts.slice(0, parseInt(limit));
      }

      return NextResponse.json({
        success: true,
        data: filteredPosts,
        total: filteredPosts.length,
      });
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog posts",
      },
      { status: 500 }
    );
  }
}
