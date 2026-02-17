import { useCounter } from '../hooks/useCounter'

export default function StatCounter({ target, label, suffix = '' }) {
  const { ref, value } = useCounter(target)

  return (
    <div className="text-center">
      <div
        ref={ref}
        className="text-3xl md:text-4xl font-display font-bold text-burgundy counter-value"
      >
        {value}{suffix}
      </div>
      <div className="text-sm text-cream/50 mt-2 uppercase tracking-wider">{label}</div>
    </div>
  )
}
