import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Award,
  Users,
  BookOpen,
  Heart,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* School Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-sky-500 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl">Skyrider High School</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Empowering young minds through innovative education, fostering
                academic excellence, creativity, and lifelong learning in a
                nurturing environment.
              </p>

              {/* Social Media Links */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/academic-programs"
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Academic Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admissions"
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Student Life */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">
                Student Life
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/student-life"
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Campus Life
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sports"
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    Sports & Activities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clubs"
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Clubs & Societies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Events & News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/alumni"
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Alumni Network
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">
                Get in Touch
              </h4>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div className="text-slate-400 text-sm">
                    <p>Ratnanagar-13 (Tandi)</p>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-slate-400 text-sm">+977-1-1234567</p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-slate-400 text-sm">info@skyrider.edu.np</p>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <p className="text-slate-400 text-sm mb-3">
                  Stay updated with our latest news
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                  <button className="px-4 py-2 bg-linear-to-r from-emerald-500 to-sky-500 rounded-lg text-white text-sm font-medium hover:from-emerald-600 hover:to-sky-600 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} Skyrider High School. All
                rights reserved.
              </div>

              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/accessibility"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
