import { createContext, useContext, useState } from 'react'
import en from '../i18n/en'
import es from '../i18n/es'

const TRANSLATIONS = { en, es }

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
    const isSpanish = languages.some((l) => l?.toLowerCase().startsWith('es'))
    return isSpanish ? 'es' : 'en'
  })

  const t = TRANSLATIONS[lang]
  const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}
