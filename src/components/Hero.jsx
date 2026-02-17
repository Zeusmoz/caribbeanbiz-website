import LogoSVG from './ui/LogoSVG'

export default function Hero({ onOpenModal }) {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 hero-bg"
      style={{ contentVisibility: 'visible' }}
    >
      {/* Animated Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
        <img
          src="/assets/CaribbeanBiz%20Logo-03.png"
          alt=""
          className="w-full h-full animate-float"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Decorative diamond */}
      <div className="absolute top-20 right-10 w-48 h-48 opacity-20 animate-float hidden lg:block" style={{ animationDelay: '0s' }}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M100 20 L180 100 L100 180 L20 100 Z" fill="none" stroke="#8B0023" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel mb-8 fade-in visible">
          <div className="w-6 h-6 relative">
            <LogoSVG />
          </div>
          <span className="text-sm font-medium text-cream/80 tracking-wider uppercase">Dominican Republic Based</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[0.9] tracking-tight fade-in visible stagger-1">
          Transforming<br />
          <span className="text-gradient-gold">Caribbean</span><br />
          <span className="text-burgundy">Business Assets</span>
        </h1>

        <p className="text-lg md:text-xl text-cream/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed fade-in visible stagger-2">
          We acquire, optimize, and structure traditional businesses into scalable,
          automated, and highly valuable enterprises ready for strategic exits.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in visible stagger-3">
          <button
            onClick={onOpenModal}
            className="magnetic-btn group px-8 py-4 rounded-full bg-burgundy text-cream font-semibold text-lg hover:shadow-lg hover:shadow-burgundy/20 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Book Strategic Audit</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={scrollToAbout}
            className="magnetic-btn px-8 py-4 rounded-full border border-cream/30 text-cream font-semibold text-lg hover:bg-cream/10 transition-all duration-300"
          >
            <span>Partner With Us</span>
          </button>
        </div>


      </div>

    </section>
  )
}
