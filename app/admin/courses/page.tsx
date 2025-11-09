"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Plus,
  Search,
  BookOpen,
  Users,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { courseLevels } from "@/lib/courseData";

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate total statistics
  const totalStudents = courseLevels.reduce(
    (sum, level) => sum + level.totalStudents,
    0
  );
  const totalClasses = courseLevels.reduce(
    (sum, level) => sum + level.totalClasses,
    0
  );

  const handleLevelClick = (levelSlug: string) => {
    router.push(`/admin/courses/${levelSlug}`);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Course Management
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage education levels, classes, and subjects
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            Add Level
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Students
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalStudents}
                </p>
              </div>
              <div className="p-3 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Classes
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalClasses}
                </p>
              </div>
              <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Education Levels
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {courseLevels.length}
                </p>
              </div>
              <div className="p-3 bg-linear-to-br from-orange-500 to-red-500 rounded-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by level, class, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Course Levels List */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {courseLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLevelClick(level.level)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
            >
              {/* Level Header */}
              <div
                className={`p-6 bg-linear-to-br ${level.gradient} group-hover:opacity-95 transition-opacity`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{level.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {level.title}
                      </h3>
                      <p className="mt-1 text-white/80">{level.description}</p>
                      <p className="mt-1 text-sm text-white/70">
                        {level.gradeRange}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Level Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {level.totalClasses}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Classes
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {level.totalStudents}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Students
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Click to view classes and subjects
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
