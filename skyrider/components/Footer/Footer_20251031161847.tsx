'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const footerSections = [
    {
      title: 'Skyrider High School',
      content: 'Modern education platform dedicated to academic excellence and holistic student development.',
    },
    {
      title: 'Quick Links',
      links: quickLinks,
    },
    {
      title: 'Contact',
      contact: [
        { icon: Mail, text: 'info@skyrider.edu.np', href: 'mailto:info@skyrider.edu.np' },
        { icon: Phone, text: '+977-1-XXXXXXX', href: 'tel:+977-1-XXXXXXX' },
        { icon: MapPin, text: 'Kathmandu, Nepal', href: '#' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Footer Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-emerald-400">
              Skyrider High School
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Modern education platform dedicated to academic excellence and holistic student
              development.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-emerald-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-emerald-400 transition-colors text-sm sm:text-base font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-emerald-400">
              Contact Us
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="mailto:info@skyrider.edu.np"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors text-sm sm:text-base"
                >
                  <Mail size={16} className="flex-shrink-0" />
                  <span className="break-all">info@skyrider.edu.np</span>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+977-1-XXXXXXX"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors text-sm sm:text-base"
                >
                  <Phone size={16} className="flex-shrink-0" />
                  <span>+977-1-XXXXXXX</span>
                </Link>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-sm sm:text-base">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8 sm:my-10" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs sm:text-sm gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Skyrider High School. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
