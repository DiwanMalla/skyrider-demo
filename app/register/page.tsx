"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  FileText,
  GraduationCap,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Home,
  Shield,
  Heart,
} from "lucide-react";
import Link from "next/link";

// Step definitions
const steps = [
  {
    id: 0,
    title: "Personal",
    icon: User,
    description: "Your basic information",
  },
  {
    id: 1,
    title: "Address",
    icon: Home,
    description: "Where you live",
  },
  {
    id: 2,
    title: "Academic",
    icon: BookOpen,
    description: "Your education",
  },
  {
    id: 3,
    title: "Contacts",
    icon: Shield,
    description: "Guardian & emergency",
  },
  {
    id: 4,
    title: "Additional",
    icon: Heart,
    description: "Final details",
  },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    program: "",
    educationLevel: "",
    previousSchool: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalConditions: "",
    hearAboutUs: "",
    additionalInfo: "",
  });

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          program: "",
          educationLevel: "",
          previousSchool: "",
          guardianName: "",
          guardianPhone: "",
          guardianEmail: "",
          emergencyContact: "",
          emergencyPhone: "",
          medicalConditions: "",
          hearAboutUs: "",
          additionalInfo: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Failed to submit application. Please try again.");
      console.error("Error:", error);
    }
  };

  // Success screen
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12 px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <CheckCircle2 className="w-24 h-24 text-emerald-600" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-sky-600">
            Application Submitted!
          </h1>
          <p className="text-slate-600 text-lg mb-8">
            Thank you for applying to Skyrider School
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-sky-600 text-white font-semibold hover:scale-105 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: -5 }}
                className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-600 to-sky-600 flex items-center justify-center shadow-lg"
              >
                <GraduationCap className="w-7 h-7 text-white" />
              </motion.div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-sky-600 to-indigo-600">
                Skyrider School
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto relative z-10 px-4 pt-12 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-600 to-sky-600 flex items-center justify-center shadow-2xl shadow-emerald-500/25">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-indigo-600">
            Apply to Skyrider
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join our community of learners and embark on an educational journey
            that transforms lives
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
          <div className="relative flex justify-between mb-4">
            {/* Connecting Line Background */}
            <div
              className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200 -z-10"
              style={{ left: "5%", right: "5%" }}
            />

            {/* Animated Progress Line */}
            <motion.div
              className="absolute top-6 left-0 h-0.5 bg-linear-to-r from-emerald-500 to-sky-500 -z-10"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${(currentStep / (steps.length - 1)) * 90}%`,
                left: '5%'
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="flex flex-col items-center flex-1 relative"
              >
                <motion.div
                  animate={{
                    scale: currentStep === idx ? 1.1 : 1,
                    backgroundColor:
                      currentStep >= idx
                        ? "rgb(16 185 129)"
                        : "rgb(226 232 240)",
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white"
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                <span className="text-xs mt-2 hidden sm:block text-slate-700 font-medium">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">
                      Personal Information
                    </h2>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="First Name"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Last Name"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800"
                    />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">
                      Address
                    </h2>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Street Address"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="City"
                        className="px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        placeholder="State"
                        className="px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        placeholder="ZIP"
                        className="px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">
                      Academic
                    </h2>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800"
                    >
                      <option value="">Select Program</option>
                      <option value="elementary">Elementary</option>
                      <option value="middle">Middle School</option>
                      <option value="high">High School</option>
                    </select>
                    <select
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800"
                    >
                      <option value="">Select Grade</option>
                      {formData.program === "elementary" &&
                        [...Array(5)].map((_, i) => (
                          <option key={i} value={`grade${i + 1}`}>
                            Grade {i + 1}
                          </option>
                        ))}
                      {formData.program === "middle" &&
                        [...Array(5)].map((_, i) => (
                          <option key={i} value={`grade${i + 6}`}>
                            Grade {i + 6}
                          </option>
                        ))}
                      {formData.program === "high" &&
                        [...Array(2)].map((_, i) => (
                          <option key={i} value={`grade${i + 9}`}>
                            Grade {i + 11}
                          </option>
                        ))}
                      {!formData.program &&
                        [...Array(12)].map((_, i) => (
                          <option key={i} value={`grade${i + 1}`}>
                            Grade {i + 1}
                          </option>
                        ))}
                    </select>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      placeholder="Previous School"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">
                      Guardian & Emergency
                    </h2>
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      required
                      placeholder="Guardian Name"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <input
                      type="tel"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      required
                      placeholder="Guardian Phone"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <input
                      type="email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      required
                      placeholder="Guardian Email"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      required
                      placeholder="Emergency Contact Name"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      required
                      placeholder="Emergency Phone"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                    />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">
                      Additional Info
                    </h2>
                    <textarea
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Medical conditions or allergies"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500 resize-none"
                    />
                    <select
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800"
                    >
                      <option value="">How did you hear about us?</option>
                      <option value="search">Search Engine</option>
                      <option value="social">Social Media</option>
                      <option value="friend">Friend/Family</option>
                    </select>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Additional comments"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500 resize-none"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {submitStatus === "error" && (
              <div className="mt-6 bg-red-50 p-4 rounded-2xl text-red-700 border border-red-200">
                {errorMessage}
              </div>
            )}

            <div className="flex gap-4 mt-10">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft /> Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-sky-600 text-white flex items-center justify-center gap-2"
                >
                  Next <ChevronRight />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="flex-1 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-sky-600 text-white"
                >
                  {submitStatus === "loading" ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
