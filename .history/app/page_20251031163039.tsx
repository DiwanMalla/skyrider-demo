"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Memory } from "@/components/Memory";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP timeline for page load animations
  useEffect(() => {
    const timeline = gsap.timeline();

    if (titleRef.current) {
      timeline.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (subtitleRef.current) {
      timeline.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    if (ctaRef.current) {
      timeline.from(
        ctaRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  }, []);

  const features = [
    {
      id: 1,
      icon: Zap,
      title: "Modern Learning Platform",
      description:
        "Interactive tools and resources for enhanced learning experience",
    },
    {
      id: 2,
      icon: Users,
      title: "Community Engagement",
      description: "Connect with teachers, students, and parents seamlessly",
    },
    {
      id: 3,
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Supporting education quality and student achievement",
    },
  ];

  const memories = [
    {
      id: "mem-1",
      title: "Welcome to Skyrider",
      subtitle: "Your School, Online",
      content: "Experience modern education with our interactive platform",
      accent: "emerald" as const,
    },
    {
      id: "mem-2",
      title: "Announcements",
      subtitle: "Latest Updates",
      content: "Stay informed with school news and important notices",
      accent: "sky" as const,
    },
    {
      id: "mem-3",
      title: "Events & Activities",
      subtitle: "School Life",
      content: "Explore upcoming events and extracurricular activities",
      accent: "indigo" as const,
    },
  ];

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navbar />

        {/* Hero section */}
        <section className="pt-24 pb-12 px-4 md:pt-32 md:pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 lg:col-span-6">
              <motion.h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
              >
                Skyrider High School
              </motion.h1>

              <motion.p
                ref={subtitleRef}
                className="text-lg text-slate-600 mb-6 max-w-2xl"
              >
                Empowering minds and shaping futures — a modern high school
                experience focused on learning, community, and growth.
              </motion.p>

              <motion.div ref={ctaRef} className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-slate-200 text-slate-900 bg-white hover:bg-slate-50"
                >
                  Contact us
                </Link>
              </motion.div>
            </div>

            <div className="md:col-span-5 lg:col-span-6">
              {/* Hero image from public/cover.png */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/cover.png"
                  alt="Skyrider hero"
                  className="w-full h-auto object-cover"
                  width={1200}
                  height={800}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 px-6 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Features
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Everything you need to stay updated with your academic progress
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                    className="p-6 rounded-xl bg-white border-2 border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer"
                  >
                    <div className="p-3 rounded-lg bg-emerald-50 w-fit mb-4 group-hover:bg-emerald-100 transition-colors">
                      <Icon className="text-emerald-600" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Memory Cards section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Highlights
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Experience what makes Skyrider special
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
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

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
