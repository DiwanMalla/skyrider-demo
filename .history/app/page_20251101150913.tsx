"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Memory } from "@/components/Memory";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Banner from "@/components/Banner/Banner";
import Link from "next/link";
// Image import removed (banner uses dynamic images)
import {
  ArrowRight,
  BookOpen,
  Users,
  Zap,
  Award,
  Calendar,
  Globe,
} from "lucide-react";

// Theme slogans that rotate with banner
const SLOGANS = [
  {
    main: "EDUCATION BRINGS ABILITY",
    sub: "AND GIVES AMENITY",
  },
  {
    main: "A Different Wing with Life Skills",
    sub: "Begins with Yoga & Ends with Music",
  },
  {
    main: "A Right Choice for BIG DREAM",
    sub: "Excellence in Every Step",
  },
  {
    main: "Inspiration, Innovation and Discovery",
    sub: "Nurturing Tomorrow's Leaders Today",
  },
];

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentSlogan, setCurrentSlogan] = useState(0);

  // GSAP timeline for page load animations
  useEffect(() => {
    const timeline = gsap.timeline();

    if (titleRef.current) {
      timeline.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    if (subtitleRef.current) {
      timeline.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }

    if (ctaRef.current) {
      timeline.from(
        ctaRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }
  }, []);

  // Handle slide change from Banner component
  const handleSlideChange = (index: number) => {
    setCurrentSlogan(index % SLOGANS.length);
  };

  const features = [
    {
      id: 1,
      icon: Zap,
      title: "Modern Learning",
      description:
        "State-of-the-art facilities and interactive learning methods",
    },
    {
      id: 2,
      icon: Users,
      title: "Expert Faculty",
      description: "Highly qualified teachers dedicated to student success",
    },
    {
      id: 3,
      icon: BookOpen,
      title: "Rich Curriculum",
      description: "Comprehensive programs for holistic development",
    },
    {
      id: 4,
      icon: Award,
      title: "Excellence",
      description: "Award-winning academic and extracurricular programs",
    },
    {
      id: 5,
      icon: Calendar,
      title: "Events & Activities",
      description: "Year-round cultural, sports, and community events",
    },
    {
      id: 6,
      icon: Globe,
      title: "Global Perspective",
      description: "Preparing students for an interconnected world",
    },
  ];

  const memories = [
    {
      id: "mem-1",
      title: "Academic Programs",
      subtitle: "Excellence in Education",
      content:
        "Comprehensive curriculum from grades 1-12 with science, arts, and commerce streams",
      accent: "emerald" as const,
    },
    {
      id: "mem-2",
      title: "Student Life",
      subtitle: "Beyond Academics",
      content:
        "Vibrant campus life with sports, clubs, cultural activities, and leadership opportunities",
      accent: "sky" as const,
    },
    {
      id: "mem-3",
      title: "Admissions",
      subtitle: "Join Our Community",
      content:
        "Now accepting applications for the new academic year - discover your potential with us",
      accent: "indigo" as const,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.4,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Main content */}
      <div className="relative">
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        {/* Full-width Hero Banner */}
        <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
          {/* Banner Component */}
          <div className="absolute inset-0 z-0">
            <Banner />
          </div>

          {/* Coordinated overlay gradient for text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/40 via-slate-900/25 to-slate-900/30" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                key={currentSlogan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <h1
                  ref={titleRef}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3"
                  style={{
                    textShadow:
                      "0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <span className="text-emerald-400 drop-shadow-lg">
                    {SLOGANS[currentSlogan].main}
                  </span>
                </h1>

                <p
                  ref={subtitleRef}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-8 max-w-4xl mx-auto font-semibold"
                  style={{
                    textShadow:
                      "0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {SLOGANS[currentSlogan].sub}
                </p>
              </motion.div>

              <motion.div
                ref={ctaRef}
                className="flex flex-wrap gap-3 sm:gap-4 justify-center"
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Discover More
                  <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-lg border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-semibold shadow-xl transition-all"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Why Choose Skyrider School?
              </h2>
              <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">
                A legacy of academic excellence combined with modern facilities
                and holistic development
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.id}
                    variants={itemVariants}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4 rounded-xl bg-emerald-50 w-fit mb-5 group-hover:bg-emerald-100 group-hover:scale-110 transition-all">
                      <Icon className="text-emerald-600" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { label: "Students", value: "1500+" },
                { label: "Faculty", value: "80+" },
                { label: "Years of Excellence", value: "25+" },
                { label: "Success Rate", value: "95%" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-emerald-100 font-medium text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Explore Our School
              </h2>
              <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">
                Discover the opportunities and experiences that await you at
                Skyrider
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {memories.map((memory) => (
                <Memory
                  key={memory.id}
                  id={memory.id}
                  title={memory.title}
                  subtitle={memory.subtitle}
                  content={memory.content}
                  accent={memory.accent}
                  size="md"
                  onClick={() => console.log(`Clicked: ${memory.id}`)}
                  removable={false}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
                Join our community of learners and discover your potential.
                Admissions are now open for the upcoming academic year.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Apply Now
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/visit"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-slate-300 text-slate-900 bg-white hover:bg-slate-50 font-semibold shadow-lg transition-all"
                >
                  Schedule a Visit
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
