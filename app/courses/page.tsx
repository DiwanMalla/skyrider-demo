"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  Search,
  Clock,
  MapPin,
  GraduationCap,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface ClassItem {
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

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const levels = [
    { value: "all", label: "All Levels", icon: "🎓" },
    { value: "elementary", label: "Elementary", icon: "🎨" },
    { value: "middle", label: "Middle School", icon: "📚" },
    { value: "high", label: "High School", icon: "🎓" },
  ];

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedLevel !== "all") params.append("level", selectedLevel);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/classes?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setClasses(data.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedLevel, searchQuery]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "elementary":
        return "from-blue-500 to-cyan-500";
      case "middle":
        return "from-purple-500 to-pink-500";
      case "high":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "elementary":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      case "middle":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
      case "high":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block p-4 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-2xl mb-6 shadow-lg"
            >
              <GraduationCap className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Classes
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our diverse range of classes from elementary to high
              school, each designed to provide exceptional education.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search classes, teachers, or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Level Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {levels.map((level) => (
                <motion.button
                  key={level.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLevel(level.value)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedLevel === level.value
                      ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <span className="text-lg">{level.icon}</span>
                  {level.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Classes Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-12 h-12 text-emerald-500" />
              </motion.div>
            </div>
          ) : classes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No Classes Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {classes.map((classItem, index) => (
                  <motion.div
                    key={classItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
                      {/* Header with Gradient */}
                      <div
                        className={`bg-gradient-to-r ${getLevelColor(
                          classItem.level
                        )} p-6 relative overflow-hidden`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                        <div className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelBadgeColor(
                                classItem.level
                              )} bg-white/90`}
                            >
                              {classItem.level}
                            </span>
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {classItem.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            Grade {classItem.grade}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Teacher */}
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              Class Teacher
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                              {classItem.teacher}
                            </p>
                          </div>
                        </div>

                        {/* Schedule */}
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              Schedule
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {classItem.schedule}
                            </p>
                          </div>
                        </div>

                        {/* Room */}
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              Room
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {classItem.room}
                            </p>
                          </div>
                        </div>

                        {/* Students Count */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              <span className="font-bold text-gray-900 dark:text-white">
                                {classItem.totalStudents}
                              </span>{" "}
                              Students
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 group-hover:gap-3 transition-all cursor-pointer"
                            onClick={() => setSelectedClass(classItem)}
                          >
                            <span className="text-sm font-medium">
                              View Details
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Subjects Preview */}
                        <div className="flex flex-wrap gap-2">
                          {classItem.subjects
                            .slice(0, 3)
                            .map((subject, idx) => (
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
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Class Details Modal */}
        <AnimatePresence>
          {selectedClass && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedClass(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="relative h-32 bg-linear-to-r from-emerald-500 to-sky-500">
                  <button
                    onClick={() => setSelectedClass(null)}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Class Info */}
                  <div className="text-center -mt-16 relative">
                    <div className="w-20 h-20 mx-auto rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
                      {selectedClass.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Grade {selectedClass.grade} • {selectedClass.level}
                    </p>
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getLevelBadgeColor(
                        selectedClass.level
                      )}`}
                    >
                      {selectedClass.level}
                    </span>
                  </div>

                  {/* Class Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Teacher
                        </p>
                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {selectedClass.teacher}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Schedule
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedClass.schedule}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Room
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedClass.room}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Subjects ({selectedClass.subjects.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedClass.subjects.map((subject, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
                        >
                          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {subject}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {selectedClass.totalStudents}
                        </span>{" "}
                        Students
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
