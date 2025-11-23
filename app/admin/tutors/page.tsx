"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Users, Lock } from "lucide-react";

export default function TutorsPage() {
  return (
    <AdminLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Blur overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-slate-200/50 dark:from-slate-700/50 dark:to-slate-800/50 backdrop-blur-sm" />
            
            {/* Content */}
            <div className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400"
              >
                Tutor Management
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 dark:text-slate-400 mb-8"
              >
                This feature is currently under development
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block"
              >
                <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg shadow-lg">
                  🚧 Not Available Now
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-sm text-slate-500 dark:text-slate-500"
              >
                We're working hard to bring you this feature soon. Stay tuned!
              </motion.p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
