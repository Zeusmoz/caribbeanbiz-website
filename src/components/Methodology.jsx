import { useState, useEffect, useRef } from 'react'
import MethodologyStep from './MethodologyStep'
import { METHODOLOGY_STEPS } from '../data/methodology'
import { useTranslation } from '../contexts/LanguageContext'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Methodology() {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const labelRef = useFadeIn()
  const h2Ref = useFadeIn()
  const pRef = useFadeIn()

  const stepsWithTranslations = METHODOLOGY_STEPS.map((step, idx) => ({
    ...step,
    title: t.methodology.steps[idx].title,
    description: t.methodology.steps[idx].description,
  }))

  // Auto-advance through steps when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % stepsWithTranslations.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [isVisible, stepsWithTranslations.length])

  const progressPercent = ((activeStep) / (stepsWithTranslations.length - 1)) * 100

  return (
    <section id="solution" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,0,35,0.08)_0%,_transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
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

        {/* Progress bar */}
        <div className="relative mb-16 px-4">
          <div className="h-px bg-cream/10 w-full rounded-full" />
          <div
            className="absolute top-0 left-4 h-px bg-burgundy rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `calc(${progressPercent}% - 2rem)` }}
          />
          {/* Step dots on the line */}
          <div className="absolute top-0 left-4 right-4 flex justify-between" style={{ transform: 'translateY(-50%)' }}>
            {stepsWithTranslations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-400 ${
                  idx <= activeStep
                    ? 'bg-burgundy border-burgundy scale-110'
                    : 'bg-charcoal-dark border-cream/20 hover:border-cream/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-cream/5 rounded-2xl overflow-hidden">
          {stepsWithTranslations.map((step, idx) => (
            <div key={step.id} className="bg-charcoal-dark/40 p-6 pb-8 relative">
              <MethodologyStep
                step={step}
                index={idx}
                isActive={activeStep === idx}
                onClick={() => setActiveStep(idx)}
              />
            </div>
          ))}
        </div>

        {/* Active step detail card */}
        <div className="mt-8 glass-card rounded-2xl p-8 flex items-start gap-6 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-burgundy flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stepsWithTranslations[activeStep].iconPath} />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-burgundy text-sm font-bold tracking-widest">{stepsWithTranslations[activeStep].id}</span>
              <h3 className="text-lg font-bold text-cream">{stepsWithTranslations[activeStep].title}</h3>
            </div>
            <p className="text-cream/60 leading-relaxed">{stepsWithTranslations[activeStep].description}</p>
          </div>
          {/* Step counter */}
          <div className="text-cream/20 text-sm font-mono flex-shrink-0">
            {activeStep + 1} / {stepsWithTranslations.length}
          </div>
        </div>

      </div>
    </section>
  )
}
