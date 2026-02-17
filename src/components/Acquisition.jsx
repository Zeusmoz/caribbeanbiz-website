import { useFadeIn } from '../hooks/useFadeIn'
import LogoSVG from './ui/LogoSVG'
import { useTranslation } from '../contexts/LanguageContext'

export default function Acquisition({ onOpenModal }) {
  const { t } = useTranslation()
  const leftRef = useFadeIn()
  const rightRef = useFadeIn()

  return (
    <section id="acquisition" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark via-burgundy/5 to-charcoal-dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div ref={leftRef} className="fade-in">
            <div className="inline-block px-4 py-2 rounded-full glass-panel text-burgundy text-sm font-semibold tracking-wider uppercase mb-6">
              {t.acquisition.label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              {t.acquisition.heading1}<br />
              <span className="text-gradient">{t.acquisition.heading2}</span>
            </h2>
            <p className="text-lg text-cream/60 mb-8 leading-relaxed">
              {t.acquisition.p}
            </p>

            <div className="space-y-6">
              {t.acquisition.steps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-burgundy/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-burgundy font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-cream mb-1">{step.title}</h4>
                    <p className="text-cream/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center space-x-6">
              {t.acquisition.metrics.map((metric, idx) => (
                <div key={metric.label} className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-burgundy">{metric.value}</div>
                    <div className="text-sm text-cream/50">{metric.label}</div>
                  </div>
                  {idx < t.acquisition.metrics.length - 1 && (
                    <div className="h-12 w-px bg-cream/20"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Investment Criteria */}
          <div ref={rightRef} className="relative fade-in stagger-2">
            <div className="absolute inset-0 bg-gradient-to-br from-burgundy/30 to-transparent rounded-3xl blur-3xl" />
            <div className="relative glass-panel rounded-3xl p-8">
              {/* Logo Watermark */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
                <LogoSVG secondOpacity="1" />
              </div>

              <h3 className="text-2xl font-display font-bold text-cream mb-6">{t.acquisition.criteriaTitle}</h3>

              <div className="space-y-4">
                {t.acquisition.criteria.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between p-4 rounded-xl bg-charcoal/50 border border-cream/10"
                  >
                    <span className="text-cream/80">{row.label}</span>
                    <span className="text-burgundy font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenModal}
                className="w-full mt-6 py-4 rounded-xl bg-burgundy text-cream font-semibold hover:bg-burgundy-light transition-colors"
              >
                {t.acquisition.submitBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
