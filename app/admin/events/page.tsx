"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Calendar } from "lucide-react";

export default function EventsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Event Publish
          </h1>
          <p className="text-slate-600">
            Create and manage school events and announcements
          </p>
        </div>

        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
          <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Coming Soon
          </h3>
          <p className="text-slate-600">
            Event publishing functionality will be available soon.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
