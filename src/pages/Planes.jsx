import { useState, useCallback } from 'react'
import LogoSVG from '../components/ui/LogoSVG'

const INTEREST_OPTIONS = [
  { value: 'starter',        label: 'Starter — Automatización básica' },
  { value: 'growth',         label: 'Growth — Sistemas a medida' },
  { value: 'scale',          label: 'Scale — Operación completa con IA' },
  { value: 'diagnostic',     label: 'Diagnóstico gratuito — No sé por dónde empezar' },
]

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  interest: '',
  message: '',
}

const inputClass = 'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-burgundy transition-colors'
const labelClass = 'block text-sm font-medium text-cream/70 mb-1.5'

export default function Planes() {
  const [submitState, setSubmitState] = useState('idle')
  const [formData, setFormData] = useState(INITIAL_FORM)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setSubmitState('loading')

    try {
      // Disparar Meta Lead Event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: formData.interest,
          content_category: 'CaribbeanBiz Plan',
        })
      }

      // Enviar a Notion via API route
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitState('success')
      } else {
        setSubmitState('error')
      }
    } catch {
      setSubmitState('error')
    }
  }, [formData])

  if (submitState === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal px-6">
        <div className="noise-bg" aria-hidden="true" />
        <div className="text-center max-w-md relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 text-5xl">✅</div>
          <h2 className="text-3xl font-display font-bold text-cream mb-3">¡Solicitud recibida!</h2>
          <p className="text-cream/60 mb-6">Nos pondremos en contacto contigo en menos de 24 horas.</p>
          <a href="/" className="text-burgundy hover:underline text-sm">← Volver al inicio</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal px-6 py-16">
      <div className="noise-bg" aria-hidden="true" />
      <div className="max-w-xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <a href="/" className="w-14 h-14 mx-auto mb-5 block">
            <LogoSVG />
          </a>
          <h1 className="text-3xl font-display font-bold text-cream mb-2">
            Empieza con <span className="text-burgundy">CaribbeanBiz</span>
          </h1>
          <p className="text-cream/50">Cuéntanos sobre tu negocio y te contactamos en 24 horas.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 glass-panel rounded-3xl p-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nombre</label>
              <input type="text" name="firstName" required value={formData.firstName}
                onChange={handleChange} className={inputClass} placeholder="Juan" />
            </div>
            <div>
              <label className={labelClass}>Apellido</label>
              <input type="text" name="lastName" required value={formData.lastName}
                onChange={handleChange} className={inputClass} placeholder="Pérez" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" required value={formData.email}
              onChange={handleChange} className={inputClass} placeholder="juan@empresa.com" />
          </div>

          <div>
            <label className={labelClass}>Teléfono / WhatsApp</label>
            <input type="tel" name="phone" value={formData.phone}
              onChange={handleChange} className={inputClass} placeholder="+1 809 000 0000" />
          </div>

          <div>
            <label className={labelClass}>Empresa</label>
            <input type="text" name="company" value={formData.company}
              onChange={handleChange} className={inputClass} placeholder="Nombre de tu empresa" />
          </div>

          <div>
            <label className={labelClass}>¿Qué estás buscando?</label>
            <select name="interest" value={formData.interest} onChange={handleChange} className={inputClass}>
              <option value="">Selecciona una opción...</option>
              {INTEREST_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Cuéntanos sobre tu negocio</label>
            <textarea name="message" rows={3} value={formData.message}
              onChange={handleChange} className={inputClass}
              placeholder="Industria, tamaño, mayor problema operacional..." />
          </div>

          <button type="submit" disabled={submitState === 'loading'}
            className="w-full py-4 rounded-xl bg-burgundy text-cream font-semibold hover:bg-burgundy/80 transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
            {submitState === 'loading' ? (
              <><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg> Enviando...</>
            ) : submitState === 'error' ? '❌ Error — intenta de nuevo' : 'Solicitar información →'}
          </button>
        </form>
      </div>
    </div>
  )
}
