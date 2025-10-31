import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Skyrider High School</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Modern education platform dedicated to academic excellence and community.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-slate-400 text-sm">Email: info@skyrider.edu.np</p>
            <p className="text-slate-400 text-sm">Phone: +977-1-XXXXXXX</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 pb-12 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Skyrider High School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
