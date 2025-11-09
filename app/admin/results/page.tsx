"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Trophy } from "lucide-react";

export default function ResultsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Result Publish
          </h1>
          <p className="text-slate-600">
            Manage and publish student examination results
          </p>
        </div>

        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
          <Trophy className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Coming Soon
          </h3>
          <p className="text-slate-600">
            Result publishing functionality will be available soon.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
