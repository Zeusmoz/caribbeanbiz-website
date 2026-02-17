import { useFadeIn } from '../hooks/useFadeIn'

export default function ChallengeCard({ title, description, iconPaths, delay }) {
  const ref = useFadeIn()

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-8 group hover:border-burgundy/50 transition-all duration-300 fade-in"
      style={{ transitionDelay: delay }}
    >
      <div className="w-14 h-14 rounded-xl bg-burgundy/10 flex items-center justify-center mb-6 group-hover:bg-burgundy/20 transition-colors">
        <svg className="w-7 h-7 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {iconPaths.map((d, i) => (
            <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
          ))}
        </svg>
      </div>
      <h3 className="text-xl font-bold text-cream mb-3">{title}</h3>
      <p className="text-cream/60">{description}</p>
    </div>
  )
}
