"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Mail,
  Phone,
  Award,
  BookOpen,
  Star,
  Clock,
  Loader2,
  GraduationCap,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Tutor {
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

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const fetchTutors = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/tutors?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setTutors(data.data);
      }
    } catch (error) {
      console.error("Error fetching tutors:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "on-leave":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400";
      case "inactive":
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
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
            className="inline-block p-4 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg"
          >
            <Users className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Expert Tutors
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meet our dedicated team of experienced educators committed to your
            academic success.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tutors by name, subject, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm"
            />
          </div>
        </motion.div>

        {/* Tutors Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-purple-500" />
            </motion.div>
          </div>
        ) : tutors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No Tutors Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria
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
              {tutors.map((tutor, index) => (
                <motion.div
                  key={tutor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedTutor(tutor)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
                    {/* Header with Image */}
                    <div className="relative h-48 bg-linear-to-br from-purple-500 to-pink-500 overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            tutor.status
                          )} backdrop-blur-sm`}
                        >
                          {tutor.status}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
                          <div className="flex items-center justify-center h-full bg-linear-to-br from-purple-400 to-pink-400">
                            <Users className="w-10 h-10 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-16 p-6 space-y-4">
                      {/* Name and Rating */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {tutor.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {tutor.qualification}
                        </p>
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(tutor.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                            ({tutor.rating})
                          </span>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="flex items-center justify-center gap-2 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {tutor.experience} Years Experience
                        </span>
                      </div>

                      {/* Specializations */}
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 font-medium">
                          SPECIALIZATIONS
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tutor.specialization.slice(0, 2).map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-medium"
                            >
                              {spec}
                            </span>
                          ))}
                          {tutor.specialization.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                              +{tutor.specialization.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-bold text-gray-900 dark:text-white">
                              {tutor.totalStudents}
                            </span>{" "}
                            Students
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-bold text-gray-900 dark:text-white">
                              {tutor.subjects.length}
                            </span>{" "}
                            Subjects
                          </p>
                        </div>
                      </div>

                      {/* View Profile Button */}
                      <button className="w-full py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg">
                        View Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Tutor Detail Modal */}
      <AnimatePresence>
        {selectedTutor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTutor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="relative h-32 bg-linear-to-r from-purple-500 to-pink-500">
                <button
                  onClick={() => setSelectedTutor(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Profile Image */}
              <div className="px-6 -mt-16 relative">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl">
                  <div className="flex items-center justify-center h-full bg-linear-to-br from-purple-400 to-pink-400">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Name and Status */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedTutor.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {selectedTutor.qualification}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(selectedTutor.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {selectedTutor.rating} / 5.0
                    </span>
                  </div>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      selectedTutor.status
                    )}`}
                  >
                    {selectedTutor.status}
                  </span>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    About
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedTutor.bio}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Email
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {selectedTutor.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedTutor.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience and Availability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Experience
                      </p>
                      <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                        {selectedTutor.experience} Years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Availability
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedTutor.availability}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTutor.specialization.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Subjects Teaching
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTutor.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Classes */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Classes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTutor.classes.map((cls, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg">
                    Contact Tutor
                  </button>
                  <button className="flex-1 py-3 border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    Schedule Meeting
                  </button>
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
