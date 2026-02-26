/**
 * LogoSVG — renders the correct CaribbeanBiz logo based on context.
 *
 * Variants:
 *   "icon-dark"   — icon only, crema on guinda bg (favicon / dark surfaces)  → logo-06.jpg
 *   "icon-light"  — icon only, guinda on white/transparent                   → logo-03.png
 *   "full-dark"   — icon + text, crema version (for dark/guinda backgrounds) → logo-02.png
 *   "full-light"  — icon + text, guinda on white (for light backgrounds)     → logo-01.png
 */
const LOGOS = {
  'icon-dark':  '/assets/logo-06.jpg',
  'icon-light': '/assets/logo-03.png',
  'full-dark':  '/assets/logo-02.png',
  'full-light': '/assets/logo-01.png',
}

export default function LogoSVG({ className = 'w-full h-full', variant = 'icon-dark' }) {
  return (
    <img
      src={LOGOS[variant] || LOGOS['icon-dark']}
      alt="CaribbeanBiz"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
