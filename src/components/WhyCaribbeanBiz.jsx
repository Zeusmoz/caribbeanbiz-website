import { useFadeIn } from '../hooks/useFadeIn'
import { DIFFERENTIATORS } from '../data/differentiators'

export default function WhyCaribbeanBiz() {
  const h2Ref = useFadeIn()

  return (
    <section className="py-32 relative bg-charcoal/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-display font-bold mb-6 fade-in">
            Why <span className="text-gradient">CaribbeanBiz</span>?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DIFFERENTIATORS.map((item) => (
            <DifferentiatorCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DifferentiatorCard({ item }) {
  const ref = useFadeIn()

  return (
    <div
      ref={ref}
      className="text-center group fade-in"
      style={{ transitionDelay: item.delay }}
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-burgundy/20 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <svg className="w-10 h-10 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={item.strokeWidth || 1.5} d={item.iconPath} />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-cream mb-2">{item.title}</h3>
      <p className="text-cream/60 text-sm">{item.description}</p>
    </div>
  )
}
