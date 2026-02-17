import { useFadeIn } from '../hooks/useFadeIn'
import LogoSVG from './ui/LogoSVG'

const STEPS = [
  {
    num: '01',
    title: 'Strategic Acquisition',
    desc: 'We identify undervalued businesses with high optimization potential in the Caribbean region.',
  },
  {
    num: '02',
    title: 'Digital Transformation',
    desc: 'Implementing automation, data systems, and modern operational frameworks.',
  },
  {
    num: '03',
    title: 'Value Acceleration',
    desc: 'Structuring for maximum valuation and strategic exit opportunities.',
  },
]

export default function About() {
  const labelRef = useFadeIn()
  const h2Ref = useFadeIn()
  const p1Ref = useFadeIn()
  const p2Ref = useFadeIn()
  const badgeRef = useFadeIn()
  const panelRef = useFadeIn()

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div ref={labelRef} className="inline-block px-4 py-2 rounded-full glass-panel text-burgundy text-sm font-semibold tracking-wider uppercase fade-in">
              Our Mission
            </div>
            <h2 ref={h2Ref} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight fade-in stagger-1">
              Transforming traditional Caribbean businesses into{' '}
              <span className="text-gradient">structured, scalable, and sellable assets.</span>
            </h2>
            <p ref={p1Ref} className="text-lg text-cream/60 leading-relaxed fade-in stagger-2">
              CaribbeanBiz operates at the intersection of strategic consulting, technology implementation,
              and private investment. We don't just advise—we execute, optimize, and transform.
            </p>
            <p ref={p2Ref} className="text-lg text-cream/60 leading-relaxed fade-in stagger-3">
              Based in the Dominican Republic, we understand the unique challenges and opportunities
              of Caribbean markets. Our approach combines global best practices with local market expertise.
            </p>

            <div ref={badgeRef} className="flex items-center space-x-4 pt-4 fade-in stagger-4">
              <div className="w-12 h-12 rounded-full bg-burgundy/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-cream">Execution-First Approach</div>
                <div className="text-sm text-cream/50">Results over presentations</div>
              </div>
            </div>
          </div>

          {/* Right Column - Glass Panel */}
          <div ref={panelRef} className="relative fade-in stagger-2">
            <div className="absolute inset-0 bg-gradient-to-br from-burgundy/20 to-transparent rounded-3xl blur-3xl"></div>
            <div className="relative glass-panel rounded-3xl p-8 space-y-6">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <LogoSVG />
              </div>

              {STEPS.map((step, idx) => (
                <div key={step.num}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-burgundy/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-burgundy">{step.num}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cream mb-2">{step.title}</h3>
                      <p className="text-cream/60">{step.desc}</p>
                    </div>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent mt-6"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
