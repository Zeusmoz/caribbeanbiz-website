import { useFadeIn } from '../hooks/useFadeIn'
import { useTranslation } from '../contexts/LanguageContext'

export default function CTABanner({ onOpenModal }) {
  const { t } = useTranslation()
  const h2Ref = useFadeIn()
  const pRef = useFadeIn()
  const btnRef = useFadeIn()
  const trustRef = useFadeIn()

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy/20 via-transparent to-burgundy/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,0,35,0.2)_0%,_transparent_70%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Large Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <path d="M20 80 L50 50 L20 20 L35 20 L65 50 L35 80 Z" fill="#8B0023" />
            <path d="M50 80 L80 50 L50 20 L65 20 L95 50 L65 80 Z" fill="#8B0023" />
          </svg>
        </div>

        <h2 ref={h2Ref} className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight relative z-10 fade-in">
          {t.cta.heading1}<br />
          <span className="text-gradient">{t.cta.heading2}</span>
        </h2>
        <p ref={pRef} className="text-xl text-cream/60 mb-12 max-w-2xl mx-auto relative z-10 fade-in stagger-1">
          {t.cta.p}
        </p>

        <div ref={btnRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 fade-in stagger-2">
          <button
            onClick={onOpenModal}
            className="magnetic-btn px-10 py-5 rounded-full bg-burgundy text-cream font-semibold text-lg hover:shadow-lg hover:shadow-burgundy/20 transition-all duration-300 flex items-center space-x-2 group"
          >
            <span>{t.cta.btn}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div ref={trustRef} className="mt-12 flex items-center justify-center space-x-8 text-cream/40 text-sm relative z-10 fade-in stagger-3">
          {t.cta.trust.map((item) => (
            <span key={item} className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
