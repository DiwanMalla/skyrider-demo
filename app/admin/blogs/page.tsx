"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Hourglass,
  Loader2,
  Mail,
  Tag,
  User,
  X,
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import {
  loadSubmissions,
  updateSubmissionStatus,
  removeSubmission,
} from "@/lib/blog/actions";
import { BlogSubmission, SubmissionStatus } from "@/lib/blog/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const statusBadges: Record<SubmissionStatus, string> = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  accepted:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
};

const statusLabels: Record<SubmissionStatus, string> = {
  pending: "In Review",
  accepted: "Published",
  rejected: "Returned",
};

type FilterValue = SubmissionStatus | "all";

export default function BlogsPage() {
  const [submissions, setSubmissions] = useState<BlogSubmission[]>([]);
  const [filter, setFilter] = useState<FilterValue>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<BlogSubmission | null>(null);
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const data = await loadSubmissions();
    setSubmissions(data);
  };

  const handleStatusChange = async (id: string, status: "published" | "draft" | "archived") => {
    await updateSubmissionStatus(id, status);
    fetchSubmissions();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await removeSubmission(id);
      fetchSubmissions();
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const stats = useMemo(() => {
    const pending = submissions.filter(
      (submission) => submission.status === "pending"
    ).length;
    const accepted = submissions.filter(
      (submission) => submission.status === "accepted"
    ).length;
    const rejected = submissions.filter(
      (submission) => submission.status === "rejected"
    ).length;
    return {
      total: submissions.length,
      pending,
      accepted,
      rejected,
    };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    let result = submissions;

    // Status Filter
    if (filter !== "all") {
      result = result.filter((submission) => submission.status === filter);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (submission) =>
          submission.title.toLowerCase().includes(query) ||
          submission.authorName.toLowerCase().includes(query) ||
          submission.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [filter, submissions, searchQuery]);

  const handleStatusChange = (id: string, status: SubmissionStatus) => {
    setUpdatingKey(`${id}-${status}`);
    updateSubmissionStatus(id, status);
    setSubmissions(sortSubmissions(loadSubmissions()));

    const actionText =
      status === "accepted"
        ? "published"
        : status === "rejected"
        ? "returned for revision"
        : "moved to pending";

    setToast({
      type: "success",
      message: `Submission ${actionText} successfully.`,
    });
    setUpdatingKey(null);

    if (selectedSubmission?.id === id) {
      setSelectedSubmission((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-2rem)] flex-col gap-6 overflow-hidden">
        {/* Header & Stats */}
        <div className="flex-none space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Content Management
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Review and manage student blog submissions.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-none hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                <FileText className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Pending Review",
                value: stats.pending,
                icon: Hourglass,
                color: "text-amber-500",
                bg: "bg-amber-50 dark:bg-amber-500/10",
              },
              {
                label: "Published",
                value: stats.accepted,
                icon: CheckCircle2,
                color: "text-emerald-500",
                bg: "bg-emerald-50 dark:bg-emerald-500/10",
              },
              {
                label: "Returned",
                value: stats.rejected,
                icon: AlertCircle,
                color: "text-rose-500",
                bg: "bg-rose-50 dark:bg-rose-500/10",
              },
              {
                label: "Total Stories",
                value: stats.total,
                icon: FileText,
                color: "text-blue-500",
                bg: "bg-blue-50 dark:bg-blue-500/10",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white pl-1">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area - Split View */}
        <div className="flex flex-1 gap-6 overflow-hidden min-h-0">
          {/* List Column */}
          <div
            className={`flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all duration-300 ${
              selectedSubmission
                ? "w-[400px] hidden lg:flex shrink-0"
                : "w-full lg:w-[400px] shrink-0"
            }`}
          >
            {/* List Header */}
            <div className="flex flex-col gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                {["all", "pending", "accepted", "rejected"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t as FilterValue)}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      filter === t
                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    {t === "all"
                      ? "All"
                      : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {filteredSubmissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    No submissions found
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Try changing the filter or search query
                  </p>
                </div>
              ) : (
                filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`group cursor-pointer rounded-xl p-4 border transition-all hover:shadow-md ${
                      selectedSubmission?.id === submission.id
                        ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 ring-1 ring-blue-200 dark:ring-blue-800"
                        : "bg-white dark:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                          statusBadges[submission.status]
                        }`}
                      >
                        {statusLabels[submission.status]}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatDate(submission.submittedAt)}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      {submission.image && (
                        <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={submission.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                          {submission.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                          {submission.excerpt
                            .replace(/<[^>]*>/g, " ")
                            .replace(/\s+/g, " ")
                            .trim()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <User className="w-3 h-3" />
                      </div>
                      <span>{submission.authorName}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Detail View */}
          <AnimatePresence mode="wait">
            {selectedSubmission ? (
              <motion.div
                key={selectedSubmission.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
              >
                {/* Detail Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="lg:hidden p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                        {selectedSubmission.title}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {selectedSubmission.authorName}
                        </span>
                        <span>•</span>
                        <span>{selectedSubmission.authorRole}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-sm">
                      <button
                        onClick={() =>
                          handleStatusChange(selectedSubmission.id, "accepted")
                        }
                        disabled={
                          updatingKey === `${selectedSubmission.id}-accepted` ||
                          selectedSubmission.status === "accepted"
                        }
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {updatingKey === `${selectedSubmission.id}-accepted` ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        Approve
                      </button>
                      <div className="w-px bg-slate-200 dark:bg-slate-700 my-1" />
                      <button
                        onClick={() =>
                          handleStatusChange(selectedSubmission.id, "rejected")
                        }
                        disabled={
                          updatingKey === `${selectedSubmission.id}-rejected` ||
                          selectedSubmission.status === "rejected"
                        }
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {updatingKey === `${selectedSubmission.id}-rejected` ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        Reject
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detail Content */}
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                        {selectedSubmission.category}
                      </span>
                      {selectedSubmission.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {selectedSubmission.image && (
                      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img
                          src={selectedSubmission.image}
                          alt={selectedSubmission.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    {/* Content Render */}
                    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-img:rounded-xl">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedSubmission.content,
                        }}
                      />
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Submission Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-500 dark:text-slate-400">
                            Submitted Date
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {formatDate(selectedSubmission.submittedAt)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-500 dark:text-slate-400">
                            Author Email
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {selectedSubmission.authorEmail || "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-500 dark:text-slate-400">
                            Read Time
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {selectedSubmission.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="hidden lg:flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Select a submission
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-2">
                    Choose a blog post from the list to review, edit, or
                    publish.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg ${
                toast.type === "success" ? "bg-emerald-600" : "bg-rose-500"
              }`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
