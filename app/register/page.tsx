"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Google Maps types
declare global {
  interface Window {
    google: typeof google;
  }
}
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
import Image from "next/image";

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
  {
    id: 5,
    title: "Preview",
    icon: CheckCircle2,
    description: "Review your information",
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
    country: "",
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
  const [validationError, setValidationError] = useState("");

  // Google Places refs
  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    // Prevent multiple initializations and check if Google Maps is available
    if (
      typeof window !== "undefined" &&
      window.google &&
      window.google.maps &&
      window.google.maps.places &&
      addressInputRef.current &&
      !autocompleteRef.current
    ) {
      try {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          {
            types: ["address"],
            componentRestrictions: { country: "np" }, // Restrict to Nepal
            fields: ["address_components", "formatted_address", "geometry"],
          }
        );

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (place && place.address_components) {
            const addressComponents = place.address_components;

            // Extract address components
            let streetNumber = "";
            let route = "";
            let city = "";
            let state = "";
            let zipCode = "";
            let country = "";

            addressComponents.forEach((component) => {
              const types = component.types;
              if (types.includes("street_number")) {
                streetNumber = component.long_name;
              }
              if (types.includes("route")) {
                route = component.long_name;
              }
              if (
                types.includes("locality") ||
                types.includes("administrative_area_level_3")
              ) {
                city = component.long_name;
              }
              if (types.includes("administrative_area_level_1")) {
                state = component.long_name;
              }
              if (types.includes("postal_code")) {
                zipCode = component.long_name;
              }
              if (types.includes("country")) {
                country = component.long_name;
              }
            });

            // Update form data
            setFormData((prev) => ({
              ...prev,
              address: `${streetNumber} ${route}`.trim(),
              city: city,
              state: state,
              zipCode: zipCode,
              country: country,
            }));
          }
        });
      } catch (error) {
        console.warn("Google Places Autocomplete failed to initialize:", error);
      }
    }

    return () => {
      if (
        autocompleteRef.current &&
        window.google?.maps?.event?.clearInstanceListeners
      ) {
        try {
          window.google.maps.event.clearInstanceListeners(
            autocompleteRef.current
          );
        } catch (error) {
          console.warn("Failed to clear Google Maps listeners:", error);
        }
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("");
    }
  };

  const nextStep = () => {
    // Validate required fields for current step before proceeding
    const isValid = validateCurrentStep();
    if (!isValid) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Personal Information
        if (
          !formData.firstName.trim() ||
          !formData.lastName.trim() ||
          !formData.dateOfBirth
        ) {
          setValidationError(
            "Please fill in all required fields before proceeding."
          );
          return false;
        }
        break;
      case 1: // Address Information
        if (
          !formData.address.trim() ||
          !formData.city.trim() ||
          !formData.state.trim() ||
          !formData.country.trim()
        ) {
          setValidationError(
            "Please fill in all required fields before proceeding."
          );
          return false;
        }
        break;
      case 2: // Academic
        if (!formData.program || !formData.educationLevel) {
          setValidationError(
            "Please fill in all required fields before proceeding."
          );
          return false;
        }
        break;
      case 3: // Guardian & Emergency
        if (
          !formData.guardianName.trim() ||
          !formData.guardianPhone.trim() ||
          !formData.guardianEmail.trim() ||
          !formData.emergencyContact.trim() ||
          !formData.emergencyPhone.trim()
        ) {
          setValidationError(
            "Please fill in all required fields before proceeding."
          );
          return false;
        }
        break;
      case 4: // Additional Info - no required fields
        break;
      case 5: // Preview - no validation needed, just review
        break;
    }
    setValidationError(""); // Clear error if validation passes
    return true;
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
          country: "",
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
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12 px-4 relative overflow-hidden">
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
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
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
                className="w-12 h-12 rounded-2xl  flex items-center justify-center shadow-lg"
              >
                <Image
                  src="/images/logo.png"
                  alt="Skyrider School Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
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
              initial={{ width: "0%" }}
              animate={{
                width: `${(currentStep / (steps.length - 1)) * 90}%`,
                left: "5%",
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
            {/* Animated Validation Error */}
            <AnimatePresence>
              {validationError && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 overflow-hidden"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <p className="text-red-700 font-medium">
                      {validationError}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

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
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="First Name"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Last Name"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">
                      Address Information
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={addressInputRef}
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Street Address"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="City"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Province <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        placeholder="Province"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="ZIP Code"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        placeholder="Country"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">
                      Academic
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Program <span className="text-red-500">*</span>
                      </label>
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
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Grade <span className="text-red-500">*</span>
                      </label>
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
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Previous School
                      </label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleChange}
                        placeholder="Previous School"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">
                      Guardian & Emergency
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Guardian Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        required
                        placeholder="Guardian Name"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Guardian Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={handleChange}
                        required
                        placeholder="Guardian Phone"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Guardian Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="guardianEmail"
                        value={formData.guardianEmail}
                        onChange={handleChange}
                        required
                        placeholder="Guardian Email"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Emergency Contact Name{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        required
                        placeholder="Emergency Contact Name"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 outline-none text-slate-800 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Emergency Phone <span className="text-red-500">*</span>
                      </label>
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

                {currentStep === 5 && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold mb-6 text-slate-800">
                      Review Your Application
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Please review all the information below before submitting your application.
                    </p>

                    {/* Personal Information */}
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-600" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-slate-600">First Name:</span>
                          <p className="text-slate-800 mt-1">{formData.firstName || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">Last Name:</span>
                          <p className="text-slate-800 mt-1">{formData.lastName || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">Email:</span>
                          <p className="text-slate-800 mt-1">{formData.email || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">Phone:</span>
                          <p className="text-slate-800 mt-1">{formData.phone || "Not provided"}</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm font-medium text-slate-600">Date of Birth:</span>
                          <p className="text-slate-800 mt-1">{formData.dateOfBirth || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                        <Home className="w-5 h-5 text-emerald-600" />
                        Address Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-slate-600">Street Address:</span>
                          <p className="text-slate-800 mt-1">{formData.address || "Not provided"}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-sm font-medium text-slate-600">City:</span>
                            <p className="text-slate-800 mt-1">{formData.city || "Not provided"}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-600">Province:</span>
                            <p className="text-slate-800 mt-1">{formData.state || "Not provided"}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-600">ZIP Code:</span>
                            <p className="text-slate-800 mt-1">{formData.zipCode || "Not provided"}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">Country:</span>
                          <p className="text-slate-800 mt-1">{formData.country || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                        Academic Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-slate-600">Program:</span>
                          <p className="text-slate-800 mt-1 capitalize">{formData.program || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">Grade:</span>
                          <p className="text-slate-800 mt-1">{formData.educationLevel ? formData.educationLevel.replace('grade', 'Grade ') : "Not provided"}</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm font-medium text-slate-600">Previous School:</span>
                          <p className="text-slate-800 mt-1">{formData.previousSchool || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Guardian & Emergency Information */}
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        Guardian & Emergency Contacts
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-slate-600">Guardian Name:</span>
                            <p className="text-slate-800 mt-1">{formData.guardianName || "Not provided"}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-600">Guardian Phone:</span>
                            <p className="text-slate-800 mt-1">{formData.guardianPhone || "Not provided"}</p>
                          </div>
                          <div className="md:col-span-2">
                            <span className="text-sm font-medium text-slate-600">Guardian Email:</span>
                            <p className="text-slate-800 mt-1">{formData.guardianEmail || "Not provided"}</p>
                          </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-medium text-slate-600">Emergency Contact Name:</span>
                              <p className="text-slate-800 mt-1">{formData.emergencyContact || "Not provided"}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-slate-600">Emergency Phone:</span>
                              <p className="text-slate-800 mt-1">{formData.emergencyPhone || "Not provided"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-emerald-600" />
                        Additional Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-slate-600">Medical Conditions/Allergies:</span>
                          <p className="text-slate-800 mt-1">{formData.medicalConditions || "None specified"}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">How did you hear about us:</span>
                          <p className="text-slate-800 mt-1 capitalize">{formData.hearAboutUs || "Not specified"}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">Additional Comments:</span>
                          <p className="text-slate-800 mt-1">{formData.additionalInfo || "None"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                          <p className="text-amber-800 font-medium">Please review carefully</p>
                          <p className="text-amber-700 text-sm mt-1">
                            Make sure all information is correct before submitting. You can go back to edit any section if needed.
                          </p>
                        </div>
                      </div>
                    </div>
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
                  className="px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronLeft /> Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-sky-600 text-white flex items-center justify-center gap-2 cursor-pointer"
                >
                  Next <ChevronRight />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="flex-1 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-sky-600 text-white font-semibold cursor-pointer"
                >
                  {submitStatus === "loading" ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
