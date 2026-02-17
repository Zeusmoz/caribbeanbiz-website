import { useFadeIn } from '../hooks/useFadeIn'

export default function MethodologyStep({ step }) {
  const ref = useFadeIn()

  if (step.isHighlight) {
    return (
      <div
        ref={ref}
        className="glass-card rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center relative overflow-hidden border-burgundy/30 group fade-in"
        style={{ transitionDelay: step.delay }}
      >
        <div className="w-16 h-16 rounded-full bg-burgundy/30 flex items-center justify-center mb-4 relative group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
          <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.iconPath} />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-cream mb-2">{step.title}</h3>
        <p className="text-sm text-cream/50">{step.description}</p>
        <div className="mt-4 text-3xl font-display font-bold text-burgundy group-hover:text-cream transition-colors">{step.id}</div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center relative overflow-hidden group fade-in"
      style={{ transitionDelay: step.delay }}
    >
      <div className="w-16 h-16 rounded-full bg-burgundy/20 flex items-center justify-center mb-4 relative group-hover:scale-110 transition-transform duration-300">
        <svg className="w-8 h-8 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.iconPath} />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-cream mb-2">{step.title}</h3>
      <p className="text-sm text-cream/50">{step.description}</p>
      <div className="mt-4 text-3xl font-display font-bold text-burgundy/30 group-hover:text-burgundy transition-colors">{step.id}</div>
    </div>
  )
}
