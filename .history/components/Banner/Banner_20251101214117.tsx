"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Trophy,
  Microscope,
  Heart,
  Gamepad2,
} from "lucide-react";

export function Banner() {
  const features = [
    {
      icon: Users,
      label: "Skilled Instructors",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      label: "Online Classes",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Trophy,
      label: "Extra Curriculum",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Microscope,
      label: "Well Equiped Labs",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Heart,
      label: "Healthy Cafeteria",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Gamepad2,
      label: "Games & Sports",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400">
              Welcome to
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-300">
              Skyrider School
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Inspiration, Innovation and Discovery
          </motion.p>

          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Since the inception, it aims to be the capstone in the streams of
            Science and Management at +2 level and has been capable in attaining
            excellent results both at district and national levels.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/courses"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold rounded-full hover:from-emerald-500 hover:to-sky-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
            >
              Enroll Now
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 border-2 border-slate-400 text-slate-300 font-semibold rounded-full hover:border-white hover:text-white transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              className="group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.2 + index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.1, y: -5, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group-hover:border-white/20">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 mx-auto`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-sm font-semibold text-white text-center">
                  {feature.label}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          {[
            { number: "2000+", label: "Students" },
            { number: "50+", label: "Certified Tutors" },
            { number: "10+", label: "Years Experience" },
            { number: "100%", label: "Success Rate" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 2 + index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                whileHover={{ scale: 1.1, textShadow: "0 0 20px rgba(255,255,255,0.8)" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Banner;
