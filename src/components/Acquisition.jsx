import { useFadeIn } from '../hooks/useFadeIn'
import LogoSVG from './ui/LogoSVG'

const STEPS = [
  {
    num: '1',
    title: 'Strategic Acquisition',
    desc: 'We identify businesses with $1M-$10M revenue, strong market position, but operational challenges.',
  },
  {
    num: '2',
    title: 'Intensive Optimization',
    desc: '6-18 month transformation period implementing systems, automation, and operational excellence.',
  },
  {
    num: '3',
    title: 'Value Realization',
    desc: 'Strategic exit through sale to private equity, strategic buyers, or IPO preparation.',
  },
]

const CRITERIA = [
  { label: 'Revenue Range', value: '$1M - $10M' },
  { label: 'EBITDA Margin', value: '10% - 25%' },
  { label: 'Business Age',  value: '5+ Years' },
  { label: 'Industries',    value: 'Diverse' },
  { label: 'Location',      value: 'Caribbean Region' },
]

const METRICS = [
  { value: '24-36', label: 'Month Timeline' },
  { value: '3-5x',  label: 'Value Multiple' },
  { value: '85%',   label: 'Success Rate' },
]

export default function Acquisition({ onOpenModal }) {
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
              Acquisition Model
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              We Buy, Optimize &<br />
              <span className="text-gradient">Scale Businesses</span>
            </h2>
            <p className="text-lg text-cream/60 mb-8 leading-relaxed">
              CaribbeanBiz actively acquires small to medium enterprises with strong fundamentals
              but operational inefficiencies. We transform them into high-performing assets.
            </p>

            <div className="space-y-6">
              {STEPS.map((step) => (
                <div key={step.num} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-burgundy/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-burgundy font-bold">{step.num}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-cream mb-1">{step.title}</h4>
                    <p className="text-cream/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center space-x-6">
              {METRICS.map((metric, idx) => (
                <div key={metric.label} className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-burgundy">{metric.value}</div>
                    <div className="text-sm text-cream/50">{metric.label}</div>
                  </div>
                  {idx < METRICS.length - 1 && (
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

              <h3 className="text-2xl font-display font-bold text-cream mb-6">Investment Criteria</h3>

              <div className="space-y-4">
                {CRITERIA.map((row) => (
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
                Submit Business for Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
