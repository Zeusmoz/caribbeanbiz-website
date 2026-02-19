import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession } from '../utils/auth'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/auth', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed'); setLoading(false); return }
      saveSession(data.token, { email: data.email, name: data.name })
      navigate('/pipeline')
    } catch {
      setError('Connection error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:'100%', maxWidth:380 }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <img src="/assets/CaribbeanBiz%20Logo-07.jpg" alt="CaribbeanBiz" style={{ height:60, borderRadius:8 }} />
        </div>
        <div style={{ background:'#fff', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.3)', padding:32 }}>
          <h1 style={{ fontSize:20, fontWeight:700, color:'#1e293b', marginBottom:4, textAlign:'center' }}>Sign in</h1>
          <p style={{ fontSize:13, color:'#94a3b8', marginBottom:24, textAlign:'center' }}>Pipeline access</p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:13, fontWeight:500, color:'#374151', marginBottom:6 }}>Email</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="you@caribbeanbiz.com"
                style={{ width:'100%', padding:'10px 12px', border:'1px solid #d1d5db', borderRadius:8, fontSize:14, boxSizing:'border-box' }} />
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:13, fontWeight:500, color:'#374151', marginBottom:6 }}>Password</label>
              <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="........"
                style={{ width:'100%', padding:'10px 12px', border:'1px solid #d1d5db', borderRadius:8, fontSize:14, boxSizing:'border-box' }} />
            </div>
            {error && (
              <div style={{ background:'#fef2f2', border:'1px solid #fca5a5', color:'#dc2626', borderRadius:8, padding:'10px 12px', fontSize:13, marginBottom:16 }}>
                {error}
              </div>
            )}
            <button type="submit" disabled={loading}
              style={{ width:'100%', padding:'11px', background:'#dc2626', color:'#fff', border:'none', borderRadius:8, fontSize:15, fontWeight:600, cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1 }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        <p style={{ textAlign:'center', fontSize:12, color:'#475569', marginTop:16 }}>CaribbeanBiz Internal</p>
      </div>
    </div>
  )
}
