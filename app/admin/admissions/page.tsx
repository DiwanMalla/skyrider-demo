"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  MapPin,
  User,
  BookOpen,
  Users,
  AlertCircle,
  Heart,
} from "lucide-react";

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  program: string;
  educationLevel: string;
  previousSchool: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  hearAboutUs: string;
  additionalInfo: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
}

export default function AdmissionsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "accepted" | "rejected"
  >("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/application", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
        },
      });
      const data = await response.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    status: "accepted" | "rejected"
  ) => {
    setActionLoading(true);
    try {
      const response = await fetch("/api/application/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status } : app))
        );
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      `${app.firstName} ${app.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Admission Applications
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Review and manage student admission applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total",
              value: stats.total,
              color: "slate",
              isTotal: true,
            },
            { label: "Pending", value: stats.pending, color: "amber" },
            { label: "Accepted", value: stats.accepted, color: "emerald" },
            { label: "Rejected", value: stats.rejected, color: "red" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl p-4 shadow-sm border ${
                stat.isTotal
                  ? "bg-linear-to-br from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-900 text-white border-slate-800 dark:border-slate-700"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}
            >
              <p
                className={`text-sm mb-1 ${
                  stat.isTotal
                    ? "text-slate-300 dark:text-slate-400"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {stat.label}
              </p>
              <p
                className={`text-2xl font-bold ${
                  stat.isTotal
                    ? "text-white"
                    : `text-${stat.color}-600 dark:text-${stat.color}-400`
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "pending", "accepted", "rejected"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                      filterStatus === status
                        ? "bg-emerald-600 dark:bg-emerald-500 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-emerald-600 dark:border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 dark:text-slate-400 mt-4">
              Loading applications...
            </p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-700">
            <AlertCircle className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No applications found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-600 to-sky-600 flex items-center justify-center text-white font-bold text-lg">
                        {app.firstName[0]}
                        {app.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {app.firstName} {app.lastName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {app.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {app.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          Program:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white capitalize">
                          {app.program}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          Grade:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {app.educationLevel.replace("grade", "Grade ")}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          Location:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {app.city}, {app.state}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          Submitted:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : app.status === "accepted"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Application Details
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedApplication.firstName}{" "}
                    {selectedApplication.lastName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                >
                  <XCircle className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-600 pb-2">
                    <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        First Name:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApplication.firstName}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Last Name:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApplication.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Email:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApplication.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Phone:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApplication.phone}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Date of Birth:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApplication.dateOfBirth}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-600 pb-2">
                    <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    Home Address
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {selectedApplication.address}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      {selectedApplication.city}, {selectedApplication.state}{" "}
                      {selectedApplication.zipCode}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      {selectedApplication.country}
                    </p>
                  </div>
                </div>

                {/* Academic */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-600 pb-2">
                    <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    Academic Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Program:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white capitalize">
                        {selectedApplication.program}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Grade:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApplication.educationLevel.replace(
                          "grade",
                          "Grade "
                        )}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        Previous School:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApplication.previousSchool || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guardian & Emergency */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-600 pb-2">
                    <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    Guardian Information & Emergency Contact
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">
                          Guardian Name:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedApplication.guardianName}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">
                          Guardian Phone:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedApplication.guardianPhone}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-slate-600 dark:text-slate-400">
                          Guardian Email:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedApplication.guardianEmail}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">
                            Emergency Contact (Alternate):
                          </span>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {selectedApplication.emergencyContact}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">
                            Emergency Phone (Alternate):
                          </span>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {selectedApplication.emergencyPhone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {(selectedApplication.medicalConditions ||
                  selectedApplication.hearAboutUs ||
                  selectedApplication.additionalInfo) && (
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-600 pb-2">
                      <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      Additional Details & Notes
                    </h3>
                    <div className="space-y-3 text-sm">
                      {selectedApplication.medicalConditions && (
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">
                            Medical Conditions/Allergies:
                          </span>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {selectedApplication.medicalConditions}
                          </p>
                        </div>
                      )}
                      {selectedApplication.hearAboutUs && (
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">
                            How they heard about us:
                          </span>
                          <p className="font-medium text-slate-900 dark:text-white capitalize">
                            {selectedApplication.hearAboutUs}
                          </p>
                        </div>
                      )}
                      {selectedApplication.additionalInfo && (
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">
                            Additional Comments:
                          </span>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {selectedApplication.additionalInfo}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedApplication.status === "pending" && (
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedApplication.id, "accepted")
                      }
                      disabled={actionLoading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {actionLoading ? "Processing..." : "Accept Application"}
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedApplication.id, "rejected")
                      }
                      disabled={actionLoading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      {actionLoading ? "Processing..." : "Reject Application"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
