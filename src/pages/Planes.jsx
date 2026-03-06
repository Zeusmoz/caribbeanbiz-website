import { useState, useCallback } from 'react'
import LogoSVG from '../components/ui/LogoSVG'

const PLANES = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$200',
    period: '/mes',
    rdEquiv: '≈ RD$11,600',
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
    badge: '⚡ Más popular',
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

const FAQ = [
  { q: '¿En cuánto tiempo está activo mi agente?', a: 'Starter en 72 horas, Growth en 5 días, Scale en 7 días desde la confirmación de pago.' },
  { q: '¿Necesito conocimientos técnicos?', a: 'No. Nosotros configuramos todo. Tú solo nos dices qué quieres que haga el agente.' },
  { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Sin contratos a largo plazo. Cancelas antes del próximo ciclo y no se cobra.' },
  { q: '¿En qué idioma responde el agente?', a: 'En el idioma que necesites — español, inglés, o ambos.' },
  { q: '¿Qué pasa si el agente comete un error?', a: 'Tienes soporte directo con nosotros. Corregimos cualquier ajuste sin costo adicional.' },
]

const PROBLEMS = [
  { icon: '📱', title: '+50 mensajes sin responder', desc: 'Tus clientes escriben por WhatsApp e Instagram y nadie contesta a tiempo. Cada mensaje ignorado es una venta perdida.' },
  { icon: '⏰', title: 'Tu equipo no da abasto', desc: 'Contratar más personal cuesta. Entrenarlos toma meses. Y aún así no cubren noches ni fines de semana.' },
  { icon: '💸', title: 'Pierdes ventas mientras duermes', desc: 'El 78% de los clientes compran al primero que responde. Si no eres tú, es tu competencia.' },
]

const BENEFITS = [
  { icon: '💬', title: 'Responde al instante', desc: 'WhatsApp, Instagram, Facebook — tu agente contesta en segundos, no en horas.' },
  { icon: '📋', title: 'Califica prospectos', desc: 'Separa los curiosos de los compradores reales antes de que lleguen a ti.' },
  { icon: '📅', title: 'Agenda citas', desc: 'Coordina horarios y agenda reuniones directamente en tu calendario.' },
  { icon: '📊', title: 'Reportes semanales', desc: 'Sabes exactamente cuántos leads llegaron, cuántos se atendieron y cuántos cerraron.' },
  { icon: '🔄', title: 'Seguimiento automático', desc: 'Si un prospecto no responde, tu agente le hace follow-up sin que tú muevas un dedo.' },
  { icon: '🌙', title: 'Trabaja 24/7', desc: 'Noches, fines de semana, feriados — tu agente nunca descansa.' },
]

const STEPS = [
  { num: '01', title: 'Consulta gratuita', desc: 'Analizamos tu negocio, tus canales y tu flujo de clientes actual.' },
  { num: '02', title: 'Configuramos tu agente', desc: 'Diseñamos y entrenamos un agente de IA personalizado para tu negocio.' },
  { num: '03', title: 'Resultados inmediatos', desc: 'Tu agente empieza a atender clientes, agendar citas y cerrar ventas automáticamente.' },
]

function GlassCard({ children, className = '', hover = false }) {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl
      bg-white/[0.03] backdrop-blur-xl
      border border-white/[0.07]
      ${hover ? 'transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(196,40,90,0.15)]' : ''}
      ${className}
    `}>
      {hover && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#E8C088] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />}
      {children}
    </div>
  )
}

export default function Planes() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      telefono: form.telefono.value,
      negocio: form.negocio.value,
      industria: form.industria.value,
      mensajes_dia: form.mensajes_dia.value,
      dolor_principal: form.dolor_principal.value,
      timestamp: new Date().toISOString(),
      source: 'caribbeanbiz-planes',
    }
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (_) { /* silent */ }
    // Always save locally as backup
    const leads = JSON.parse(localStorage.getItem('cbiz_leads') || '[]')
    leads.push(data)
    localStorage.setItem('cbiz_leads', JSON.stringify(leads))
    setSubmitted(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#E8E4E0] relative overflow-x-hidden">

      {/* Background grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-35 blur-[100px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #C4285A, transparent 70%)' }} />
      <div className="fixed bottom-[20%] left-[-8%] w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #D4AA6A, transparent 70%)' }} />
      <div className="fixed top-[50%] right-[10%] w-[300px] h-[300px] rounded-full opacity-15 blur-[100px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #4A1A6B, transparent 70%)' }} />

      {/* Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-xl border-b border-white/[0.07] bg-[#0a0a0f]/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8"><LogoSVG variant="icon-dark" className="w-full h-full" /></div>
            <span className="text-lg font-display font-bold text-[#F5F0DC]">
              Caribbean<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4285A] to-[#D4AA6A]">Biz</span>
            </span>
          </a>
          <a href="#formulario"
            className="relative px-6 py-2.5 text-sm font-semibold text-[#F5F0DC] bg-[rgba(196,40,90,0.15)] border border-[rgba(196,40,90,0.3)] rounded-lg transition-all hover:bg-[rgba(196,40,90,0.25)] hover:shadow-[0_0_20px_rgba(196,40,90,0.2)]"
          >
            <span className="absolute top-1/2 left-3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C4285A] animate-pulse" />
            <span className="ml-2">Agendar Consulta</span>
          </a>
        </div>
      </nav>

      <main className="relative z-10">

        {/* ===== HERO ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-[rgba(245,240,220,0.7)] bg-[rgba(196,40,90,0.1)] border border-[rgba(196,40,90,0.2)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4285A] animate-pulse" />
            Agentes de IA para negocios en RD
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#F5F0DC] mb-6 tracking-tight">
            Deja de perder clientes<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#F5F0DC]">
              por no responder a tiempo
            </span>
          </h1>
          <p className="text-lg text-[rgba(232,228,224,0.55)] max-w-xl mx-auto mb-14">
            Instalamos agentes de inteligencia artificial que atienden, califican y agendan clientes por ti — 24/7, en WhatsApp, Instagram y más.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
            {[
              { n: '72h', l: 'Tu agente activo' },
              { n: '24/7', l: 'Atención automática' },
              { n: '0', l: 'Clientes perdidos' },
            ].map(({ n, l }) => (
              <GlassCard key={n} className="px-8 py-6 text-center min-w-[160px]">
                <span className="block text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#F5F0DC] leading-none mb-1">{n}</span>
                <span className="text-xs text-[rgba(232,228,224,0.3)] uppercase tracking-wider font-medium">{l}</span>
              </GlassCard>
            ))}
          </div>
          <a href="#formulario"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-lg font-semibold text-[#0a0a0f] bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#E8C088] shadow-[0_0_20px_rgba(196,40,90,0.2)] hover:shadow-[0_0_60px_rgba(196,40,90,0.25)] hover:-translate-y-0.5 hover:brightness-110 transition-all"
          >
            Quiero mi agente de IA
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </section>

        {/* ===== PROBLEMS ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F0DC] text-center mb-14">¿Te suena familiar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map(({ icon, title, desc }) => (
              <GlassCard key={title} hover className="p-9 group">
                <div className="text-3xl mb-5">{icon}</div>
                <h3 className="text-lg font-display font-bold text-[#F5F0DC] mb-3">{title}</h3>
                <p className="text-sm text-[rgba(232,228,224,0.55)] leading-relaxed">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ===== SOLUTION STEPS ===== */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(139,26,58,0.05)] via-transparent to-[rgba(139,26,58,0.05)] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-4">
              <span className="text-[#F5F0DC]">Tu equipo de IA, </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#F5F0DC]">listo en 72 horas</span>
            </h2>
            <p className="text-center text-[rgba(232,228,224,0.55)] mb-14 max-w-lg mx-auto">No necesitas saber de tecnología. Nosotros configuramos todo.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map(({ num, title, desc }) => (
                <div key={num} className="text-center py-10 px-6">
                  <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#F5F0DC] mb-5 leading-none">{num}</div>
                  <h3 className="text-lg font-display font-bold text-[#F5F0DC] mb-3">{title}</h3>
                  <p className="text-sm text-[rgba(232,228,224,0.55)]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-14">
            <span className="text-[#F5F0DC]">Lo que tu agente de IA </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#F5F0DC]">hace por ti</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon, title, desc }) => (
              <GlassCard key={title} hover className="p-8 group">
                <div className="text-2xl mb-4">{icon}</div>
                <h3 className="text-base font-display font-bold text-[#F5F0DC] mb-2">{title}</h3>
                <p className="text-sm text-[rgba(232,228,224,0.55)] leading-relaxed">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ===== COMPARACIÓN VS EMPLEADO ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <p className="text-[rgba(245,240,220,0.3)] mb-1">Empleado de oficina</p>
              <p className="text-2xl font-bold text-[rgba(245,240,220,0.4)] line-through">RD$35,000/mes</p>
              <p className="text-[rgba(245,240,220,0.2)] text-xs mt-1">8 hrs · vacaciones · prestaciones</p>
            </div>
            <div className="text-[rgba(245,240,220,0.2)] text-2xl">vs</div>
            <div className="text-center">
              <p className="text-[#C4285A] mb-1 font-semibold">Agente Caribbean Biz</p>
              <p className="text-2xl font-bold text-[#F5F0DC]">desde $200/mes</p>
              <p className="text-[rgba(245,240,220,0.4)] text-xs mt-1">24/7 · sin vacaciones · sin prestaciones</p>
            </div>
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(139,26,58,0.04)] to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-4">
              <span className="text-[#F5F0DC]">Planes claros, </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#F5F0DC]">sin letra pequeña</span>
            </h2>
            <p className="text-center text-[rgba(232,228,224,0.55)] mb-14 max-w-lg mx-auto">Elige el nivel de automatización que necesita tu negocio.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANES.map((plan) => (
                <div
                  key={plan.id}
                  className={`
                    relative rounded-2xl p-8 flex flex-col transition-all duration-300
                    bg-white/[0.03] backdrop-blur-xl border
                    ${plan.badge
                      ? 'border-[rgba(196,40,90,0.3)] bg-[rgba(196,40,90,0.06)] scale-[1.02] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_0_60px_rgba(196,40,90,0.25)]'
                      : 'border-white/[0.07] hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(196,40,90,0.15)]'
                    }
                  `}
                >
                  {/* Popular badge */}
                  {plan.badge && (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#E8C088]" />
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#E8C088] text-[#0a0a0f] whitespace-nowrap">
                        {plan.badge}
                      </div>
                    </>
                  )}

                  <div className={plan.badge ? 'mt-4' : ''}>
                    <p className="text-xs font-semibold text-[rgba(232,228,224,0.3)] uppercase tracking-[0.1em] mb-3">{plan.name}</p>
                    <p className="text-sm text-[rgba(245,240,220,0.4)] mb-6">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold text-[#F5F0DC]">{plan.price}</span>
                      <span className="text-sm text-[rgba(232,228,224,0.3)]">{plan.period}</span>
                    </div>
                    <p className="text-xs text-[rgba(245,240,220,0.25)] mt-1">{plan.rdEquiv}</p>
                  </div>

                  <a
                    href={plan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      w-full text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 mb-8 block
                      ${plan.badge
                        ? 'bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#E8C088] text-[#0a0a0f] shadow-[0_0_20px_rgba(196,40,90,0.2)] hover:shadow-[0_0_40px_rgba(196,40,90,0.3)] hover:brightness-110'
                        : 'border border-white/[0.08] text-[#F5F0DC] hover:border-[rgba(196,40,90,0.3)] hover:bg-[rgba(196,40,90,0.1)] hover:shadow-[0_0_30px_rgba(196,40,90,0.15)]'
                      }
                    `}
                  >
                    {plan.cta}
                  </a>

                  <div className="space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <span className="mt-0.5 text-sm text-[#C4285A]">✦</span>
                        <span className="text-sm text-[rgba(232,228,224,0.55)]">{f}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <span className="mt-0.5 text-sm text-[rgba(245,240,220,0.15)]">✗</span>
                        <span className="text-sm text-[rgba(245,240,220,0.2)]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FORM ===== */}
        <section id="formulario" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-4">
            <span className="text-[#F5F0DC]">Agenda tu consulta </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#F5F0DC]">gratuita</span>
          </h2>
          <p className="text-center text-[rgba(232,228,224,0.55)] mb-14 max-w-lg mx-auto">Completa el formulario y te contactamos en menos de 24 horas.</p>

          {!submitted ? (
            <GlassCard className="max-w-2xl mx-auto p-10 sm:p-12">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[rgba(245,240,220,0.7)] mb-2">Nombre completo</label>
                    <input name="nombre" required placeholder="Tu nombre"
                      className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#F5F0DC] placeholder-[rgba(232,228,224,0.3)] focus:outline-none focus:border-[#C4285A] focus:shadow-[0_0_0_3px_rgba(196,40,90,0.1)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgba(245,240,220,0.7)] mb-2">Email</label>
                    <input name="email" type="email" required placeholder="tu@email.com"
                      className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#F5F0DC] placeholder-[rgba(232,228,224,0.3)] focus:outline-none focus:border-[#C4285A] focus:shadow-[0_0_0_3px_rgba(196,40,90,0.1)] transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[rgba(245,240,220,0.7)] mb-2">Teléfono / WhatsApp</label>
                    <input name="telefono" type="tel" required placeholder="+1 809-000-0000"
                      className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#F5F0DC] placeholder-[rgba(232,228,224,0.3)] focus:outline-none focus:border-[#C4285A] focus:shadow-[0_0_0_3px_rgba(196,40,90,0.1)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgba(245,240,220,0.7)] mb-2">Nombre del negocio</label>
                    <input name="negocio" required placeholder="Tu empresa"
                      className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#F5F0DC] placeholder-[rgba(232,228,224,0.3)] focus:outline-none focus:border-[#C4285A] focus:shadow-[0_0_0_3px_rgba(196,40,90,0.1)] transition-all" />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-[rgba(245,240,220,0.7)] mb-2">Industria</label>
                  <select name="industria"
                    className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#F5F0DC] focus:outline-none focus:border-[#C4285A] focus:shadow-[0_0_0_3px_rgba(196,40,90,0.1)] transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: '40px' }}
                  >
                    <option value="" className="bg-[#12121a]">Selecciona tu industria</option>
                    <option value="retail" className="bg-[#12121a]">Retail / Tienda</option>
                    <option value="restaurante" className="bg-[#12121a]">Restaurante / Food</option>
                    <option value="servicios" className="bg-[#12121a]">Servicios profesionales</option>
                    <option value="salud" className="bg-[#12121a]">Salud / Clínica</option>
                    <option value="construccion" className="bg-[#12121a]">Construcción / Inmobiliaria</option>
                    <option value="educacion" className="bg-[#12121a]">Educación</option>
                    <option value="tecnologia" className="bg-[#12121a]">Tecnología</option>
                    <option value="otro" className="bg-[#12121a]">Otro</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-[rgba(245,240,220,0.7)] mb-2">¿Cuántos mensajes de clientes recibes al día?</label>
                  <select name="mensajes_dia"
                    className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#F5F0DC] focus:outline-none focus:border-[#C4285A] focus:shadow-[0_0_0_3px_rgba(196,40,90,0.1)] transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: '40px' }}
                  >
                    <option value="" className="bg-[#12121a]">Selecciona un rango</option>
                    <option value="menos-10" className="bg-[#12121a]">Menos de 10</option>
                    <option value="10-30" className="bg-[#12121a]">10 - 30</option>
                    <option value="30-80" className="bg-[#12121a]">30 - 80</option>
                    <option value="mas-80" className="bg-[#12121a]">Más de 80</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-[rgba(245,240,220,0.7)] mb-2">¿Cuál es tu mayor dolor ahora mismo?</label>
                  <textarea name="dolor_principal" rows={3} placeholder="Ej: Pierdo clientes porque no respondo a tiempo..."
                    className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#F5F0DC] placeholder-[rgba(232,228,224,0.3)] focus:outline-none focus:border-[#C4285A] focus:shadow-[0_0_0_3px_rgba(196,40,90,0.1)] transition-all resize-vertical min-h-[80px]" />
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-lg font-semibold text-[#0a0a0f] bg-gradient-to-r from-[#C4285A] via-[#D4AA6A] to-[#E8C088] shadow-[0_0_20px_rgba(196,40,90,0.2)] hover:shadow-[0_0_60px_rgba(196,40,90,0.25)] hover:-translate-y-0.5 hover:brightness-110 transition-all"
                >
                  Agendar mi consulta gratuita
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <p className="text-center text-[rgba(232,228,224,0.3)] text-xs mt-4">🔒 Tu información es confidencial. Sin compromiso.</p>
              </form>
            </GlassCard>
          ) : (
            <GlassCard className="max-w-2xl mx-auto p-16 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-display font-bold text-[#F5F0DC] mb-3">¡Recibido!</h3>
              <p className="text-[rgba(232,228,224,0.55)]">Tu solicitud fue enviada. Te contactaremos en menos de 24 horas para agendar tu consulta gratuita.</p>
            </GlassCard>
          )}
        </section>

        {/* ===== FAQ ===== */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-2xl font-display font-bold text-[#F5F0DC] text-center mb-10">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <GlassCard key={q} className="p-6">
                <p className="font-semibold text-[#F5F0DC] mb-2">{q}</p>
                <p className="text-sm text-[rgba(245,240,220,0.5)]">{a}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center rounded-2xl p-10 border border-[rgba(196,40,90,0.2)] bg-[rgba(196,40,90,0.05)]">
            <h2 className="text-2xl font-display font-bold text-[#F5F0DC] mb-3">¿Tienes preguntas antes de empezar?</h2>
            <p className="text-[rgba(245,240,220,0.5)] mb-6">Escríbenos directamente. Respondemos en menos de 24 horas.</p>
            <a
              href="https://wa.me/17867743478"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-green-600/15 border border-green-500/30 text-green-400 font-semibold hover:bg-green-600/25 transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-8 text-center relative z-10">
        <p className="text-[rgba(245,240,220,0.2)] text-xs">© 2026 CaribbeanBiz · Santo Domingo, DR · Pagos procesados por Stripe 🔒</p>
      </footer>
    </div>
  )
}
