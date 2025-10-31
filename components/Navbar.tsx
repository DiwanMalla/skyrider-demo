"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Skyrider logo"
                width={44}
                height={44}
                className="rounded"
              />
              <span className="hidden sm:inline-block font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-sky-600">
                Skyrider
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-700 hover:text-slate-900">
              Home
            </Link>
            <Link href="/about" className="text-slate-700 hover:text-slate-900">
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-700 hover:text-slate-900"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link
                href="/about"
                className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
              >
                Learn more
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md text-slate-700"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link href="/" className="block text-slate-700 py-2">
              Home
            </Link>
            <Link href="/about" className="block text-slate-700 py-2">
              About
            </Link>
            <Link href="/contact" className="block text-slate-700 py-2">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
