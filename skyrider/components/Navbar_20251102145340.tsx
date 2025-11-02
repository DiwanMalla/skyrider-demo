"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  Info,
  Phone,
  Search,
  ChevronDown,
  Calendar,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key for search dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/tutors", label: "Tutors", icon: Users },
    {
      label: "Resources",
      icon: Calendar,
      dropdown: true,
      items: [
        { href: "/events", label: "Events", icon: Calendar },
        { href: "/blog", label: "Blog", icon: FileText },
      ],
    },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
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
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative"
                >
                  <Image
                    src="/images/logo.png"
                    alt="Skyrider School Logo"
                    width={48}
                    height={48}
                    className="h-12 w-auto object-contain"
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
            <motion.nav
              className="hidden md:flex items-center gap-1"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {navItems.map((link) => (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="relative"
                >
                  {link.dropdown ? (
                    <div className="relative dropdown-container">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="relative px-4 py-2 rounded-lg text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 group flex items-center gap-2"
                      >
                        <link.icon size={16} />
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                        <motion.div
                          className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
                          whileHover={{ width: "80%", x: "-40%" }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200/50 backdrop-blur-sm overflow-hidden z-50 dropdown-container"
                          >
                            {link.items?.map((item, index) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={() => setDropdownOpen(false)}
                                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 group"
                                >
                                  <item.icon size={16} className="text-slate-500 group-hover:text-emerald-500" />
                                  {item.label}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href!}
                      className="relative px-4 py-2 rounded-lg text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 group flex items-center gap-2"
                    >
                      <link.icon size={16} />
                      {link.label}
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
                        whileHover={{ width: "80%", x: "-40%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            {/* Search */}
            <motion.div
              className="hidden md:flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100/50 transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </motion.div>

            {/* Desktop CTA and Mobile Menu Button */}
            <div className="flex items-center gap-3">
              <motion.div
                className="hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/courses"
                  className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-sky-600 text-white text-sm font-semibold hover:from-emerald-500 hover:to-sky-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 overflow-hidden group"
                >
                  <span className="relative z-10">Enroll Now</span>
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
                {/* Search */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="pb-4"
                >
                  <button
                    onClick={() => {
                      setSearchOpen(true);
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all duration-200 w-full text-left"
                  >
                    <Search size={16} />
                    Search
                  </button>
                </motion.div>

                {navItems.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {link.dropdown ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 font-medium">
                          <link.icon size={16} />
                          {link.label}
                        </div>
                        {link.items?.map((item, subIndex) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + subIndex + 1) * 0.1 + 0.2 }}
                          >
                            <Link
                              href={item.href!}
                              onClick={handleLinkClick}
                              className="flex items-center gap-3 px-8 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all duration-200 ml-4"
                            >
                              <item.icon size={14} />
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={link.href!}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all duration-200"
                      >
                        <link.icon size={16} />
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 border-t border-slate-200/50"
                >
                  <Link
                    href="/courses"
                    onClick={handleLinkClick}
                    className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-sky-600 text-white text-center font-semibold hover:from-emerald-500 hover:to-sky-500 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                  >
                    Enroll Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Dialog */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-96 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:outline-none"
                    autoFocus
                  />
                </div>
                {searchQuery && (
                  <div className="mt-4 max-h-60 overflow-y-auto">
                    {navItems
                      .flatMap((item) =>
                        item.dropdown
                          ? [item, ...(item.items || [])]
                          : [item]
                      )
                      .filter((item) =>
                        item.label
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <Link
                          key={item.href || item.label}
                          href={item.href!}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <item.icon size={16} />
                          {item.label}
                        </Link>
                      ))}
                    {navItems
                      .flatMap((item) =>
                        item.dropdown
                          ? [item, ...(item.items || [])]
                          : [item]
                      )
                      .filter((item) =>
                        item.label
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      ).length === 0 && (
                      <p className="text-slate-500 text-center py-4">
                        No results found
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
