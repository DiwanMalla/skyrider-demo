export interface Subject {
  id: string;
  name: string;
  totalStudents: number;
  status: "active" | "inactive";
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  subjects: Subject[];
  totalStudents: number;
}

export interface CourseLevel {
  id: string;
  level: "elementary" | "middle" | "high";
  title: string;
  description: string;
  gradeRange: string;
  icon: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  classes: Class[];
  totalStudents: number;
  totalClasses: number;
}

export const courseLevels: CourseLevel[] = [
  {
    id: "1",
    level: "elementary",
    title: "Elementary School",
    description: "Building foundation for young learners",
    gradeRange: "Nursery - Grade 5",
    icon: "🎨",
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    totalClasses: 7,
    totalStudents: 245,
    classes: [
      {
        id: "nursery",
        name: "Nursery",
        grade: "Nursery",
        totalStudents: 28,
        subjects: [
          {
            id: "s1",
            name: "Early Learning",
            totalStudents: 28,
            status: "active",
          },
          {
            id: "s2",
            name: "Play Activities",
            totalStudents: 28,
            status: "active",
          },
        ],
      },
      {
        id: "kg",
        name: "KG",
        grade: "KG",
        totalStudents: 35,
        subjects: [
          {
            id: "s3",
            name: "Basic English",
            totalStudents: 35,
            status: "active",
          },
          { id: "s4", name: "Basic Math", totalStudents: 35, status: "active" },
          {
            id: "s5",
            name: "Creative Arts",
            totalStudents: 35,
            status: "active",
          },
        ],
      },
      {
        id: "grade-1",
        name: "Grade 1",
        grade: "1",
        totalStudents: 32,
        subjects: [
          { id: "s6", name: "English", totalStudents: 32, status: "active" },
          {
            id: "s7",
            name: "Mathematics",
            totalStudents: 32,
            status: "active",
          },
          { id: "s8", name: "Science", totalStudents: 32, status: "active" },
          {
            id: "s9",
            name: "Social Studies",
            totalStudents: 32,
            status: "active",
          },
        ],
      },
      {
        id: "grade-2",
        name: "Grade 2",
        grade: "2",
        totalStudents: 30,
        subjects: [
          { id: "s10", name: "English", totalStudents: 30, status: "active" },
          {
            id: "s11",
            name: "Mathematics",
            totalStudents: 30,
            status: "active",
          },
          { id: "s12", name: "Science", totalStudents: 30, status: "active" },
          {
            id: "s13",
            name: "Social Studies",
            totalStudents: 30,
            status: "active",
          },
        ],
      },
      {
        id: "grade-3",
        name: "Grade 3",
        grade: "3",
        totalStudents: 35,
        subjects: [
          { id: "s14", name: "English", totalStudents: 35, status: "active" },
          {
            id: "s15",
            name: "Mathematics",
            totalStudents: 35,
            status: "active",
          },
          { id: "s16", name: "Science", totalStudents: 35, status: "active" },
          {
            id: "s17",
            name: "Social Studies",
            totalStudents: 35,
            status: "active",
          },
          { id: "s18", name: "Nepali", totalStudents: 35, status: "active" },
        ],
      },
      {
        id: "grade-4",
        name: "Grade 4",
        grade: "4",
        totalStudents: 40,
        subjects: [
          { id: "s19", name: "English", totalStudents: 40, status: "active" },
          {
            id: "s20",
            name: "Mathematics",
            totalStudents: 40,
            status: "active",
          },
          { id: "s21", name: "Science", totalStudents: 40, status: "active" },
          {
            id: "s22",
            name: "Social Studies",
            totalStudents: 40,
            status: "active",
          },
          { id: "s23", name: "Nepali", totalStudents: 40, status: "active" },
        ],
      },
      {
        id: "grade-5",
        name: "Grade 5",
        grade: "5",
        totalStudents: 45,
        subjects: [
          { id: "s24", name: "English", totalStudents: 45, status: "active" },
          {
            id: "s25",
            name: "Mathematics",
            totalStudents: 45,
            status: "active",
          },
          { id: "s26", name: "Science", totalStudents: 45, status: "active" },
          {
            id: "s27",
            name: "Social Studies",
            totalStudents: 45,
            status: "active",
          },
          { id: "s28", name: "Nepali", totalStudents: 45, status: "active" },
          { id: "s29", name: "Computer", totalStudents: 45, status: "active" },
        ],
      },
    ],
  },
  {
    id: "2",
    level: "middle",
    title: "Middle School",
    description: "Comprehensive curriculum for growing minds",
    gradeRange: "Grade 6 - Grade 10",
    icon: "📚",
    gradient: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    totalClasses: 5,
    totalStudents: 225,
    classes: [
      {
        id: "grade-6",
        name: "Grade 6",
        grade: "6",
        totalStudents: 42,
        subjects: [
          { id: "s30", name: "English", totalStudents: 42, status: "active" },
          {
            id: "s31",
            name: "Mathematics",
            totalStudents: 42,
            status: "active",
          },
          { id: "s32", name: "Science", totalStudents: 42, status: "active" },
          {
            id: "s33",
            name: "Social Studies",
            totalStudents: 42,
            status: "active",
          },
          { id: "s34", name: "Nepali", totalStudents: 42, status: "active" },
          { id: "s35", name: "Computer", totalStudents: 42, status: "active" },
        ],
      },
      {
        id: "grade-7",
        name: "Grade 7",
        grade: "7",
        totalStudents: 45,
        subjects: [
          { id: "s36", name: "English", totalStudents: 45, status: "active" },
          {
            id: "s37",
            name: "Mathematics",
            totalStudents: 45,
            status: "active",
          },
          { id: "s38", name: "Science", totalStudents: 45, status: "active" },
          {
            id: "s39",
            name: "Social Studies",
            totalStudents: 45,
            status: "active",
          },
          { id: "s40", name: "Nepali", totalStudents: 45, status: "active" },
          { id: "s41", name: "Computer", totalStudents: 45, status: "active" },
        ],
      },
      {
        id: "grade-8",
        name: "Grade 8",
        grade: "8",
        totalStudents: 48,
        subjects: [
          { id: "s42", name: "English", totalStudents: 48, status: "active" },
          {
            id: "s43",
            name: "Mathematics",
            totalStudents: 48,
            status: "active",
          },
          { id: "s44", name: "Science", totalStudents: 48, status: "active" },
          {
            id: "s45",
            name: "Social Studies",
            totalStudents: 48,
            status: "active",
          },
          { id: "s46", name: "Nepali", totalStudents: 48, status: "active" },
          { id: "s47", name: "Computer", totalStudents: 48, status: "active" },
          {
            id: "s48",
            name: "Optional Math",
            totalStudents: 28,
            status: "active",
          },
        ],
      },
      {
        id: "grade-9",
        name: "Grade 9",
        grade: "9",
        totalStudents: 45,
        subjects: [
          { id: "s49", name: "English", totalStudents: 45, status: "active" },
          {
            id: "s50",
            name: "Mathematics",
            totalStudents: 45,
            status: "active",
          },
          { id: "s51", name: "Science", totalStudents: 45, status: "active" },
          {
            id: "s52",
            name: "Social Studies",
            totalStudents: 45,
            status: "active",
          },
          { id: "s53", name: "Nepali", totalStudents: 45, status: "active" },
          { id: "s54", name: "Computer", totalStudents: 45, status: "active" },
          {
            id: "s55",
            name: "Optional Math",
            totalStudents: 30,
            status: "active",
          },
        ],
      },
      {
        id: "grade-10",
        name: "Grade 10",
        grade: "10",
        totalStudents: 45,
        subjects: [
          { id: "s56", name: "English", totalStudents: 45, status: "active" },
          {
            id: "s57",
            name: "Mathematics",
            totalStudents: 45,
            status: "active",
          },
          { id: "s58", name: "Science", totalStudents: 45, status: "active" },
          {
            id: "s59",
            name: "Social Studies",
            totalStudents: 45,
            status: "active",
          },
          { id: "s60", name: "Nepali", totalStudents: 45, status: "active" },
          { id: "s61", name: "Computer", totalStudents: 45, status: "active" },
          {
            id: "s62",
            name: "Optional Math",
            totalStudents: 32,
            status: "active",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    level: "high",
    title: "High School",
    description: "Advanced preparation for higher education",
    gradeRange: "Grade 11 - Grade 12",
    icon: "🎓",
    gradient: "from-orange-500 to-red-500",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    totalClasses: 4,
    totalStudents: 145,
    classes: [
      {
        id: "grade-11-science",
        name: "Grade 11 - Science",
        grade: "11",
        totalStudents: 40,
        subjects: [
          { id: "s63", name: "Physics", totalStudents: 40, status: "active" },
          { id: "s64", name: "Chemistry", totalStudents: 40, status: "active" },
          { id: "s65", name: "Biology", totalStudents: 40, status: "active" },
          {
            id: "s66",
            name: "Mathematics",
            totalStudents: 40,
            status: "active",
          },
          { id: "s67", name: "English", totalStudents: 40, status: "active" },
        ],
      },
      {
        id: "grade-11-management",
        name: "Grade 11 - Management",
        grade: "11",
        totalStudents: 35,
        subjects: [
          {
            id: "s68",
            name: "Accountancy",
            totalStudents: 35,
            status: "active",
          },
          { id: "s69", name: "Economics", totalStudents: 35, status: "active" },
          {
            id: "s70",
            name: "Business Studies",
            totalStudents: 35,
            status: "active",
          },
          { id: "s71", name: "English", totalStudents: 35, status: "active" },
          { id: "s72", name: "Nepali", totalStudents: 35, status: "active" },
        ],
      },
      {
        id: "grade-12-science",
        name: "Grade 12 - Science",
        grade: "12",
        totalStudents: 38,
        subjects: [
          { id: "s73", name: "Physics", totalStudents: 38, status: "active" },
          { id: "s74", name: "Chemistry", totalStudents: 38, status: "active" },
          { id: "s75", name: "Biology", totalStudents: 38, status: "active" },
          {
            id: "s76",
            name: "Mathematics",
            totalStudents: 38,
            status: "active",
          },
          { id: "s77", name: "English", totalStudents: 38, status: "active" },
        ],
      },
      {
        id: "grade-12-management",
        name: "Grade 12 - Management",
        grade: "12",
        totalStudents: 32,
        subjects: [
          {
            id: "s78",
            name: "Accountancy",
            totalStudents: 32,
            status: "active",
          },
          { id: "s79", name: "Economics", totalStudents: 32, status: "active" },
          {
            id: "s80",
            name: "Business Studies",
            totalStudents: 32,
            status: "active",
          },
          { id: "s81", name: "English", totalStudents: 32, status: "active" },
          { id: "s82", name: "Nepali", totalStudents: 32, status: "active" },
        ],
      },
    ],
  },
];

export const getLevelBySlug = (slug: string) => {
  return courseLevels.find((level) => level.level === slug);
};

export const getClassById = (classId: string) => {
  for (const level of courseLevels) {
    const classData = level.classes.find((cls) => cls.id === classId);
    if (classData) {
      return {
        classData,
        levelTitle: level.title,
        levelGradient: level.gradient,
      };
    }
  }
  return null;
};
