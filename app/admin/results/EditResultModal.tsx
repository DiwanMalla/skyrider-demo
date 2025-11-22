"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Calculator, AlertCircle } from "lucide-react";
import { StudentResult, Subject } from "@/lib/results/types";
import { calculateGrade, calculateGPA } from "@/lib/results/utils";

interface EditResultModalProps {
  result: StudentResult;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedResult: StudentResult) => void;
}

export default function EditResultModal({
  result,
  isOpen,
  onClose,
  onSave,
}: EditResultModalProps) {
  const [formData, setFormData] = useState<StudentResult>(result);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(result);
    setHasChanges(false);
  }, [result]);

  const handleSubjectChange = (index: number, score: number) => {
    const updatedSubjects = [...formData.subjects];
    const fullMarks = updatedSubjects[index].fullMarks;

    // Recalculate grade for this subject
    const { grade, point } = calculateGrade(score, fullMarks);

    updatedSubjects[index] = {
      ...updatedSubjects[index],
      score,
      grade,
      gradePoint: point,
    };

    // Recalculate totals
    const totalObtained = updatedSubjects.reduce(
      (sum, sub) => sum + sub.score,
      0
    );
    const gpa = calculateGPA(updatedSubjects);
    const hasFailed = updatedSubjects.some((sub) => sub.score < sub.passMarks);

    setFormData({
      ...formData,
      subjects: updatedSubjects,
      totalObtained,
      gpa,
      status: hasFailed ? "failed" : "passed",
    });
    setHasChanges(true);
  };

  const handleDetailsChange = (field: keyof StudentResult, value: string) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Edit Student Result
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Student Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) =>
                    handleDetailsChange("studentName", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Symbol Number
                </label>
                <input
                  type="text"
                  value={formData.symbolNumber}
                  onChange={(e) =>
                    handleDetailsChange("symbolNumber", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Subjects Table */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Subject Marks
              </h3>
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-center">Full Marks</th>
                      <th className="px-4 py-2 text-center">Obtained</th>
                      <th className="px-4 py-2 text-center">Grade</th>
                      <th className="px-4 py-2 text-center">Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {formData.subjects.map((subject, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30"
                      >
                        <td className="px-4 py-2 font-medium text-slate-700 dark:text-slate-300">
                          {subject.name}
                        </td>
                        <td className="px-4 py-2 text-center text-slate-500">
                          {subject.fullMarks}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max={subject.fullMarks}
                            value={subject.score}
                            onChange={(e) =>
                              handleSubjectChange(
                                index,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-20 px-2 py-1 text-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="px-4 py-2 text-center font-bold text-slate-600 dark:text-slate-400">
                          {subject.grade}
                        </td>
                        <td className="px-4 py-2 text-center text-slate-500">
                          {subject.gradePoint.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase">
                  Total Obtained
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {formData.totalObtained}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase">GPA</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formData.gpa}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase">Status</p>
                <p
                  className={`text-xl font-bold uppercase ${
                    formData.status === "passed"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {formData.status}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(formData)}
              disabled={!hasChanges}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-blue-200 dark:shadow-none"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
