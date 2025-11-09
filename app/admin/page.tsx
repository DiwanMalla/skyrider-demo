"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  BookOpen,
  Calendar,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Applications",
      value: "156",
      change: "+12%",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Pending Review",
      value: "24",
      change: "Review now",
      icon: Clock,
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Accepted",
      value: "98",
      change: "+8%",
      icon: CheckCircle,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Rejected",
      value: "34",
      change: "-2%",
      icon: XCircle,
      color: "from-red-500 to-red-600",
    },
  ];

  const recentActivity = [
    {
      type: "admission",
      title: "New admission form submitted",
      name: "John Doe",
      time: "5 minutes ago",
    },
    {
      type: "admission",
      title: "Application approved",
      name: "Jane Smith",
      time: "1 hour ago",
    },
    {
      type: "blog",
      title: "Blog post pending review",
      name: "Admin User",
      time: "2 hours ago",
    },
    {
      type: "event",
      title: "New event published",
      name: "Annual Sports Day",
      time: "5 hours ago",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-slate-600">
            Here&apos;s what&apos;s happening with your school today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-600">{stat.title}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Review Admissions", icon: FileText, href: "/admin/admissions", color: "emerald" },
            { title: "Publish Results", icon: TrendingUp, href: "/admin/results", color: "blue" },
            { title: "Review Blogs", icon: BookOpen, href: "/admin/blogs", color: "purple" },
            { title: "Create Event", icon: Calendar, href: "/admin/events", color: "orange" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={action.title}
                href={action.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group`}
              >
                <Icon className={`w-8 h-8 text-${action.color}-600 mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="font-semibold text-slate-900">{action.title}</h3>
                <p className="text-sm text-slate-500 mt-1">Click to manage</p>
              </motion.a>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Activity
            </h2>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{activity.title}</p>
                  <p className="text-sm text-slate-600">{activity.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
