"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Users,
  Utensils,
  Trophy,
  Dumbbell,
  FlaskConical,
  Award,
  BookCheck,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const features = [
    {
      icon: Users,
      title: "Skilled Instructors",
      description: "Expert faculty dedicated to student success",
    },
    {
      icon: GraduationCap,
      title: "Online Classes",
      description: "Flexible learning with digital resources",
    },
    {
      icon: Utensils,
      title: "Healthy Cafeteria",
      description: "Nutritious meals for growing minds",
    },
    {
      icon: Trophy,
      title: "Extra Curriculum Activities",
      description: "Holistic development through diverse programs",
    },
    {
      icon: Dumbbell,
      title: "Facilities of Games and Sports",
      description: "State-of-the-art sports infrastructure",
    },
    {
      icon: FlaskConical,
      title: "Well Equipped Labs",
      description: "Modern laboratories for practical learning",
    },
    {
      icon: Award,
      title: "Scholarship Schemes",
      description: "For deserving & needy students",
    },
    {
      icon: BookCheck,
      title: "Regular Exams & Feedback",
      description: "Continuous assessment with value-based classes",
    },
  ];

  const instructors = [
    {
      name: "Madan Puri",
      position: "Principal",
      image: "/images/pres.jpg",
    },
    {
      name: "Durga Puri",
      position: "Chairman",
      image: "/images/pres-2.jpg",
    },
    {
      name: "Rabin Ghimire",
      position: "Head Of IT department",
      image: "/images/teacher-1.jpg",
    },
    {
      name: "Keshab Raj Pathak",
      position: "Vice Principal",
      image: "/images/pres-3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-sky-50 to-indigo-50 opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold mb-6">
              <Phone size={20} />
              <span>Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-sky-600 to-indigo-600">
              Get in Touch
            </h1>
            <p className="text-slate-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              Have questions about our programs, admissions, or anything else?
              We&apos;d love to hear from you. Reach out to us and we&apos;ll
              get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Send us a Message
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Have questions? Send us a message and we&apos;ll get back to you
                soon.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Address</p>
                    <p className="text-slate-600">
                      Ratnagar-13, Chitwan, Nepal
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone</p>
                    <p className="text-slate-600">056562782</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <p className="text-slate-600">info@skyrider.edu.np</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors resize-none text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-lg bg-linear-to-r from-emerald-600 to-sky-600 text-white font-semibold hover:from-emerald-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
                {submitStatus === "success" && (
                  <p className="text-emerald-600 text-center font-medium">
                    Message sent successfully!
                  </p>
                )}
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-full min-h-[600px]"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.1234567890123!2d84.4286310754842!3d27.662987976195582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb5e9a0e7e99%3A0x9876543210fedcba!2sSkyrider%20Higher%20Secondary%20School!5e0!3m2!1sen!2snp!4v1699000000000!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Skyrider School Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
