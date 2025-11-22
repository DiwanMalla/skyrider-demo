"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getResultBySymbolNumber } from "@/lib/results/actions";
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
      const fetchResult = async () => {
        const found = await getResultBySymbolNumber(
          symbol, 
          dob || undefined,
          batch || undefined,
          examType || undefined
        );
        setResult(found);
        setLoading(false);
      };
      fetchResult();
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
          className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl print:shadow-none print:rounded-none print:p-0 relative overflow-hidden"
        >
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <div className="transform -rotate-45 text-9xl font-black uppercase">
              Skyrider
            </div>
          </div>

          {/* School Header */}
          <div className="relative z-10 text-center border-b-2 border-slate-900 pb-6 mb-8">
            <div className="w-24 h-24 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              S
            </div>
            <h1 className="text-4xl font-black uppercase tracking-wider mb-2 font-serif">
              Skyrider Academy
            </h1>
            <p className="text-slate-600 font-medium text-lg">
              Kathmandu, Nepal • Estd. 2024
            </p>
            <div className="mt-6 inline-block px-8 py-2 bg-slate-900 text-white text-sm font-bold uppercase tracking-[0.2em] rounded-full shadow-md">
              Grade Sheet
            </div>
          </div>

          {/* Exam Details */}
          <div className="relative z-10 text-center mb-8">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
              {result.examType} - {result.batch}
            </h2>
          </div>

          {/* Student Details */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 mb-8 text-sm bg-slate-50 p-6 rounded-xl border border-slate-200 print:bg-transparent print:border-none print:p-0">
            <div className="flex border-b border-slate-200 pb-2 print:border-slate-300">
              <span className="font-bold w-32 text-slate-500 print:text-slate-700">Student Name</span>
              <span className="uppercase font-semibold text-slate-900">{result.studentName}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-2 print:border-slate-300">
              <span className="font-bold w-32 text-slate-500 print:text-slate-700">Symbol No</span>
              <span className="font-mono font-semibold text-slate-900">{result.symbolNumber}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-2 print:border-slate-300">
              <span className="font-bold w-32 text-slate-500 print:text-slate-700">Grade/Class</span>
              <span className="font-semibold text-slate-900">{result.grade}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-2 print:border-slate-300">
              <span className="font-bold w-32 text-slate-500 print:text-slate-700">Date of Birth</span>
              <span className="font-semibold text-slate-900">{result.dob || "N/A"}</span>
            </div>
            <div className="flex border-b border-slate-200 pb-2 print:border-slate-300 sm:col-span-2">
              <span className="font-bold w-32 text-slate-500 print:text-slate-700">Result Status</span>
              <span
                className={`font-bold uppercase px-2 py-0.5 rounded text-xs tracking-wide ${
                  result.status === "passed" 
                    ? "bg-emerald-100 text-emerald-700 print:bg-transparent print:text-emerald-700" 
                    : "bg-rose-100 text-rose-700 print:bg-transparent print:text-rose-700"
                }`}
              >
                {result.status}
              </span>
            </div>
          </div>

          {/* Marks Table */}
          <div className="relative z-10 mb-8 overflow-hidden rounded-xl border border-slate-200 print:border-slate-900 print:rounded-none">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-900 print:bg-slate-100">
                  <th className="py-4 px-6 text-left font-bold uppercase text-slate-700">Subject</th>
                  <th className="py-4 px-4 text-center font-bold uppercase w-24 text-slate-700">Full Marks</th>
                  <th className="py-4 px-4 text-center font-bold uppercase w-24 text-slate-700">Pass Marks</th>
                  <th className="py-4 px-4 text-center font-bold uppercase w-24 text-slate-700">Obtained</th>
                  <th className="py-4 px-4 text-center font-bold uppercase w-20 text-slate-700">Grade</th>
                  <th className="py-4 px-4 text-center font-bold uppercase w-20 text-slate-700">GP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 print:divide-slate-300">
                {result.subjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-slate-50 print:hover:bg-transparent">
                    <td className="py-3 px-6 font-medium text-slate-800">{subject.name}</td>
                    <td className="py-3 px-4 text-center text-slate-500">{subject.fullMarks}</td>
                    <td className="py-3 px-4 text-center text-slate-500">{subject.passMarks}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900">{subject.score}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900">{subject.grade}</td>
                    <td className="py-3 px-4 text-center text-slate-700">{subject.gradePoint.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t-2 border-slate-900 font-bold print:bg-slate-50">
                  <td className="py-4 px-6 uppercase text-slate-800">Grand Total</td>
                  <td className="py-4 px-4 text-center text-slate-800">{result.totalFullMarks}</td>
                  <td className="py-4 px-4 text-center">-</td>
                  <td className="py-4 px-4 text-center text-slate-900">{result.totalObtained}</td>
                  <td className="py-4 px-4 text-center bg-slate-900 text-white print:bg-slate-200 print:text-slate-900" colSpan={2}>
                    GPA: {result.gpa}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer / Grading System */}
          <div className="relative z-10 grid grid-cols-2 gap-12 mt-12 pt-8 border-t border-slate-200">
            <div>
              <h4 className="font-bold text-xs uppercase mb-3 text-slate-500 tracking-wider">Grading System</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                <div className="flex justify-between"><span>A+ (90-100)</span> <span>4.0</span></div>
                <div className="flex justify-between"><span>A (80-89)</span> <span>3.6</span></div>
                <div className="flex justify-between"><span>B+ (70-79)</span> <span>3.2</span></div>
                <div className="flex justify-between"><span>B (60-69)</span> <span>2.8</span></div>
                <div className="flex justify-between"><span>C+ (50-59)</span> <span>2.4</span></div>
                <div className="flex justify-between"><span>C (40-49)</span> <span>2.0</span></div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end text-center space-y-8">
              <div className="w-48 border-b-2 border-slate-900 mb-2"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Principal Signature</span>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                {new Date().toLocaleDateString()}
              </div>
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
