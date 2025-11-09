"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { BookOpen } from "lucide-react";

export default function BlogsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Blog Review
          </h1>
          <p className="text-slate-600">
            Review and manage blog post submissions
          </p>
        </div>

        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Coming Soon
          </h3>
          <p className="text-slate-600">
            Blog review functionality will be available soon.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
