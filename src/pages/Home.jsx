import LogoSVG from '../components/ui/LogoSVG'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-cream px-6">
      <div className="noise-bg" aria-hidden="true" />
      <div className="text-center max-w-lg relative z-10">
        <div className="w-20 h-20 mx-auto mb-6">
          <LogoSVG />
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">
          Caribbean<span className="text-burgundy">Biz</span>
        </h1>
        <div className="inline-flex items-center gap-2 bg-burgundy/10 border border-burgundy/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
          <span className="text-sm font-medium text-burgundy">Under Construction</span>
        </div>
        <p className="text-cream/60 text-lg mb-8">
          We're building something powerful. In the meantime, explore our plans and get started.
        </p>
        <a
          href="/planes"
          className="inline-block px-8 py-3 bg-burgundy text-cream font-semibold rounded-full hover:bg-burgundy/80 transition-colors"
        >
          Ver Planes →
        </a>
      </div>
    </div>
  )
}
