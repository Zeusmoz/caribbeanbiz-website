import { useRef, useState, useEffect } from 'react'

export function useCounter(target, duration = 2000) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          observer.unobserve(el)

          const start = performance.now()
          const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            setValue(Math.floor(easeOutQuart(progress) * target))
            if (progress < 1) requestAnimationFrame(tick)
            else setValue(target)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, value }
}
