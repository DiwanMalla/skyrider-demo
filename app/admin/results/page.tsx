"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Search,
  Upload,
  Filter,
  MoreHorizontal,
  FileText,
  GraduationCap,
  Trophy,
  Users,
  Trash2,
  Edit,
  Eye,
  Folder,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import {
  getResults,
  deleteResult,
  updateResult,
  getExamFolders,
  publishExamResults,
} from "@/lib/results/actions";
import { StudentResult } from "@/lib/results/types";
import EditResultModal from "./EditResultModal";

interface ExamFolder {
  batch: string;
  examType: string;
}

export default function ResultsDashboard() {
  const [results, setResults] = useState<StudentResult[]>([]);
  const [folders, setFolders] = useState<ExamFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<ExamFolder | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("All");
  const [editingResult, setEditingResult] = useState<StudentResult | null>(
    null
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [fetchedResults, fetchedFolders] = await Promise.all([
      getResults(),
      getExamFolders(),
    ]);
    setResults(fetchedResults);
    setFolders(fetchedFolders);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this result?")) {
      await deleteResult(id);
      loadData();
    }
  };

  const handleSaveEdit = async (updatedResult: StudentResult) => {
    await updateResult(updatedResult.id, updatedResult);
    loadData();
    setEditingResult(null);
  };

  const handlePublishToggle = async (result: StudentResult) => {
    await updateResult(result.id, { ...result, published: !result.published });
    loadData();
  };

  const handlePublishFolder = async (folder: ExamFolder) => {
    if (
      confirm(
        `Are you sure you want to publish ALL results for ${folder.batch} - ${folder.examType}?`
      )
    ) {
      await publishExamResults(folder.batch, folder.examType, true);
      loadData();
    }
  };

  const filteredResults = results.filter((r) => {
    // Filter by current folder if selected
    if (currentFolder) {
      if (
        r.batch !== currentFolder.batch ||
        r.examType !== currentFolder.examType
      ) {
        return false;
      }
    }

    const matchesSearch =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.symbolNumber.includes(searchQuery);
    const matchesGrade = filterGrade === "All" || r.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const stats = {
    total: results.length,
    passed: results.filter((r) => r.status === "passed").length,
    avgGPA:
      results.length > 0
        ? (
            results.reduce((acc, r) => acc + parseFloat(r.gpa), 0) /
            results.length
          ).toFixed(2)
        : "0.00",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {currentFolder && (
                <button
                  onClick={() => setCurrentFolder(null)}
                  className="mr-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              Result Management
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
              <span>Results</span>
              {currentFolder && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-medium text-slate-900 dark:text-white">
                    {currentFolder.batch} - {currentFolder.examType}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {currentFolder && (
              <button
                onClick={() => handlePublishFolder(currentFolder)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition shadow-sm shadow-emerald-200 dark:shadow-none"
              >
                <Eye className="w-4 h-4" />
                Publish All
              </button>
            )}
            <Link
              href="/admin/results/upload"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm shadow-blue-200 dark:shadow-none"
            >
              <Upload className="w-4 h-4" />
              Upload Results
            </Link>
          </div>
        </div>

        {/* Folder View */}
        {!currentFolder && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.length === 0 ? (
              <div className="col-span-full p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
                <Folder className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No result folders found.</p>
                <Link
                  href="/admin/results/upload"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  Upload your first result
                </Link>
              </div>
            ) : (
              folders.map((folder, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFolder(folder)}
                  className="flex items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition group text-left"
                >
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg mr-4 group-hover:scale-110 transition">
                    <Folder className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {folder.examType}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Batch: {folder.batch}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePublishFolder(folder);
                      }}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition"
                      title="Publish All"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition" />
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {/* List View (Only when folder selected) */}
        {currentFolder && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {filteredResults.length}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Passed Students
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {
                      filteredResults.filter((r) => r.status === "passed")
                        .length
                    }
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Average GPA
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {filteredResults.length > 0
                      ? (
                          filteredResults.reduce(
                            (acc, r) => acc + parseFloat(r.gpa),
                            0
                          ) / filteredResults.length
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or symbol number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 [&>option]:text-slate-900 [&>option]:dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="All">All Grades</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Bachelor 1st Year">Bachelor 1st Year</option>
              </select>
            </div>

            {/* Results Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-3">Symbol No</th>
                      <th className="px-6 py-3">Student Name</th>
                      <th className="px-6 py-3">Grade</th>
                      <th className="px-6 py-3">GPA</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-slate-500"
                        >
                          No results found in this folder.
                        </td>
                      </tr>
                    ) : (
                      filteredResults.map((result) => (
                        <tr
                          key={result.id}
                          className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                        >
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                            {result.symbolNumber}
                          </td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                            {result.studentName}
                          </td>
                          <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                            {result.grade}
                          </td>
                          <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                            {result.gpa}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                result.status === "passed"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                                  : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                              }`}
                            >
                              {result.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handlePublishToggle(result)}
                                className={`p-2 rounded-lg transition ${
                                  result.published
                                    ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                                title={
                                  result.published ? "Unpublish" : "Publish"
                                }
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingResult(result)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(result.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingResult && (
          <EditResultModal
            result={editingResult}
            isOpen={!!editingResult}
            onClose={() => setEditingResult(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </AdminLayout>
  );
}
