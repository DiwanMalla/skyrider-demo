"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  GraduationCap,
  Users,
  Utensils,
  Trophy,
  Dumbbell,
  FlaskConical,
  Award,
  BookCheck,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-sky-50 to-indigo-50 dark:from-emerald-950/30 dark:via-sky-950/30 dark:to-indigo-950/30 opacity-50 transition-colors duration-300" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-200/30 dark:bg-sky-500/10 rounded-full blur-3xl transition-colors duration-300" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold mb-6 transition-colors duration-300">
              <GraduationCap size={20} />
              <span>About Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-sky-600 to-indigo-600 dark:from-emerald-400 dark:via-sky-400 dark:to-indigo-400">
              Welcome to SKYRIDER
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed transition-colors duration-300">
              Since the inception, it aims to be the capstone in the streams of
              Science and Management at +2 level and has been capable in
              attaining excellent results both at district and national levels
              by holding top ranks with other remarkable positions, also
              spreading its fumes abroad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white transition-colors duration-300">
                Our Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 transition-colors duration-300">
                Sky Rider is the need of time and we are keen to transform the
                career of adolescent learners in order to make them able to cope
                with the demand of modern global standard.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed transition-colors duration-300">
                It trains students to be practical, cumulative and behavioral
                and thus making them self-responsive, determinant and
                obligatory.
              </p>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-slate-200 dark:ring-slate-800 transition-all duration-300">
              <Image
                src="/images/grp-1.jpg"
                alt="Skyrider School"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 to-white dark:from-slate-900/30 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
              Our Facilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors duration-300">
              We provide world-class facilities to ensure holistic development
              of our students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20"
              >
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-500 to-sky-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
              Expert Instructors
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors duration-300">
              Meet our dedicated team of educational leaders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300 ring-4 ring-slate-200 dark:ring-slate-800 group-hover:ring-emerald-500 dark:group-hover:ring-emerald-500">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-300">
                  {instructor.name}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium transition-colors duration-300">
                  {instructor.position}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
