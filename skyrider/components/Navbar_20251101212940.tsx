"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Home, BookOpen, Users, Info, Phone, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-lg shadow-slate-900/5"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-200/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/logo.png"
                  alt="Skyrider School logo"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-sm"
                />
              </motion.div>
              <motion.span
                className="font-bold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-sky-600 to-indigo-600 group-hover:from-emerald-500 group-hover:via-sky-500 group-hover:to-indigo-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Skyrider School
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={link.href}
                  className="relative px-4 py-2 rounded-lg text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 group"
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
                    whileHover={{ width: "80%", x: "-40%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA and Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/about"
                className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-sky-600 text-white text-sm font-semibold hover:from-emerald-500 hover:to-sky-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 overflow-hidden group"
              >
                <span className="relative z-10">Learn more</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              aria-label="Toggle menu"
              className="md:hidden relative p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100/50 transition-colors duration-200"
              onClick={() => setOpen((v) => !v)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/50 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-slate-200/50"
              >
                <Link
                  href="/about"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-sky-600 text-white text-center font-semibold hover:from-emerald-500 hover:to-sky-500 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
