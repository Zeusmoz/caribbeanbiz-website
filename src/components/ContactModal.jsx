import { useState, useEffect, useCallback } from 'react'
import LogoSVG from './ui/LogoSVG'
import { useTranslation } from '../contexts/LanguageContext'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  interest: '',
  message: '',
}

export default function ContactModal({ isOpen, onClose }) {
  const { t: tr } = useTranslation()
  const [isAnimated, setIsAnimated] = useState(false)
  const [submitState, setSubmitState] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [formData, setFormData] = useState(INITIAL_FORM)

  // Trigger enter animation after mount
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setIsAnimated(true), 10)
      return () => clearTimeout(t)
    } else {
      setIsAnimated(false)
    }
  }, [isOpen])

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setSubmitState('loading')
    try {
      const res = await fetch('https://formspree.io/f/xqedbvvk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitState('success')
        setTimeout(() => {
          onClose()
          setSubmitState('idle')
          setFormData(INITIAL_FORM)
        }, 1500)
      } else {
        setSubmitState('error')
      }
    } catch {
      setSubmitState('error')
    }
  }, [formData, onClose])

  if (!isOpen) return null

  const inputClass = 'w-full bg-charcoal/50 border border-cream/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-burgundy transition-colors'
  const labelClass = 'block text-sm font-medium text-cream/80 mb-1'

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`glass-panel rounded-3xl p-8 max-w-lg w-full relative transform transition-all duration-300 ${
            isAnimated ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cream/60 hover:text-cream transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <LogoSVG />
            </div>
            <h3 className="text-2xl font-display font-bold text-cream mb-2">{tr.modal.title}</h3>
            <p className="text-cream/60">{tr.modal.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{tr.modal.firstName}</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="John"
                />
              </div>
              <div>
                <label className={labelClass}>{tr.modal.lastName}</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{tr.modal.email}</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className={labelClass}>{tr.modal.company}</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={inputClass}
                placeholder="Company Name"
              />
            </div>

            <div>
              <label className={labelClass}>{tr.modal.interest}</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">{tr.modal.selectOption}</option>
                {tr.modal.interests.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>{tr.modal.message}</label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className={inputClass}
                placeholder={tr.modal.messagePlaceholder}
              />
            </div>

            <button
              type="submit"
              disabled={submitState === 'loading' || submitState === 'success'}
              className="w-full py-4 rounded-lg bg-burgundy text-cream font-semibold hover:bg-burgundy-light transition-colors flex items-center justify-center space-x-2 disabled:opacity-80"
            >
              <span>
                {submitState === 'idle'    && tr.modal.submit}
                {submitState === 'loading' && tr.modal.sending}
                {submitState === 'success' && tr.modal.success}
                {submitState === 'error'   && tr.modal.error}
              </span>
              {submitState === 'loading' && (
                <svg className="animate-spin h-5 w-5 text-cream" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
