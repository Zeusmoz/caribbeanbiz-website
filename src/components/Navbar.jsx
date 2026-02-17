import { useState } from 'react'
import { useNavbarScroll } from '../hooks/useNavbarScroll'

const NAV_LINKS = [
  { label: 'About',       href: 'about'      },
  { label: 'Challenges',  href: 'problem'    },
  { label: 'Methodology', href: 'solution'   },
  { label: 'Services',    href: 'services'   },
  { label: 'Acquisition', href: 'acquisition' },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar({ onOpenModal }) {
  const isVisible = useNavbarScroll(100)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="glass-panel border-b border-cream/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <a href="#" className="logo-container group flex items-center overflow-hidden" style={{ height: '48px' }}>
                <img
                  src="/assets/CaribbeanBiz%20Logo-02.png"
                  alt="CaribbeanBiz"
                  className="logo-icon"
                  style={{ height: '200px', width: 'auto', flexShrink: 0 }}
                />
              </a>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={`#${link.href}`}
                    className="text-sm font-medium text-cream/70 hover:text-burgundy transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={onOpenModal}
                  className="magnetic-btn px-6 py-2.5 rounded-full border border-burgundy text-burgundy hover:bg-burgundy hover:text-cream transition-all duration-300"
                >
                  <span className="text-sm font-semibold">Book Audit</span>
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden text-cream"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal-dark/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8">
          <button
            onClick={closeMobile}
            className="absolute top-6 right-6 text-cream"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={closeMobile}
              className="text-2xl font-display font-bold text-cream hover:text-burgundy transition-colors"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => { onOpenModal(); closeMobile() }}
            className="px-8 py-3 rounded-full bg-burgundy text-cream font-semibold"
          >
            Book Strategic Audit
          </button>
        </div>
      )}
    </>
  )
}
