"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Search, Trophy, GraduationCap, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { getTopStudents, getExamFolders } from "@/lib/results/actions";
import { StudentResult } from "@/lib/results/types";
import Navbar from "@/components/Navbar";

function FloatingOrb({ delay = 0, className }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.2, 1],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  );
}

export default function ResultSearchPage() {
  const router = useRouter();
  const [symbolNumber, setSymbolNumber] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [topStudents, setTopStudents] = useState<StudentResult[]>([]);
  
  // Exam Selection
  const [examFolders, setExamFolders] = useState<{batch: string, examType: string}[]>([]);
  const [selectedExam, setSelectedExam] = useState("");

  // Mouse tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
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
    const loadTopStudents = async () => {
      if (!selectedExam) return;
      const [batch, examType] = selectedExam.split('|');
      const students = await getTopStudents(batch, examType, 5);
      setTopStudents(students);
    };
    loadTopStudents();
  }, [selectedExam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbolNumber) return;
    setLoading(true);
    
    setTimeout(() => {
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
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden selection:bg-blue-500/30 transition-colors duration-300">
      <Navbar />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300" />
        
        <FloatingOrb className="top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20" delay={0} />
        <FloatingOrb className="bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/20" delay={2} />
        <FloatingOrb className="top-1/2 left-1/2 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/20" delay={1} />
      </div>

      <div className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl mb-4 shadow-2xl shadow-blue-500/20"
          >
            <GraduationCap className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white">
              Check Your Results
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Access your academic performance instantly. Enter your details below to view your complete mark sheet and progress report.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="lg:col-span-7 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <form onSubmit={handleSearch} className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-600 dark:text-blue-200 uppercase tracking-wider ml-1">
                    Select Examination
                  </label>
                  <div className="relative group/input">
                    <select
                      value={selectedExam}
                      onChange={(e) => setSelectedExam(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all text-slate-900 dark:text-white appearance-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-900/70"
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
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-600 dark:text-blue-200 uppercase tracking-wider ml-1">
                      Symbol Number
                    </label>
                    <div className="relative group/input">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400 group-focus-within/input:text-blue-500 dark:group-focus-within/input:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        value={symbolNumber}
                        onChange={(e) => setSymbolNumber(e.target.value)}
                        placeholder="e.g. 102030"
                        className="w-full pl-14 pr-6 py-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-900/70"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-600 dark:text-blue-200 uppercase tracking-wider ml-1">
                      Date of Birth
                    </label>
                    <div className="relative group/input">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400 group-focus-within/input:text-blue-500 dark:group-focus-within/input:text-blue-400 transition-colors" />
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-900/70 [color-scheme:light] dark:[color-scheme:dark]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">{loading ? "Processing..." : "View Result"}</span>
                  {!loading && <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />}
                </button>
              </form>
            </motion.div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  </div>
                  Top Performers
                </h2>
                {selectedExam && (
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {selectedExam.split('|')[1]}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {topStudents.length === 0 ? (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3 opacity-50" />
                    <p className="text-slate-500 dark:text-slate-500">
                      No results published yet.
                    </p>
                  </div>
                ) : (
                  topStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="group flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-800/60 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ${
                          index === 0
                            ? "bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-amber-500/20"
                            : index === 1
                            ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-slate-500/20"
                            : index === 2
                            ? "bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-orange-500/20"
                            : "bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {student.studentName}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                          {student.symbolNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-white/10 px-2 py-1 rounded-lg inline-block mb-1">
                          {student.gpa}
                        </div>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase">
                          {student.status}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
