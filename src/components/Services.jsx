import { useFadeIn } from '../hooks/useFadeIn'
import ServiceCard from './ServiceCard'
import { SERVICES } from '../data/services'
import { useTranslation } from '../contexts/LanguageContext'

export default function Services() {
  const { t } = useTranslation()
  const labelRef = useFadeIn()
  const h2Ref = useFadeIn()

  return (
    <section id="services" className="py-32 relative bg-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div ref={labelRef} className="inline-block px-4 py-2 rounded-full glass-panel text-burgundy text-sm font-semibold tracking-wider uppercase mb-6 fade-in">
            {t.services.label}
          </div>
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-display font-bold mb-6 fade-in stagger-1">
            {t.services.heading1} <span className="text-gradient">{t.services.heading2}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={t.services.items[idx].title}
              description={t.services.items[idx].description}
              bullets={t.services.items[idx].bullets}
              iconPath={service.iconPath}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
