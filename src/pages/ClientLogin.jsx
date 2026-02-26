import { SignIn } from '@clerk/clerk-react'
import { useTheme } from '../hooks/useTheme'
import LogoSVG from '../components/ui/LogoSVG'

export default function Login() {
  const { dark, toggle, isAuto } = useTheme()

  const clerkAppearance = {
    variables: {
      colorPrimary:         '#8B0023',
      colorBackground:      dark ? '#111111' : '#ffffff',
      colorText:            dark ? '#f5f0e8' : '#1a1a1a',
      colorTextSecondary:   dark ? 'rgba(245,240,232,0.5)' : 'rgba(26,26,26,0.55)',
      colorInputBackground: dark ? '#0a0a0a' : '#f5f0e8',
      colorInputText:       dark ? '#f5f0e8' : '#1a1a1a',
      borderRadius:         '10px',
      fontFamily:           'Outfit, sans-serif',
    },
    elements: {
      card:                       dark
        ? 'border border-white/10 shadow-2xl'
        : 'border border-black/8 shadow-xl',
      headerTitle:                'hidden',
      headerSubtitle:             'hidden',
      socialButtonsBlockButton:   dark
        ? 'border border-white/10 hover:bg-white/5'
        : 'border border-black/10 hover:bg-black/5',
      formButtonPrimary: 'bg-[#8B0023] hover:bg-[#6B001B] font-semibold',
      footerActionLink:  'text-[#8B0023] hover:text-[#6B001B]',
    },
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 transition-colors duration-500"
      style={{ background: 'var(--portal-bg)', color: 'var(--portal-text)' }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center space-x-3 mb-10 group">
        <div className="w-10 h-10">
          <LogoSVG className="w-full h-full" />
        </div>
        <span className="text-2xl font-display font-bold" style={{ color: 'var(--portal-text)' }}>
          Caribbean<span className="text-burgundy">Biz</span>
        </span>
      </a>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold mb-2" style={{ color: 'var(--portal-text)' }}>
            Client Portal
          </h1>
          <p className="text-sm" style={{ color: 'var(--portal-text-muted)' }}>
            Sign in to view your subscription and agents
          </p>
        </div>

        <SignIn
          routing="path"
          path="/client-login"
          afterSignInUrl="/portal"
          signUpUrl="/login"
          appearance={clerkAppearance}
        />
      </div>

      {/* Theme toggle */}
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={toggle}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border"
          style={{
            background: 'var(--portal-surface)',
            border: '1px solid var(--portal-border)',
            color: 'var(--portal-text-muted)',
          }}
        >
          <span>{dark ? '🌙' : '☀️'}</span>
          <span>{dark ? 'Dark mode' : 'Light mode'}</span>
          {!isAuto && (
            <span className="text-burgundy font-semibold">· manual</span>
          )}
        </button>
      </div>
      <p className="mt-3 text-xs" style={{ color: 'var(--portal-text-dim)' }}>
        © 2026 CaribbeanBiz · Santo Domingo, DR
      </p>
    </div>
  )
}
