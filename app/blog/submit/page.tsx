"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Edit3,
  Eye,
  Image as ImageIcon,
  LayoutTemplate,
  Loader2,
  Save,
  Search,
  Send,
  Settings,
  Sparkles,
  Type,
  Upload,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import TiptapEditor from "@/components/blog/TiptapEditor";
import { saveSubmission } from "@/lib/blog/actions"; // Changed from storage to actions
import { BlogSubmission } from "@/lib/blog/types";
import { createExcerpt, estimateReadTime, generateSlug } from "@/lib/blog/utils";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added useRouter

interface SubmissionFormState {
  title: string;
  authorName: string;
  authorRole: string;
  authorEmail: string;
  category: string;
  tags: string;
  content: string;
  coverImage: string | null;
}

const categories = [
  { value: "education", label: "Education", icon: "🎓" },
  { value: "teaching", label: "Teaching", icon: "👩‍🏫" },
  { value: "wellness", label: "Wellness", icon: "💚" },
  { value: "stem", label: "STEM", icon: "🔬" },
  { value: "arts", label: "Arts", icon: "🎨" },
  { value: "parenting", label: "Parenting", icon: "👨‍👩‍👧" },
  { value: "inclusion", label: "Inclusion", icon: "🤝" },
];

const initialFormState: SubmissionFormState = {
  title: "",
  authorName: "",
  authorRole: "",
  authorEmail: "",
  category: "education",
  tags: "",
  content: "",
  coverImage: null,
};

const DRAFT_KEY = "skyrider_blog_draft_v1";

