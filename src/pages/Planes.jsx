import LogoSVG from '../components/ui/LogoSVG'

const PLANES = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$200',
    period: '/mes',
    rdEquiv: '≈ RD$11,600',
    color: 'yellow',
    badge: null,
    description: 'Ideal para negocios que quieren empezar a automatizar sin complicaciones.',
    features: [
      '1 agente activo 24/7',
      'WhatsApp o Telegram',
      'Atención al cliente automatizada',
      'Agendamiento y recordatorios',
      'Reporte semanal de actividad',
      'Setup incluido',
      'Activo en 72 horas',
    ],
    notIncluded: [
      'Multi-canal',
      'Integraciones custom',
      'Reunión mensual',
    ],
    link: 'https://buy.stripe.com/eVq5kDg7j8EVd2N9cS7N600',
    cta: 'Empezar con Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$400',
    period: '/mes',
    rdEquiv: '≈ RD$23,200',
    color: 'orange',
    badge: '🔥 Más popular',
    description: 'Para negocios listos para escalar con múltiples canales y automatizaciones.',
    features: [
      'Hasta 3 agentes activos 24/7',
      'WhatsApp + Telegram + Instagram',
      'Todo lo del Starter +',
      'Seguimiento automático de prospectos',
      'Integración con Google Calendar o CRM',
      'Reunión mensual de revisión',
      'Reportes semanales detallados',
      'Setup incluido',
      'Activo en 5 días',
    ],
    notIncluded: [
      'Automatizaciones custom',
      'SLA garantizado',
    ],
    link: 'https://buy.stripe.com/28E8wPaMZ5sJ6EpfBg7N601',
    cta: 'Empezar con Growth',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$600',
    period: '/mes',
    rdEquiv: '≈ RD$34,800',
    color: 'red',
    badge: null,
    description: 'Para empresas que quieren la operación completa automatizada con SLA.',
    features: [
      'Hasta 5 agentes activos 24/7',
      'Multi-canal completo',
      'Todo lo del Growth +',
      'Automatizaciones personalizadas',
      'SLA de soporte garantizado',
      'Dashboard de métricas en tiempo real',
      'Acceso al portal de cliente',
      'Setup incluido',
      'Activo en 7 días',
    ],
    notIncluded: [],
    link: 'https://buy.stripe.com/00w14ncV76wN1k588O7N602',
    cta: 'Empezar con Scale',
  },
]

const colorMap = {
  yellow: {
    badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    btn: 'border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10',
    check: 'text-yellow-400',
    glow: 'hover:border-yellow-500/30',
  },
  orange: {
    badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    btn: 'bg-burgundy hover:bg-burgundy/80 text-white',
    check: 'text-orange-400',
    glow: 'border-burgundy/40 hover:border-burgundy shadow-burgundy/20 shadow-lg',
  },
  red: {
    badge: 'bg-red-500/15 text-red-400 border-red-500/30',
    btn: 'border border-red-500/40 text-red-400 hover:bg-red-500/10',
    check: 'text-red-400',
    glow: 'hover:border-red-500/30',
  },
}

export default function Planes() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-cream">

      {/* Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-md border-b border-white/8 bg-[#0a0a0a]/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8"><LogoSVG variant="icon-dark" className="w-full h-full" /></div>
            <span className="text-lg font-display font-bold text-cream">
              Caribbean<span className="text-burgundy">Biz</span>
            </span>
          </a>
          <a href="/client-login" className="text-sm text-cream/40 hover:text-cream transition-colors">
            Client Login →
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-burgundy text-sm font-semibold uppercase tracking-widest mb-4">
            Planes & Precios
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-cream mb-6">
            Tu asistente de IA.<br />
            <span className="text-burgundy">24/7. Sin excusas.</span>
          </h1>
          <p className="text-cream/50 text-lg max-w-xl mx-auto">
            Menos que contratar un empleado. Más eficiente que cualquier humano.
            Activo mientras tú duermes.
          </p>
        </div>

        {/* Comparación vs empleado */}
        <div className="flex items-center justify-center gap-8 mb-16 text-sm">
          <div className="text-center">
            <p className="text-cream/30 mb-1">Empleado de oficina</p>
            <p className="text-2xl font-bold text-cream/40 line-through">RD$35,000/mes</p>
            <p className="text-cream/20 text-xs mt-1">8 hrs · vacaciones · prestaciones</p>
          </div>
          <div className="text-cream/20 text-2xl">vs</div>
          <div className="text-center">
            <p className="text-burgundy mb-1 font-semibold">Agente Caribbean Biz</p>
            <p className="text-2xl font-bold text-cream">desde $200/mes</p>
            <p className="text-cream/40 text-xs mt-1">24/7 · sin vacaciones · sin prestaciones</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANES.map((plan) => {
            const c = colorMap[plan.color]
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border border-white/8 bg-[#111111] p-8 flex flex-col transition-all duration-300 ${c.glow}`}
              >
                {/* Badge popular */}
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold border ${c.badge}`}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <h2 className="text-xl font-display font-bold text-cream mb-1">{plan.name}</h2>
                  <p className="text-cream/40 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold text-cream">{plan.price}</span>
                    <span className="text-cream/40 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-cream/30 text-xs mt-1">{plan.rdEquiv}</p>
                </div>

                {/* CTA */}
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 mb-8 block ${c.btn}`}
                >
                  {plan.cta}
                </a>

                {/* Features */}
                <div className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <span className={`mt-0.5 text-sm ${c.check}`}>✓</span>
                      <span className="text-cream/70 text-sm">{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 text-sm text-cream/20">✗</span>
                      <span className="text-cream/25 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* FAQ rápido */}
        <div className="max-w-2xl mx-auto space-y-6 mb-16">
          <h2 className="text-2xl font-display font-bold text-cream text-center mb-8">Preguntas frecuentes</h2>
          {[
            { q: '¿En cuánto tiempo está activo mi agente?', a: 'Starter en 72 horas, Growth en 5 días, Scale en 7 días desde la confirmación de pago.' },
            { q: '¿Necesito conocimientos técnicos?', a: 'No. Nosotros configuramos todo. Tú solo nos dices qué quieres que haga el agente.' },
            { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Sin contratos a largo plazo. Cancelas antes del próximo ciclo y no se cobra.' },
            { q: '¿En qué idioma responde el agente?', a: 'En el idioma que necesites — español, inglés, o ambos.' },
            { q: '¿Qué pasa si el agente comete un error?', a: 'Tienes soporte directo con nosotros. Corregimos cualquier ajuste sin costo adicional.' },
          ].map(({ q, a }) => (
            <div key={q} className="border border-white/8 rounded-xl p-6 bg-[#111111]">
              <p className="font-semibold text-cream mb-2">{q}</p>
              <p className="text-cream/50 text-sm">{a}</p>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center border border-burgundy/20 rounded-2xl p-10 bg-burgundy/5">
          <h2 className="text-2xl font-display font-bold text-cream mb-3">¿Tienes preguntas antes de empezar?</h2>
          <p className="text-cream/50 mb-6">Escríbenos directamente. Respondemos en menos de 24 horas.</p>
          <a
            href="https://wa.me/17867743478"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-green-600/15 border border-green-500/30 text-green-400 font-semibold hover:bg-green-600/25 transition-colors"
          >
            💬 WhatsApp
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8 text-center">
        <p className="text-cream/20 text-xs">© 2026 CaribbeanBiz · Santo Domingo, DR · Pagos procesados por Stripe 🔒</p>
      </footer>
    </div>
  )
}
