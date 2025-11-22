"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Filter,
  LayoutGrid,
  Loader2,
  PenLine,
  Search,
  Sparkles,
  User,
  X,
  ChevronRight,
  TrendingUp,
  Tag,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/blog/AuroraBackground";
import {
  loadSubmissions,
} from "@/lib/blog/actions";
import { BlogSubmission } from "@/lib/blog/types";
import { sortSubmissions } from "@/lib/blog/utils";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  image?: string;
  date: string;
  readTime: string;
  views: number;
  likes: number;
  status: string;
}

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

export default function BlogPage() {
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [submissions, setSubmissions] = useState<BlogSubmission[]>([]);

  const acceptedSubmissions = useMemo(
    () => submissions.filter((submission) => submission.status === "accepted"),
    [submissions]
  );

  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all")
        params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/blog?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setPublishedPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const data = await loadSubmissions();
      setSubmissions(sortSubmissions(data));
    };

    fetchSubmissions();

    // Auto-refresh every 10 seconds to check for new published posts
    // This avoids unnecessary refreshes by only updating if data changes (React state handles diffing)
    const interval = setInterval(fetchSubmissions, 10000);

    return () => clearInterval(interval);
  }, []);

  const displayPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesFilters = (category: string, haystack: string) => {
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;
      if (!matchesCategory) return false;
      if (!normalizedSearch) return true;
      return haystack.includes(normalizedSearch);
    };

    const acceptedAsPosts = acceptedSubmissions
      .filter((submission) =>
        matchesFilters(
          submission.category,
          `${submission.title} ${submission.content} ${submission.excerpt} ${
            submission.authorName
          } ${submission.tags.join(" ")}`.toLowerCase()
        )
      )
      .map(
        (submission) =>
          ({
            id: submission.id,
            slug: submission.slug || submission.id, // Fallback if slug missing
            title: submission.title,
            excerpt: submission.excerpt.replace(/<[^>]*>?/gm, ""),
            content: submission.content,
            author: {
              name: submission.authorName,
              role: submission.authorRole ?? "Student Contributor",
            },
            category: submission.category,
            tags: submission.tags,
            image: submission.image || "/images/blog/student-contribution.png",
            date: submission.submittedAt,
            readTime: submission.readTime,
            views: 0,
            likes: 0,
            status: "published",
          } satisfies BlogPost)
      );

    const publishedMatches = publishedPosts.filter((post) =>
      matchesFilters(
        post.category,
        `${post.title} ${post.content} ${post.excerpt} ${
          post.author.name
        } ${post.tags.join(" ")}`.toLowerCase()
      )
    );

    const combined = [...acceptedAsPosts, ...publishedMatches];
    combined.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return combined;
  }, [acceptedSubmissions, publishedPosts, searchQuery, selectedCategory]);

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "education":
        return "from-sky-500 to-blue-600";
      case "teaching":
        return "from-purple-500 to-pink-600";
      case "wellness":
        return "from-emerald-400 to-teal-600";
      case "stem":
        return "from-amber-400 to-orange-600";
      case "arts":
        return "from-rose-400 to-red-600";
      case "parenting":
        return "from-cyan-400 to-blue-600";
      case "inclusion":
        return "from-teal-400 to-emerald-600";
      default:
        return "from-slate-500 to-slate-700";
    }
  };

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
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-blue-500/30">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[600px] w-full overflow-hidden pt-20">
          <div className="absolute inset-0 bg-slate-900/20 dark:bg-black/60 z-0" />
          <AuroraBackground />
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
                    className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      selectedCategory === category.value
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Blog Grid */}
          <section>
            {loadingPosts ? (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <p className="text-slate-500 animate-pulse">
                  Loading stories...
                </p>
              </div>
            ) : displayPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  No stories found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  We couldn&apos;t find any articles matching your search. Try
                  adjusting your filters or be the first to write about this
                  topic!
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {displayPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex flex-col h-full"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex flex-col h-full"
                      >
                        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 h-full flex flex-col">
                          {/* Card Image/Gradient */}
                          <div
                            className={`relative h-48 overflow-hidden bg-gradient-to-br ${getCategoryGradient(
                              post.category
                            )}`}
                          >
                            {post.image && post.image !== "/images/blog/student-contribution.png" ? (
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              </>
                            )}

                            <div className="absolute top-4 left-4 z-10">
                              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                                {post.category}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex flex-1 flex-col p-6">
                            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(post.date)}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                                  <User className="w-4 h-4 text-slate-500 dark:text-slate-300" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                                    {post.author.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                    {post.author.role}
                                  </span>
                                </div>
                              </div>

                              <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
