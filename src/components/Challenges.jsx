import { useFadeIn } from '../hooks/useFadeIn'
import ChallengeCard from './ChallengeCard'
import { CHALLENGES } from '../data/challenges'
import { useTranslation } from '../contexts/LanguageContext'

export default function Challenges() {
  const { t } = useTranslation()
  const labelRef = useFadeIn()
  const h2Ref = useFadeIn()

  return (
    <section id="problem" className="py-32 relative bg-charcoal/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div ref={labelRef} className="inline-block px-4 py-2 rounded-full glass-panel text-burgundy text-sm font-semibold tracking-wider uppercase mb-6 fade-in">
            {t.challenges.label}
          </div>
          <h2 ref={h2Ref} className="text-4xl md:text-5xl font-display font-bold mb-6 fade-in stagger-1">
            {t.challenges.heading1}<br />
            <span className="text-burgundy">{t.challenges.heading2}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHALLENGES.map((challenge, idx) => (
            <ChallengeCard
              key={challenge.id}
              title={t.challenges.items[idx].title}
              description={t.challenges.items[idx].description}
              iconPaths={challenge.iconPaths}
              delay={challenge.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
