"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Filter,
  Loader2,
  PenLine,
  Search,
  Sparkles,
  User,
  ChevronRight,
  TrendingUp,
  Tag,
} from "lucide-react";
import { BlogSubmission } from "@/lib/blog/types";
import Link from "next/link";
import AuroraBackground from "./AuroraBackground";

const categories = [
  { value: "all", label: "All Posts", icon: "🌐" },
  { value: "education", label: "Education", icon: "🎓" },
  { value: "teaching", label: "Teaching", icon: "👩‍🏫" },
  { value: "wellness", label: "Wellness", icon: "💚" },
  { value: "stem", label: "STEM", icon: "🔬" },
  { value: "arts", label: "Arts", icon: "🎨" },
  { value: "parenting", label: "Parenting", icon: "👨‍👩‍👧" },
  { value: "inclusion", label: "Inclusion", icon: "🤝" },
];

interface BlogContentProps {
  initialPosts: BlogSubmission[];
}

export default function BlogContent({ initialPosts }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const displayPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!normalizedSearch) return true;

      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[600px] w-full overflow-hidden pt-20">
        <div className="absolute inset-0 bg-slate-900/20 dark:bg-black/60 z-0" />
        <div className="absolute inset-0">
          <AuroraBackground />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-sm font-medium text-slate-800 dark:text-white shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Student Voices</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Discover Stories <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                That Inspire
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A platform for students to share their perspectives, research,
              and creativity with the world.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/blog/submit"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PenLine className="w-4 h-4" />
                  Start Writing Now
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm px-8 py-3 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:bg-white dark:hover:bg-white/10">
                Read Guidelines
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/50 p-4 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border-none py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.value
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <Sparkles className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            displayPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.image && (
                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-semibold text-slate-900 dark:text-white">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.submittedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {post.authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {post.authorName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {post.authorRole}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </>
  );
}
