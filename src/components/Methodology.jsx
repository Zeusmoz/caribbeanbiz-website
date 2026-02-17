import { useFadeIn } from '../hooks/useFadeIn'
import MethodologyStep from './MethodologyStep'
import { METHODOLOGY_STEPS } from '../data/methodology'
import { useTranslation } from '../contexts/LanguageContext'

function ArrowRight() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <svg className="w-8 h-8 text-burgundy/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  )
}

export default function Methodology() {
  const { t } = useTranslation()
  const labelRef = useFadeIn()
  const h2Ref = useFadeIn()
  const pRef = useFadeIn()

  const stepsWithTranslations = METHODOLOGY_STEPS.map((step, idx) => ({
    ...step,
    title: t.methodology.steps[idx].title,
    description: t.methodology.steps[idx].description,
  }))

  const row1 = stepsWithTranslations.slice(0, 4)
  const row2 = stepsWithTranslations.slice(4)

  return (
    <section id="solution" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,0,35,0.1)_0%,_transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div ref={labelRef} className="inline-block px-4 py-2 rounded-full glass-panel text-burgundy text-sm font-semibold tracking-wider uppercase mb-6 fade-in">
            {t.methodology.label}
          </div>
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-display font-bold mb-6 fade-in stagger-1">
            {t.methodology.heading1} <span className="text-gradient">{t.methodology.heading2}</span>
          </h2>
          <p ref={pRef} className="text-xl text-cream/60 max-w-3xl mx-auto fade-in stagger-2">
            {t.methodology.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Row 1: Steps 01-04 with arrows between */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-0 lg:gap-0">
            <div className="lg:col-span-1 p-4">
              <MethodologyStep step={row1[0]} />
            </div>
            <div className="lg:col-span-1 flex items-center justify-center p-2">
              <ArrowRight />
            </div>
            <div className="lg:col-span-1 p-4">
              <MethodologyStep step={row1[1]} />
            </div>
            <div className="lg:col-span-1 flex items-center justify-center p-2">
              <ArrowRight />
            </div>
            <div className="lg:col-span-1 p-4">
              <MethodologyStep step={row1[2]} />
            </div>
            <div className="lg:col-span-1 flex items-center justify-center p-2">
              <ArrowRight />
            </div>
            <div className="lg:col-span-1 p-4">
              <MethodologyStep step={row1[3]} />
            </div>
          </div>

          {/* Row 2: Steps 05-06 centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-3xl mx-auto px-4">
            {row2.map((step) => (
              <MethodologyStep key={step.id} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