export default function BlogSubmitPage() {
  const [formState, setFormState] =
    useState<SubmissionFormState>(initialFormState);
  const [formLoading, setFormLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const router = useRouter(); // Initialized useRouter

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormState(parsed);
        setLastSaved(new Date());
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (JSON.stringify(formState) !== JSON.stringify(initialFormState)) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formState));
        setLastSaved(new Date());
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formState]);

  // Save on window close/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (JSON.stringify(formState) !== JSON.stringify(initialFormState)) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formState));
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formState]);

  // Calculate stats
  const getTextFromHTML = (html: string) => {
    if (typeof document === "undefined") return "";
    // Replace block endings with spaces to prevent concatenation
    const htmlWithSpaces = html
      .replace(/<\/p>/g, " </p>")
      .replace(/<\/div>/g, " </div>")
      .replace(/<br\s*\/?>/g, " ");
    const div = document.createElement("div");
    div.innerHTML = htmlWithSpaces;
    return (div.textContent || div.innerText || "").trim();
  };

  const plainText =
    typeof window !== "undefined" ? getTextFromHTML(formState.content) : "";
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readTime = estimateReadTime(plainText);

  const handleImageUpload = async (file: File): Promise<string> => {
    if (file.size > 5 * 1024 * 1024) {
      setToast({
        type: "error",
        message: `Image is too large. Please use images under 5MB.`,
      });
      throw new Error("Image too large");
    }

    if (!file.type.startsWith("image/")) {
      setToast({
        type: "error",
        message: `File is not an image. Please upload image files only.`,
      });
      throw new Error("Not an image");
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await handleImageUpload(file);
        setFormState((prev) => ({ ...prev, coverImage: base64 }));
      } catch (error) {
        // Error handled in handleImageUpload
      }
    }
  };

  const handleFormChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (!formState.title.trim() || !formState.content.trim()) {
      setToast({
        type: "error",
        message: "Please provide a title and content.",
      });
      return;
    }

    if (!formState.authorName.trim()) {
      setToast({
        type: "error",
        message: "Please provide author details.",
      });
      setShowSettings(true);
      return;
    }

    const tags = formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    setFormLoading(true);

    try {
      const submission: BlogSubmission = {
        id: crypto.randomUUID?.() ?? Date.now().toString(36),
        slug: generateSlug(formState.title.trim()),
        title: formState.title.trim(),
        content: formState.content.trim(),
        excerpt: createExcerpt(formState.content),
        category: formState.category,
        tags,
        authorName: formState.authorName.trim(),
        authorRole: formState.authorRole.trim() || "Student Contributor",
        authorEmail: formState.authorEmail.trim() || undefined,
        readTime: estimateReadTime(formState.content),
        image: formState.coverImage || undefined,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      const result = await saveSubmission(submission);
      if (result.success) {
        // Clear draft
        if (typeof window !== "undefined") {
          localStorage.removeItem(DRAFT_KEY); // Use DRAFT_KEY
        }
        
        router.push("/blog/submit/success");
      } else {
        alert("Failed to submit blog post. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setFormLoading(false); // Use setFormLoading
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col">
      <Navbar />

      {/* Top Bar */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2 text-sm text-slate-500">
              {lastSaved ? (
                <>
                  <Save className="w-4 h-4" />
                  <span>
                    Saved{" "}
                    {lastSaved.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </>
              ) : (
                <span>Unsaved changes</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isPreview
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {isPreview ? (
                <Edit3 className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              {isPreview ? "Edit" : "Preview"}
            </button>
            <button
              onClick={handleSubmitClick}
              disabled={formLoading}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {formLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Publish
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition ${
                showSettings
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <LayoutTemplate className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 mt-8">
        <div className="flex gap-8">
          {/* Main Editor Area */}
          <motion.div
            layout
            className={`flex-1 min-w-0 space-y-8 ${
              isPreview ? "max-w-4xl mx-auto" : ""
            }`}
          >
            {isPreview ? (
              <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                {formState.coverImage && (
                  <img
                    src={formState.coverImage}
                    alt="Cover"
                    className="w-full h-64 object-cover rounded-xl mb-8"
                  />
                )}
                <h1>{formState.title || "Untitled Post"}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-500 not-prose mb-8">
                  <span>{formState.authorName || "Anonymous"}</span>
                  <span>• {readTime}</span>
                  <span>• {formState.category}</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: formState.content }} />
              </div>
            ) : (
              <>
                {/* Cover Image Upload */}
                <div className="group relative w-full h-48 sm:h-64 bg-slate-100 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden transition hover:border-slate-400 dark:hover:border-slate-600">
                  {formState.coverImage ? (
                    <>
                      <img
                        src={formState.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() =>
                          setFormState((prev) => ({
                            ...prev,
                            coverImage: null,
                          }))
                        }
                        className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/50 rounded-full text-slate-700 dark:text-white opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span className="font-medium">Add a cover image</span>
                      <span className="text-xs mt-1 opacity-70">
                        Recommended: 1200x630px
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverImageUpload}
                      />
                    </label>
                  )}
                </div>

                {/* Title Input */}
                <input
                  name="title"
                  value={formState.title}
                  onChange={handleFormChange}
                  placeholder="Article Title..."
                  className="w-full text-4xl sm:text-5xl font-bold bg-transparent border-none outline-none placeholder-slate-300 dark:placeholder-slate-700 text-slate-900 dark:text-white leading-tight"
                />

                {/* Editor */}
                <div className="min-h-[500px]">
                  <TiptapEditor
                    content={formState.content}
                    onChange={(html) =>
                      setFormState((prev) => ({ ...prev, content: html }))
                    }
                    onImageUpload={handleImageUpload}
                    placeholder="Tell your story..."
                  />
                </div>
              </>
            )}
          </motion.div>

          {/* Sidebar Settings */}
          <AnimatePresence mode="popLayout">
            {showSettings && !isPreview && (
              <motion.div
                initial={{ opacity: 0, x: 20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 320 }}
                exit={{ opacity: 0, x: 20, width: 0 }}
                className="hidden lg:block shrink-0"
              >
                <div className="sticky top-36 space-y-6 mt-16">
                  {/* Publishing Details */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Publishing Details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                          Author Name
                        </label>
                        <input
                          name="authorName"
                          value={formState.authorName}
                          onChange={handleFormChange}
                          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                          Class / Grade
                        </label>
                        <input
                          name="authorRole"
                          value={formState.authorRole}
                          onChange={handleFormChange}
                          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                          placeholder="e.g. Grade 10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                          Category
                        </label>
                        <select
                          name="category"
                          value={formState.category}
                          onChange={handleFormChange}
                          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                        >
                          {categories.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.icon} {c.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                          Tags
                        </label>
                        <input
                          name="tags"
                          value={formState.tags}
                          onChange={handleFormChange}
                          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                          placeholder="comma, separated, tags"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SEO Preview */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Search Preview
                    </h3>
                    <div className="bg-white dark:bg-slate-950 p-4 rounded-lg font-sans border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300">
                          <span className="sr-only">Skyrider</span>
                          S
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-900 dark:text-slate-200 font-medium">
                            Skyrider
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            https://skyrider.com › blog › {formState.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-xl font-medium hover:underline truncate cursor-pointer mb-1">
                        {formState.title || "Your Article Title"}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        <span className="text-slate-400 dark:text-slate-500 text-xs mr-2">
                          {new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          —
                        </span>
                        {getTextFromHTML(formState.content).slice(0, 160) ||
                          "Your article description will appear here. This preview shows how your post might appear in search engine results."}
                        ...
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-xs text-slate-400 flex justify-between px-2">
                    <span>{wordCount} words</span>
                    <span>{readTime}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 right-6 z-50 rounded-xl px-4 py-3 text-sm shadow-lg font-medium ${
            toast.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-rose-500 text-white"
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}
