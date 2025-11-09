"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Users, ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface Class {
  id: string;
  name: string;
  grade: string;
  subjects: string[];
  totalStudents: number;
}

interface CourseLevelPageProps {
  level: {
    title: string;
    description: string;
    gradeRange: string;
    icon: string;
    gradient: string;
    iconBg: string;
    iconColor: string;
    classes: Class[];
  };
  levelSlug: string;
}

export default function CourseLevelPage({
  level,
  levelSlug,
}: CourseLevelPageProps) {
  const router = useRouter();

  const totalStudents = level.classes.reduce(
    (sum, cls) => sum + cls.totalStudents,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className={`p-3 bg-linear-to-br ${level.gradient} rounded-lg`}>
            <span className="text-2xl">{level.icon}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {level.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {level.gradeRange} • {level.classes.length} Classes •{" "}
              {totalStudents} Students
            </p>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {level.classes.map((classItem, index) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() =>
              router.push(`/admin/courses/${levelSlug}/${classItem.id}`)
            }
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {classItem.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Grade {classItem.grade}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Subjects
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {classItem.subjects.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Students
                </span>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {classItem.totalStudents}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-1">
                  {classItem.subjects.slice(0, 3).map((subject, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                  {classItem.subjects.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      +{classItem.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
