/**
 * useTheme — dark/light based on hour, with manual override persisted in localStorage.
 * Auto: Dark 18:00–06:59 | Light 07:00–17:59
 * Manual override: stored in localStorage key 'cb-theme' = 'dark' | 'light' | null (auto)
 */
import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'cb-theme'

function isDarkHour() {
  const h = new Date().getHours()
  return h >= 18 || h < 7
}

function resolveTheme(override) {
  if (override === 'dark') return true
  if (override === 'light') return false
  return isDarkHour()
}

export function useTheme() {
  const [override, setOverride] = useState(() => localStorage.getItem(STORAGE_KEY))
  const [dark, setDark] = useState(() => resolveTheme(localStorage.getItem(STORAGE_KEY)))

  const apply = useCallback((d) => {
    document.documentElement.classList.toggle('dark', d)
    document.documentElement.classList.toggle('light', !d)
    setDark(d)
  }, [])

  // Apply on mount and when override changes
  useEffect(() => {
    apply(resolveTheme(override))
  }, [override, apply])

  // Auto re-check every minute (only matters when no manual override)
  useEffect(() => {
    const id = setInterval(() => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) apply(isDarkHour())
    }, 60_000)
    return () => clearInterval(id)
  }, [apply])

  const toggle = useCallback(() => {
    const next = dark ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    setOverride(next)
  }, [dark])

  const resetToAuto = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setOverride(null)
  }, [])

  // isAuto: true when following the hour schedule
  const isAuto = override === null || override === undefined || override === ''

  return { dark, toggle, resetToAuto, isAuto }
}
