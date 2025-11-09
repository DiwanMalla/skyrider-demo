"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  Phone,
  Calendar,
  FileText,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
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
  program: string;
  educationLevel: string;
  previousSchool: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
  hearAboutUs: string;
  additionalInfo: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Simple password authentication (replace with proper auth in production)
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, use environment variable and proper auth
    if (password === "admin123") {
      setIsAuthenticated(true);
      fetchApplications();
    } else {
      setError("Invalid password");
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/application", {
        headers: {
          Authorization: `Bearer ${
            process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN || "your-secret-token"
          }`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications);
      } else {
        setError("Failed to fetch applications");
      }
    } catch (err) {
      setError("Error loading applications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.program.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === "all" || app.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "reviewed":
        return <Eye className="w-5 h-5 text-sky-600" />;
      default:
        return <Clock className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "reviewed":
        return "bg-sky-100 text-sky-700 border-sky-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-emerald-600 to-sky-600 mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Access
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Enter password to view applications
            </p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-linear-to-r from-emerald-600 to-sky-600 text-white font-semibold hover:from-emerald-700 hover:to-sky-700 transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Application Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            View and manage student applications
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 dark:text-slate-400">Total</span>
              <Users className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {applications.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 dark:text-slate-400">
                Pending
              </span>
              <Clock className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {applications.filter((app) => app.status === "pending").length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 dark:text-slate-400">
                Reviewed
              </span>
              <Eye className="w-5 h-5 text-sky-500 dark:text-sky-400" />
            </div>
            <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">
              {applications.filter((app) => app.status === "reviewed").length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 dark:text-slate-400">
                Accepted
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {applications.filter((app) => app.status === "accepted").length}
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or program..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all outline-none"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Applications List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 dark:border-slate-600 border-t-emerald-600 dark:border-t-emerald-400"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-4">
              Loading applications...
            </p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-12 text-center">
            <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No applications found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your filters"
                : "Applications will appear here when submitted"}
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
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {app.firstName} {app.lastName}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {app.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {app.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {app.program}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Application Detail Modal */}
        {selectedApp && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Application Details
                </h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Name:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.firstName} {selectedApp.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Date of Birth:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.dateOfBirth}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Email:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Phone:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.phone}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        Address:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.address}, {selectedApp.city},{" "}
                        {selectedApp.state} {selectedApp.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Program:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.program}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Education Level:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.educationLevel}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        Previous School:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.previousSchool || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guardian Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Guardian Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Guardian Name:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.guardianName}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Guardian Phone:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.guardianPhone}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        Guardian Email:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.guardianEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Contact Name:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.emergencyContact}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Contact Phone:
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {selectedApp.emergencyPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {(selectedApp.medicalConditions ||
                  selectedApp.additionalInfo) && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Additional Information
                    </h3>
                    {selectedApp.medicalConditions && (
                      <div className="mb-4">
                        <span className="text-slate-600 dark:text-slate-400">
                          Medical Conditions:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedApp.medicalConditions}
                        </p>
                      </div>
                    )}
                    {selectedApp.additionalInfo && (
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">
                          Comments:
                        </span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedApp.additionalInfo}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Submission Info */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Application ID: {selectedApp.id}</span>
                    <span>
                      Submitted:{" "}
                      {new Date(selectedApp.submittedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
