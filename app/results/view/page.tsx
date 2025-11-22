"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getResultBySymbolNumber, getResults } from "@/lib/results/storage";
import { StudentResult } from "@/lib/results/types";
import { motion } from "framer-motion";
import { Printer, ArrowLeft, Download, Share2, AlertCircle } from "lucide-react";
import Link from "next/link";

function MarkSheetContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<StudentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const symbol = searchParams.get("symbol");
    const dob = searchParams.get("dob");
    const batch = searchParams.get("batch");
    const examType = searchParams.get("examType");

    if (symbol) {
      // Simulate loading delay
      setTimeout(() => {
        // Note: We need to update getResultBySymbolNumber to support batch/examType
        // For now, we'll filter the results manually or update the storage function
        // Let's assume we update the storage function or use getResults().find()
        
        // Temporary fix: Fetch all and find match (since getResultBySymbolNumber might need update)
        // Ideally, update storage.ts
        const allResults = getResults();
        const found = allResults.find(r => 
          r.symbolNumber === symbol && 
          (!batch || r.batch === batch) &&
          (!examType || r.examType === examType)
        );
        
        setResult(found || null);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Result Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            We couldn't find a result with that symbol number. Please check your details and try again.
          </p>
          <Link
            href="/results"
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link
            href="/results"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm shadow-blue-200 dark:shadow-none">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Mark Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl print:shadow-none print:rounded-none print:p-0"
        >
          {/* School Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
            <div className="w-20 h-20 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
              S
            </div>
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">
              Skyrider Academy
            </h1>
            <p className="text-slate-600 font-medium">
              Kathmandu, Nepal • Estd. 2024
            </p>
            <div className="mt-4 inline-block px-6 py-1 bg-slate-900 text-white text-sm font-bold uppercase tracking-widest rounded-full">
              Grade Sheet
            </div>
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8 text-sm">
            <div className="flex border-b border-slate-200 pb-1">
              <span className="font-bold w-32">Student Name:</span>
              <span className="uppercase">{result.studentName}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-1">
              <span className="font-bold w-32">Symbol No:</span>
              <span className="font-mono">{result.symbolNumber}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-1">
              <span className="font-bold w-32">Grade/Class:</span>
              <span>{result.grade}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-1">
              <span className="font-bold w-32">Batch:</span>
              <span>{result.batch}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-1">
              <span className="font-bold w-32">Date of Birth:</span>
              <span>{result.dob || "N/A"}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-1">
              <span className="font-bold w-32">Status:</span>
              <span
                className={`font-bold uppercase ${
                  result.status === "passed" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {result.status}
              </span>
            </div>
          </div>

          {/* Marks Table */}
          <div className="mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-y-2 border-slate-900">
                  <th className="py-3 px-4 text-left font-bold uppercase">Subject</th>
                  <th className="py-3 px-4 text-center font-bold uppercase w-24">Full Marks</th>
                  <th className="py-3 px-4 text-center font-bold uppercase w-24">Pass Marks</th>
                  <th className="py-3 px-4 text-center font-bold uppercase w-24">Obtained</th>
                  <th className="py-3 px-4 text-center font-bold uppercase w-20">Grade</th>
                  <th className="py-3 px-4 text-center font-bold uppercase w-20">GP</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects.map((subject, index) => (
                  <tr key={index} className="border-b border-slate-200">
                    <td className="py-3 px-4 font-medium">{subject.name}</td>
                    <td className="py-3 px-4 text-center text-slate-500">{subject.fullMarks}</td>
                    <td className="py-3 px-4 text-center text-slate-500">{subject.passMarks}</td>
                    <td className="py-3 px-4 text-center font-bold">{subject.score}</td>
                    <td className="py-3 px-4 text-center font-bold">{subject.grade}</td>
                    <td className="py-3 px-4 text-center">{subject.gradePoint.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t-2 border-slate-900 font-bold">
                  <td className="py-3 px-4 uppercase">Total</td>
                  <td className="py-3 px-4 text-center">{result.totalFullMarks}</td>
                  <td className="py-3 px-4 text-center">-</td>
                  <td className="py-3 px-4 text-center">{result.totalObtained}</td>
                  <td className="py-3 px-4 text-center" colSpan={2}>
                    GPA: {result.gpa}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer / Grading System */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-200">
            <div>
              <h4 className="font-bold text-xs uppercase mb-2 text-slate-500">Grading System</h4>
              <div className="grid grid-cols-2 gap-x-4 text-xs text-slate-600">
                <div>A+ : 90-100 (4.0)</div>
                <div>A : 80-89 (3.6)</div>
                <div>B+ : 70-79 (3.2)</div>
                <div>B : 60-69 (2.8)</div>
                <div>C+ : 50-59 (2.4)</div>
                <div>C : 40-49 (2.0)</div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end text-center space-y-8">
              <div className="w-32 border-b border-slate-400"></div>
              <span className="text-xs font-bold uppercase">Principal Signature</span>
            </div>
          </div>
          
          <div className="mt-8 text-center text-[10px] text-slate-400 print:hidden">
            This is a computer generated document. No signature required.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ResultViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <MarkSheetContent />
    </Suspense>
  );
}
