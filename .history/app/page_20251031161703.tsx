"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Memory } from "@/components/Memory";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Users } from "lucide-react";

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
      title: 'Modern Learning Platform',
      description: 'Interactive tools and resources for enhanced learning experience',
    },
    {
      id: 2,
      icon: Users,
      title: 'Community Engagement',
      description: 'Connect with teachers, students, and parents seamlessly',
    },
    {
      id: 3,
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Supporting education quality and student achievement',
    },
  ]

  const memories = [
    {
      id: 'mem-1',
      title: 'Welcome to Skyrider',
      subtitle: 'Your School, Online',
      content: 'Experience modern education with our interactive platform',
      accent: 'emerald' as const,
    },
    {
      id: 'mem-2',
      title: 'Announcements',
      subtitle: 'Latest Updates',
      content: 'Stay informed with school news and important notices',
      accent: 'sky' as const,
    },
    {
      id: 'mem-3',
      title: 'Events & Activities',
      subtitle: 'School Life',
      content: 'Explore upcoming events and extracurricular activities',
      accent: 'indigo' as const,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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
        <nav className="fixed top-0 w-full backdrop-blur-sm bg-white/80 border-b border-slate-200/50 px-6 py-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Skyrider Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                Skyrider
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <Link
                href="/about"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6"
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                Skyrider High School
              </span>
            </motion.h1>

            <motion.p
              ref={subtitleRef}
              className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              Empowering minds, shaping futures. A modern high school dedicated to academic excellence and holistic development.
            </motion.p>

            <motion.div
              ref={ctaRef}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Link
                href="/results"
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2 group"
              >
                View Results
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border-2 border-slate-200 text-slate-900 rounded-lg font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
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
        <footer className="py-12 px-6 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Skyrider High School</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Modern education platform dedicated to academic excellence
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/results"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      Results
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-slate-400 text-sm">
                  Email: info@skyrider.edu.np
                </p>
                <p className="text-slate-400 text-sm">Phone: +977-1-XXXXXXX</p>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
              <p>&copy; 2025 Skyrider High School. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
