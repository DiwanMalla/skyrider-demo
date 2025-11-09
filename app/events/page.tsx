"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Loader2,
  CalendarDays,
  User,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  organizer: string;
  capacity: number;
  registered: number;
  status: "upcoming" | "completed" | "cancelled";
  tags: string[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const categories = [
    { value: "all", label: "All Events", icon: "📅" },
    { value: "academic", label: "Academic", icon: "📚" },
    { value: "sports", label: "Sports", icon: "⚽" },
    { value: "cultural", label: "Cultural", icon: "🎭" },
    { value: "workshop", label: "Workshop", icon: "🛠️" },
    { value: "social", label: "Social", icon: "🎉" },
  ];

  const statusFilters = [
    { value: "all", label: "All Status" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
  ];

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (selectedStatus !== "all") params.append("status", selectedStatus);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/events?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedStatus, searchQuery]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "from-blue-500 to-indigo-500";
      case "sports":
        return "from-green-500 to-emerald-500";
      case "cultural":
        return "from-purple-500 to-pink-500";
      case "workshop":
        return "from-orange-500 to-red-500";
      case "social":
        return "from-cyan-500 to-blue-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      case "sports":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "cultural":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
      case "workshop":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
      case "social":
        return "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "completed":
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAvailability = (capacity: number, registered: number) => {
    if (capacity === 0) return "Open";
    const percentage = (registered / capacity) * 100;
    if (percentage >= 100) return "Full";
    if (percentage >= 80) return "Almost Full";
    return `${capacity - registered} spots left`;
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
              className="inline-block p-4 bg-linear-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg"
            >
              <Calendar className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              School Events
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover upcoming events, workshops, and activities. Join us in making
              memorable experiences together!
            </p>
          </motion.div>

          {/* Search and Filters */}
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
                placeholder="Search events by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {statusFilters.map((filter) => (
                <motion.button
                  key={filter.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStatus(filter.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    selectedStatus === filter.value
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-500"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-12 h-12 text-indigo-500" />
              </motion.div>
            </div>
          ) : events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No Events Found
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
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedEvent(event)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
                      {/* Header with Gradient */}
                      <div
                        className={`bg-linear-to-r ${getCategoryColor(
                          event.category
                        )} p-6 relative overflow-hidden h-40`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                        <div className="relative h-full flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(
                                event.category
                              )} bg-white/90`}
                            >
                              {event.category}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                                event.status
                              )} bg-white/90`}
                            >
                              {event.status}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
                              {event.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {event.description}
                        </p>

                        {/* Date & Time */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                              <CalendarDays className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                Date
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                {new Date(event.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                Time
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                {event.time}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                Location
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                {event.location}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Availability */}
                        {event.capacity > 0 && (
                          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                Registration
                              </span>
                              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                {getAvailability(event.capacity, event.registered)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-linear-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${Math.min(
                                    (event.registered / event.capacity) * 100,
                                    100
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {event.registered} registered
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {event.capacity} capacity
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {event.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Event Detail Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div
                  className={`relative h-48 bg-linear-to-r ${getCategoryColor(
                    selectedEvent.category
                  )} overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(
                          selectedEvent.category
                        )} bg-white/90`}
                      >
                        {selectedEvent.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                          selectedEvent.status
                        )} bg-white/90`}
                      >
                        {selectedEvent.status}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      About This Event
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Date
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatDate(selectedEvent.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Time
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedEvent.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Location
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedEvent.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Organizer
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedEvent.organizer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Capacity Info */}
                  {selectedEvent.capacity > 0 && (
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Registration Status
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                          {getAvailability(
                            selectedEvent.capacity,
                            selectedEvent.registered
                          )}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                        <div
                          className="bg-linear-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (selectedEvent.registered / selectedEvent.capacity) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{selectedEvent.registered} registered</span>
                        <span>{selectedEvent.capacity} capacity</span>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedEvent.status === "upcoming" && (
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 py-3 bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg">
                        Register Now
                      </button>
                      <button className="flex-1 py-3 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-lg font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300">
                        Add to Calendar
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
