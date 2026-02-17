import LogoSVG from './ui/LogoSVG'

const SERVICE_LINKS = [
  'Strategic Audit',
  'Digital Organization',
  'Automation',
  'Data Analytics',
  'Exit Strategy',
]

const COMPANY_LINKS = [
  { label: 'About Us',            href: '#about'       },
  { label: 'Acquisition Criteria', href: '#acquisition' },
  { label: 'Case Studies',        href: '#'            },
  { label: 'Careers',             href: '#'            },
  { label: 'Contact',             href: '#'            },
]

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-charcoal-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <LogoSVG />
              </div>
              <span className="text-2xl font-display font-bold text-cream">
                Caribbean<span className="text-burgundy">Biz</span>
              </span>
            </div>
            <p className="text-cream/50 max-w-sm mb-6">
              Transforming Caribbean businesses into structured, scalable, and sellable assets
              through strategic optimization and technological innovation.
            </p>
            <div className="flex space-x-4">
              {/* Twitter */}
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-cream/60 hover:text-burgundy hover:border-burgundy/50 transition-all"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-cream/60 hover:text-burgundy hover:border-burgundy/50 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-cream mb-4">Services</h4>
            <ul className="space-y-3 text-cream/50">
              {SERVICE_LINKS.map((link) => (
                <li key={link}>
                  <a href="#services" className="hover:text-burgundy transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-cream mb-4">Company</h4>
            <ul className="space-y-3 text-cream/50">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-burgundy transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/40 text-sm mb-4 md:mb-0">
            © 2026 CaribbeanBiz. All rights reserved. Santo Domingo, Dominican Republic.
          </p>
          <div className="flex space-x-6 text-sm text-cream/40">
            <a href="#" className="hover:text-burgundy transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-burgundy transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
