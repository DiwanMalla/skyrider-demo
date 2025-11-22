"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, GraduationCap, ArrowRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { getTopStudents, getExamFolders } from "@/lib/results/actions";
import { StudentResult } from "@/lib/results/types";

export default function ResultSearchPage() {
  const router = useRouter();
  const [symbolNumber, setSymbolNumber] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [topStudents, setTopStudents] = useState<StudentResult[]>([]);
  const [selectedGrade, setSelectedGrade] = useState("Class 10");
  
  // Exam Selection
  const [examFolders, setExamFolders] = useState<{batch: string, examType: string}[]>([]);
  const [selectedExam, setSelectedExam] = useState("");

  useEffect(() => {
    // Load available exams
    const loadFolders = async () => {
      const folders = await getExamFolders();
      setExamFolders(folders);
      if (folders.length > 0) {
        setSelectedExam(`${folders[0].batch}|${folders[0].examType}`);
      }
    };
    loadFolders();
  }, []);

  useEffect(() => {
    // Load top students for the default/selected grade
    const loadTopStudents = async () => {
      const students = await getTopStudents(selectedGrade, 5);
      setTopStudents(students);
    };
    loadTopStudents();
  }, [selectedGrade]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbolNumber) return;
    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      // Navigate to view page with query params
      const params = new URLSearchParams();
      params.set("symbol", symbolNumber);
      if (dob) params.set("dob", dob);
      
      if (selectedExam) {
        const [batch, examType] = selectedExam.split('|');
        params.set("batch", batch);
        params.set("examType", examType);
      }
      
      router.push(`/results/view?${params.toString()}`);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-4"
          >
            <GraduationCap className="w-8 h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            Check Your Results
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Enter your symbol number and date of birth to view your academic performance and mark sheet.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Select Exam
                </label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900 dark:text-white"
                >
                  {examFolders.length === 0 ? (
                    <option value="">No exams available</option>
                  ) : (
                    examFolders.map((folder) => (
                      <option key={`${folder.batch}|${folder.examType}`} value={`${folder.batch}|${folder.examType}`}>
                        {folder.batch} - {folder.examType}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Symbol Number
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={symbolNumber}
                    onChange={(e) => setSymbolNumber(e.target.value)}
                    placeholder="Enter your symbol number"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900 dark:text-white placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date of Birth (Optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? "Checking..." : "View Result"}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                Top Performers
              </h2>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-600 dark:text-slate-400 focus:outline-none cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>

            <div className="space-y-4">
              {topStudents.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 dark:text-slate-400">
                    No results published yet for this grade.
                  </p>
                </div>
              ) : (
                topStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-md"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                          : index === 1
                          ? "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          : index === 2
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                          : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {student.studentName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Symbol No: {student.symbolNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {student.gpa} GPA
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        {student.status.toUpperCase()}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
