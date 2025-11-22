"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { loadSubmissions } from "@/lib/blog/storage";
import { BlogPostMeta } from "@/lib/blog/types";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPostMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Fetch from the API which now queries the database
        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();

        if (data.success && data.data) {
          setPost(data.data);
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

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
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Post not found
          </h1>
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-500/30 pb-20 pt-16">
        {/* Hero Header */}
        <div
          className={`relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-gradient-to-br ${getCategoryGradient(
            post.category
          )}`}
        >
          {post.image &&
          post.image !== "/images/blog/student-contribution.png" ? (
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </Link>

              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                  {post.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-semibold">
                        {typeof post.author === "string"
                          ? post.author
                          : post.author.name}
                      </span>
                      <span className="text-xs opacity-80">
                        Grade:{" "}
                        {typeof post.author === "string"
                          ? "Contributor"
                          : post.author.role}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-800"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
