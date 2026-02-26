import { useEffect, useState } from 'react'
import { useUser, useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import {
  getClientByEmail, getAgentesByCliente, getSuscripcionesByCliente, getTokensByCliente,
  getText, getSelect, getNumber, getDate, getCheckbox
} from '../lib/notion'
import { useTheme } from '../hooks/useTheme'
import LogoSVG from '../components/ui/LogoSVG'

// ─── Status badge ───────────────────────────────────────────
function Badge({ status }) {
  const colors = {
    'Activo':           'bg-green-500/15 text-green-400 border-green-500/30',
    'Pagado':           'bg-green-500/15 text-green-400 border-green-500/30',
    'En configuración': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    'Pendiente':        'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    'Pausado':          'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    'Atrasado':         'bg-red-500/15 text-red-400 border-red-500/30',
    'Cancelado':        'bg-black/10 border-black/10',
  }
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colors[status] || 'bg-black/10 border-black/10'}`}
      style={{ color: colors[status] ? undefined : 'var(--portal-text-muted)' }}>
      {status || '—'}
    </span>
  )
}

// ─── Plan badge ─────────────────────────────────────────────
function PlanBadge({ plan }) {
  const colors = {
    'Starter': 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30',
    'Growth':  'bg-orange-500/15 text-orange-500 border-orange-500/30',
    'Scale':   'bg-red-500/15 text-red-500 border-red-500/30',
  }
  return (
    <span className={`text-sm font-bold px-3 py-1 rounded-full border ${colors[plan] || 'bg-black/10 border-black/10'}`}
      style={{ color: colors[plan] ? undefined : 'var(--portal-text-muted)' }}>
      {plan || '—'}
    </span>
  )
}

// ─── Section wrapper ────────────────────────────────────────
function Section({ title, icon, children }) {
  return (
    <div className="rounded-2xl p-6 transition-colors duration-500"
      style={{ background: 'var(--portal-surface)', border: '1px solid var(--portal-border)' }}>
      <h2 className="text-lg font-display font-bold mb-5 flex items-center gap-2"
        style={{ color: 'var(--portal-text)' }}>
        <span className="text-burgundy">{icon}</span> {title}
      </h2>
      {children}
    </div>
  )
}

export default function Portal() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  const { dark, toggle, isAuto } = useTheme()

  const [cliente, setCliente]               = useState(null)
  const [agentes, setAgentes]               = useState([])
  const [suscripciones, setSuscripciones]   = useState([])
  const [tokens, setTokens]                 = useState([])
  const [loading, setLoading]               = useState(true)
  const [notFound, setNotFound]             = useState(false)

  useEffect(() => {
    if (!isLoaded) return
    if (!user) { navigate('/login'); return }

    async function load() {
      try {
        const email = user.primaryEmailAddress?.emailAddress
        const c = await getClientByEmail(email)
        if (!c) { setNotFound(true); setLoading(false); return }

        setCliente(c)
        const nombre = getText(c.properties['Nombre'])
        const [ag, sus, tok] = await Promise.all([
          getAgentesByCliente(nombre),
          getSuscripcionesByCliente(nombre),
          getTokensByCliente(nombre),
        ])
        setAgentes(ag)
        setSuscripciones(sus)
        setTokens(tok)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isLoaded, user])

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500"
        style={{ background: 'var(--portal-bg)' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-burgundy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm" style={{ color: 'var(--portal-text-dim)' }}>Loading your portal...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 transition-colors duration-500"
        style={{ background: 'var(--portal-bg)' }}>
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-2xl font-display font-bold mb-2" style={{ color: 'var(--portal-text)' }}>
            No account found
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--portal-text-muted)' }}>
            Your email is not linked to a CaribbeanBiz subscription. Contact us to get started.
          </p>
          <a
            href="https://caribbeanbiz.com"
            className="px-6 py-3 bg-burgundy text-white rounded-full text-sm font-semibold hover:bg-burgundy/80 transition-colors"
          >
            Back to CaribbeanBiz
          </a>
        </div>
      </div>
    )
  }

  const props = cliente?.properties || {}
  const nombre        = getText(props['Nombre'])
  const empresa       = getText(props['Empresa'])
  const plan          = getSelect(props['Plan'])
  const estado        = getSelect(props['Estado'])
  const monto         = getNumber(props['Monto mensual (RD$)'])
  const setupPagado   = getCheckbox(props['Setup pagado'])
  const fechaInicio   = getDate(props['Fecha inicio'])
  const proximoCobro  = getDate(props['Próximo cobro'])

  // Token totals current month
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  const thisMonthTokens = tokens.filter(t => getText(t.properties['Mes'])?.includes(new Date().getFullYear()))
  const totalTokens = thisMonthTokens.reduce((a, t) => a + getNumber(t.properties['Tokens consumidos']), 0)

  return (
    <div className="min-h-screen transition-colors duration-500"
      style={{ background: 'var(--portal-bg)', color: 'var(--portal-text)' }}>

      {/* Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-md transition-colors duration-500"
        style={{ background: 'var(--portal-nav-bg)', borderBottom: '1px solid var(--portal-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8"><LogoSVG className="w-full h-full" /></div>
            <span className="text-lg font-display font-bold" style={{ color: 'var(--portal-text)' }}>
              Caribbean<span className="text-burgundy">Biz</span>
            </span>
            <span className="ml-2 text-xs hidden sm:block" style={{ color: 'var(--portal-text-dim)' }}>
              / Client Portal
            </span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:block" style={{ color: 'var(--portal-text-muted)' }}>
              {user?.primaryEmailAddress?.emailAddress}
            </span>
            <button
              onClick={toggle}
              title={isAuto ? 'Auto (by hour) — click to override' : 'Manual override — click to toggle'}
              className="text-lg hidden sm:block transition-transform hover:scale-110 active:scale-95"
              style={{ lineHeight: 1 }}
            >
              {dark ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => signOut(() => navigate('/'))}
              className="text-sm hover:text-burgundy transition-colors"
              style={{ color: 'var(--portal-text-dim)' }}
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm mb-1" style={{ color: 'var(--portal-text-dim)' }}>Welcome back</p>
          <h1 className="text-3xl font-display font-bold" style={{ color: 'var(--portal-text)' }}>{nombre}</h1>
          {empresa !== '—' && <p className="mt-1" style={{ color: 'var(--portal-text-muted)' }}>{empresa}</p>}
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Plan',        value: <PlanBadge plan={plan} /> },
            { label: 'Status',      value: <Badge status={estado} /> },
            { label: 'Monthly fee', value: `RD$ ${monto.toLocaleString()}` },
            { label: 'Next billing',value: proximoCobro ? new Date(proximoCobro).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl p-4 transition-colors duration-500"
              style={{ background: 'var(--portal-surface)', border: '1px solid var(--portal-border)' }}>
              <p className="text-xs mb-2" style={{ color: 'var(--portal-text-dim)' }}>{label}</p>
              <div className="text-sm font-semibold" style={{ color: 'var(--portal-text)' }}>{value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT col */}
          <div className="lg:col-span-2 space-y-6">

            {/* Agents */}
            <Section title="Your Agents" icon="🤖">
              {agentes.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--portal-text-dim)' }}>No agents configured yet.</p>
              ) : (
                <div className="space-y-3">
                  {agentes.map((ag) => {
                    const p = ag.properties
                    return (
                      <div key={ag.id} className="flex items-start justify-between p-4 rounded-xl transition-colors duration-500"
                        style={{ background: 'var(--portal-surface2)', border: '1px solid var(--portal-border2)' }}>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: 'var(--portal-text)' }}>
                            {getText(p['Nombre del agente'])}
                          </p>
                          <p className="text-xs mt-1" style={{ color: 'var(--portal-text-muted)' }}>
                            {getText(p['Descripción'])}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs" style={{ color: 'var(--portal-text-dim)' }}>
                              {getSelect(p['Canal'])}
                            </span>
                            {getDate(p['Fecha despliegue']) && (
                              <span className="text-xs" style={{ color: 'var(--portal-text-dim)' }}>
                                · Since {new Date(getDate(p['Fecha despliegue'])).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge status={getSelect(p['Estado'])} />
                      </div>
                    )
                  })}
                </div>
              )}
            </Section>

            {/* Payment history */}
            <Section title="Payment History" icon="💳">
              {suscripciones.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--portal-text-dim)' }}>No payments recorded yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs" style={{ borderBottom: '1px solid var(--portal-border)', color: 'var(--portal-text-dim)' }}>
                        <th className="text-left pb-3 font-medium">Date</th>
                        <th className="text-left pb-3 font-medium">Type</th>
                        <th className="text-left pb-3 font-medium">Amount</th>
                        <th className="text-left pb-3 font-medium">Method</th>
                        <th className="text-left pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suscripciones.map((s) => {
                        const p = s.properties
                        return (
                          <tr key={s.id} style={{ borderBottom: '1px solid var(--portal-border2)', color: 'var(--portal-text-muted)' }}>
                            <td className="py-3 pr-4">
                              {getDate(p['Fecha de cobro'])
                                ? new Date(getDate(p['Fecha de cobro'])).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                : '—'}
                            </td>
                            <td className="py-3 pr-4">{getSelect(p['Tipo'])}</td>
                            <td className="py-3 pr-4 font-semibold" style={{ color: 'var(--portal-text)' }}>
                              RD$ {getNumber(p['Monto (RD$)']).toLocaleString()}
                            </td>
                            <td className="py-3 pr-4">{getSelect(p['Método de pago'])}</td>
                            <td className="py-3"><Badge status={getSelect(p['Estado pago'])} /></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>
          </div>

          {/* RIGHT col */}
          <div className="space-y-6">
            {/* Token usage */}
            <Section title="Token Usage" icon="📊">
              <div className="text-center py-4">
                <p className="text-4xl font-display font-bold" style={{ color: 'var(--portal-text)' }}>
                  {totalTokens.toLocaleString()}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--portal-text-dim)' }}>tokens this period</p>
              </div>
              {tokens.length > 0 && (
                <div className="space-y-2 mt-4">
                  {tokens.slice(0, 5).map((t) => {
                    const p = t.properties
                    return (
                      <div key={t.id} className="flex justify-between text-xs py-2"
                        style={{ borderBottom: '1px solid var(--portal-border2)', color: 'var(--portal-text-muted)' }}>
                        <span>{getText(p['Mes'])}</span>
                        <span>{getNumber(p['Tokens consumidos']).toLocaleString()} tokens</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </Section>

            {/* Subscription info */}
            <Section title="Subscription" icon="📋">
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Plan',    value: plan },
                  { label: 'Started', value: fechaInicio ? new Date(fechaInicio).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—' },
                  { label: 'Setup',   value: setupPagado ? '✅ Paid' : '⏳ Pending' },
                  { label: 'Monthly', value: `RD$ ${monto.toLocaleString()}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2"
                    style={{ borderBottom: '1px solid var(--portal-border2)' }}>
                    <span style={{ color: 'var(--portal-text-muted)' }}>{label}</span>
                    <span className="font-medium" style={{ color: 'var(--portal-text)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Support */}
            <Section title="Support" icon="💬">
              <p className="text-xs mb-4" style={{ color: 'var(--portal-text-muted)' }}>Need help? Reach us directly.</p>
              <a
                href="https://wa.me/17867743478"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-xl bg-green-600/15 border border-green-500/20 text-green-500 text-sm font-semibold hover:bg-green-600/25 transition-colors"
              >
                WhatsApp Support
              </a>
            </Section>
          </div>
        </div>
      </main>
    </div>
  )
}
