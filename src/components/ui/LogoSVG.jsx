export default function LogoSVG({ className = 'w-full h-full', secondOpacity = '0.6' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 80 L50 50 L20 20 L35 20 L65 50 L35 80 Z" fill="#8B0023" />
      <path d="M50 80 L80 50 L50 20 L65 20 L95 50 L65 80 Z" fill="#8B0023" opacity={secondOpacity} />
    </svg>
  )
}
