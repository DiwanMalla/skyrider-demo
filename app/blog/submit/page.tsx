"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Edit3,
  Eye,
  FileText,
  Loader2,
  Maximize2,
  Minimize2,
  Send,
  Sparkles,
  Type,
  Users,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/blog/AuroraBackground";
import TiptapEditor from "@/components/blog/TiptapEditor";
import { saveSubmission } from "@/lib/blog/storage";
import { BlogSubmission } from "@/lib/blog/types";
import { createExcerpt, estimateReadTime } from "@/lib/blog/utils";
import Link from "next/link";

interface SubmissionFormState {
  title: string;
  authorName: string;
  authorRole: string;
  authorEmail: string;
  category: string;
  tags: string;
  content: string;
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
  tags: "learning, community",
  content: "",
};

export default function BlogSubmitPage() {
  const [formState, setFormState] =
    useState<SubmissionFormState>(initialFormState);
  const [formLoading, setFormLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  // Calculate stats from HTML content
  const getTextFromHTML = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const plainText =
    typeof window !== "undefined" ? getTextFromHTML(formState.content) : "";
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readTime = estimateReadTime(plainText);
  const characterCount = plainText.length;

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

  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!formState.title.trim() || !formState.content.trim()) {
      setToast({
        type: "error",
        message: "Please provide a title and full article content.",
      });
      return;
    }

    if (!formState.authorName.trim()) {
      setToast({
        type: "error",
        message: "Let us know who is submitting the article.",
      });
      return;
    }

    const tags = formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (tags.length === 0) {
      setToast({
        type: "error",
        message: "Add at least one tag so readers can discover your post.",
      });
      return;
    }

    setFormLoading(true);

    try {
      const submission: BlogSubmission = {
        id: crypto.randomUUID?.() ?? Date.now().toString(36),
        title: formState.title.trim(),
        content: formState.content.trim(),
        excerpt: createExcerpt(formState.content),
        category: formState.category,
        tags,
        authorName: formState.authorName.trim(),
        authorRole: formState.authorRole.trim() || "Student Contributor",
        authorEmail: formState.authorEmail.trim() || undefined,
        readTime: estimateReadTime(formState.content),
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      saveSubmission(submission);
      setFormState(initialFormState);
      setToast({
        type: "success",
        message: "Submission sent to admin for review. Redirecting...",
      });

      setTimeout(() => {
        window.location.href = "/blog";
      }, 2000);
    } catch (error) {
      console.error("Failed to save submission", error);
      setToast({
        type: "error",
        message: "Unable to submit right now. Please try again shortly.",
      });
      setFormLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.08),rgba(2,6,23,1))]" />
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 pb-12">
            <div className="relative border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl p-8 overflow-hidden shadow-[0_15px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_15px_80px_rgba(15,23,42,0.4)]">
              <AuroraBackground />
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to blog
                </Link>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/10 px-4 py-2 text-sm font-medium text-slate-700 dark:text-white/80 mb-6">
                  <Sparkles className="w-4 h-4" />
                  Submit Your Story
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
                  Share your voice.
                  <span className="block text-blue-600 dark:text-amber-300 font-bold">
                    Inspire the community.
                  </span>
                </h1>
                <p className="mt-6 text-lg text-slate-600 dark:text-white/80">
                  Your submission will be reviewed by our admin team. Once
                  approved, your article will be published for the entire
                  community to read.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mt-12 bg-slate-50 dark:bg-slate-900 pb-24 pt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Writing Interface */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                      <Edit3 className="w-5 h-5 text-amber-500" />
                      Write Your Story
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {wordCount} words
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Type className="w-4 h-4" />
                        {characterCount} chars
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPreview(!isPreview)}
                      className={`p-2 rounded-lg transition ${
                        isPreview
                          ? "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400"
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                      title={isPreview ? "Edit mode" : "Preview mode"}
                    >
                      {isPreview ? (
                        <Edit3 className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      title={
                        isFullscreen ? "Exit fullscreen" : "Fullscreen writing"
                      }
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div
                className={`transition-all duration-300 ${
                  isFullscreen
                    ? "fixed inset-0 z-50 bg-white dark:bg-slate-900 rounded-none"
                    : ""
                }`}
              >
                {isFullscreen && (
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div
                  className={`${
                    isFullscreen ? "h-full p-8 overflow-y-auto" : "p-6"
                  }`}
                >
                  {isPreview ? (
                    // Preview Mode - Full Article View
                    <div className="max-w-4xl mx-auto">
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h1 className="text-4xl font-bold mb-4">
                          {formState.title || "Your Article Title"}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8 not-prose">
                          <span>By {formState.authorName || "Your Name"}</span>
                          {formState.authorRole && (
                            <span>• {formState.authorRole}</span>
                          )}
                          <span>• {readTime}</span>
                          <span>• {wordCount} words</span>
                        </div>
                        <div
                          className="leading-relaxed text-base"
                          dangerouslySetInnerHTML={{
                            __html:
                              formState.content ||
                              "<p class='text-slate-400 dark:text-slate-500'>Your article content will appear here...</p>",
                          }}
                        />
                        {formState.tags && (
                          <div className="flex flex-wrap gap-2 mt-8 not-prose">
                            {formState.tags.split(",").map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm text-slate-700 dark:text-slate-300"
                              >
                                #{tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Edit Mode - Tiptap Editor
                    <div className="max-w-4xl mx-auto space-y-4">
                      {/* Title Input */}
                      <div>
                        <input
                          name="title"
                          value={formState.title}
                          onChange={handleFormChange}
                          className="w-full text-3xl font-bold bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-2 py-3"
                          placeholder="Write a compelling title..."
                        />
                      </div>

                      {/* Tiptap Editor */}
                      <TiptapEditor
                        content={formState.content}
                        onChange={(html) =>
                          setFormState((prev) => ({ ...prev, content: html }))
                        }
                        onImageUpload={handleImageUpload}
                        placeholder="Start writing your story...

Use the toolbar to format text, add links, and insert images. You can also:
• Create headings with H1/H2 buttons
• Add lists, quotes, and code blocks
• Insert images with the image button or drag & drop
• Undo/redo your changes

Your content will be saved as rich HTML."
                      />

                      {/* Writing Stats */}
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <span>
                          {wordCount} words • {characterCount} characters
                        </span>
                        <span>Estimated read time: {readTime}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Metadata Form - Collapsed when fullscreen */}
            {!isFullscreen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Publication Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      name="authorName"
                      value={formState.authorName}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Role / Grade
                    </label>
                    <input
                      name="authorRole"
                      value={formState.authorRole}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900"
                      placeholder="Grade 10, Science Club, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email (optional)
                    </label>
                    <input
                      name="authorEmail"
                      value={formState.authorEmail}
                      onChange={handleFormChange}
                      type="email"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900"
                      placeholder="We'll notify you about the decision"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formState.category}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tags (comma separated) *
                  </label>
                  <input
                    name="tags"
                    value={formState.tags}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900"
                    placeholder="learning, community, education"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Submit Section */}
            {!isFullscreen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                      Ready to submit?
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Your article will be reviewed by our admin team. Approved
                      submissions are published immediately.
                    </p>
                  </div>
                  <button
                    onClick={handleSubmitClick}
                    disabled={
                      formLoading ||
                      !formState.title.trim() ||
                      !formState.content.trim() ||
                      !formState.authorName.trim()
                    }
                    className="rounded-xl bg-slate-900 dark:bg-slate-100 px-6 py-3 text-sm font-semibold text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-slate-100/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 flex items-center gap-2"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit for Review
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-4 text-sm shadow-lg ${
            toast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-500 text-white"
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </>
  );
}
