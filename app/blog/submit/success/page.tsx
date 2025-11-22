"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Home } from "lucide-react";
import SuccessScene from "@/components/blog/SuccessScene";

export default function BlogSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/blog");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-emerald-500/50 backdrop-blur-sm">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 mb-4">
            Submission Received!
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Thank you for sharing your story with Skyrider. Your post is now pending review and will be published shortly.
          </p>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl mb-8"
        >
          <SuccessScene />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Redirecting to blog in {countdown} seconds...
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="px-8 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              Go to Blog Now
            </Link>
            <Link
              href="/"
              className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
