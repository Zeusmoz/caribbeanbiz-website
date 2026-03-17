export default function MethodologyStep({ step, index, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col cursor-pointer group transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Number */}
      <div className={`text-6xl font-display font-bold mb-4 transition-all duration-500 leading-none ${isActive ? 'text-burgundy' : 'text-cream/10 group-hover:text-cream/20'}`}>
        {step.id}
      </div>

      {/* Icon circle */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 ${isActive ? 'bg-burgundy shadow-lg shadow-burgundy/30' : 'bg-cream/5 group-hover:bg-cream/10'}`}>
        <svg className={`w-6 h-6 transition-colors duration-500 ${isActive ? 'text-cream' : 'text-cream/30'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.iconPath} />
        </svg>
      </div>

      {/* Title */}
      <h3 className={`text-base font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-cream' : 'text-cream/40'}`}>
        {step.title}
      </h3>

      {/* Description — only visible when active */}
      <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-cream/50 leading-relaxed">{step.description}</p>
      </div>

      {/* Active indicator bar */}
      <div className={`absolute bottom-0 left-0 h-0.5 bg-burgundy transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`} />
    </div>
  )
}
