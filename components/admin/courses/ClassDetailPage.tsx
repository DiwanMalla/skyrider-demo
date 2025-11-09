"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Users,
  ArrowLeft,
  Edit2,
  Trash2,
  X,
  GraduationCap,
  UserCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
}

interface Subject {
  id: string;
  name: string;
  totalStudents: number;
  status: "active" | "inactive";
  teachers?: Teacher[];
  students?: Student[];
}

interface ClassDetailPageProps {
  classData: {
    id: string;
    name: string;
    grade: string;
    subjects: Subject[];
    totalStudents: number;
  };
  levelTitle: string;
  levelGradient: string;
}

export default function ClassDetailPage({
  classData,
  levelTitle,
  levelGradient,
}: ClassDetailPageProps) {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTab, setActiveTab] = useState<"students" | "teachers">(
    "students"
  );

  // Mock data for students and teachers (will be replaced with API data later)
  const getMockStudents = (totalStudents: number): Student[] => {
    return Array.from({ length: Math.min(totalStudents, 10) }, (_, i) => ({
      id: `stu-${i + 1}`,
      name: `Student ${i + 1}`,
      rollNumber: `${classData.grade}-${String(i + 1).padStart(3, "0")}`,
      email: `student${i + 1}@school.com`,
      phone: `+977-98${String(Math.floor(Math.random() * 100000000)).padStart(
        8,
        "0"
      )}`,
    }));
  };

  const getMockTeachers = (): Teacher[] => {
    return [
      {
        id: "tch-1",
        name: "Mr. John Doe",
        email: "john.doe@school.com",
        phone: "+977-9801234567",
        specialization: "Mathematics",
      },
      {
        id: "tch-2",
        name: "Ms. Jane Smith",
        email: "jane.smith@school.com",
        phone: "+977-9801234568",
        specialization: "Science",
      },
    ];
  };

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject({
      ...subject,
      students: getMockStudents(subject.totalStudents),
      teachers: getMockTeachers(),
    });
    setActiveTab("students");
  };

  const closeModal = () => {
    setSelectedSubject(null);
  };

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
          <div className={`p-3 bg-linear-to-br ${levelGradient} rounded-lg`}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {classData.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Grade {classData.grade} • {levelTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Students in {classData.name}
            </p>
            <p className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
              {classData.totalStudents}
            </p>
          </div>
          <div className={`p-4 bg-linear-to-br ${levelGradient} rounded-lg`}>
            <Users className="w-10 h-10 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Subjects List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Subjects ({classData.subjects.length})
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {classData.subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSubjectClick(subject)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {subject.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {subject.totalStudents} students
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      subject.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {subject.status}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit functionality
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete functionality
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSubject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className={`bg-linear-to-br ${levelGradient} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedSubject.name}
                    </h2>
                    <p className="text-white/80 mt-1">
                      {classData.name} • Grade {classData.grade}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Tab Toggle */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setActiveTab("students")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "students"
                        ? "bg-white text-gray-900"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span className="font-medium">
                      Students ({selectedSubject.totalStudents})
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("teachers")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "teachers"
                        ? "bg-white text-gray-900"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <UserCircle className="w-5 h-5" />
                    <span className="font-medium">
                      Teachers ({selectedSubject.teachers?.length || 0})
                    </span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {activeTab === "students" ? (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Student List
                    </h3>
                    {selectedSubject.students &&
                    selectedSubject.students.length > 0 ? (
                      selectedSubject.students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {student.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Roll No: {student.rollNumber}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {student.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {student.phone}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No students enrolled yet
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Teacher List
                    </h3>
                    {selectedSubject.teachers &&
                    selectedSubject.teachers.length > 0 ? (
                      selectedSubject.teachers.map((teacher) => (
                        <div
                          key={teacher.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                              <UserCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {teacher.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {teacher.specialization}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {teacher.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {teacher.phone}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No teachers assigned yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
