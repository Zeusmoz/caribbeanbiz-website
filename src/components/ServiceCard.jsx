import { useFadeIn } from '../hooks/useFadeIn'

export default function ServiceCard({ id, title, description, bullets, iconPath, delay }) {
  const ref = useFadeIn()

  return (
    <div
      ref={ref}
      className="service-card glass-card rounded-2xl p-8 group fade-in"
      style={{ transitionDelay: delay }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-burgundy/20 to-burgundy/5 flex items-center justify-center">
          <svg className="w-7 h-7 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <span className="text-4xl font-display font-bold text-cream/10 group-hover:text-burgundy/20 transition-colors">{id}</span>
      </div>
      <h3 className="text-xl font-bold text-cream mb-3 group-hover:text-burgundy transition-colors">{title}</h3>
      <p className="text-cream/60 mb-4">{description}</p>
      <ul className="space-y-2 text-sm text-cream/50">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy mr-2 flex-shrink-0"></span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}
