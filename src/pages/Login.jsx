import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSession } from '../utils/auth';

export default function Login() {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');
    const [loading, setLoading]   = useState(false);
    const navigate = useNavigate();
  
    async function handleSubmit(e) {
          e.preventDefault();
          setError('');
          setLoading(true);
          try {
                  const res  = await fetch('/api/auth', {
                            method:  'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body:    JSON.stringify({ email, password }),
                  });
                  const data = await res.json();
                  if (!res.ok) { setError(data.error || 'Login failed'); setLoading(false); return; }
                  saveSession(data.token, { email: data.email, name: data.name });
                  navigate('/pipeline');
          } catch {
                  setError('Connection error. Please try again.');
                  setLoading(false);
          }
    }
  
    return (
          <div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:"'Inter',sans-serif" }}>
                  <div style={{ width:'100%', maxWidth:380 }}>
                            <div style={{ display:'flex', justifyContent:'center', marginBottom:32 }}>
                                        <img src="/assets/CaribbeanBiz%20Logo-07.jpg" alt="CaribbeanBiz" style={{ height:48, objectFit:'contain' }} />
                            </div>div>
                            <div style={{ background:'#fff', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.3)', padding:32 }}>
                                        <h1 style={{ fontSize:20, fontWeight:700, color:'#1e293b', marginBottom:4 }}>Pipeline Login</h1>h1>
                                        <p style={{ fontSize:13, color:'#94a3b8', marginBottom:24 }}>Sign in to access the client pipeline</p>p>
                                        <form onSubmit={handleSubmit}>
                                                      <div style={{ marginBottom:16 }}>
                                                                      <label style={{ display:'block', fontSize:13, fontWeight:500, color:'#475569', marginBottom:6 }}>Email</label>label>
                                                                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                                                                        placeholder="you@caribbeanbiz.com"
                                                                                        style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:8, padding:'10px 12px', fontSize:13, outline:'none', boxSizing:'border-box' }} />
                                                      </div>div>
                                                      <div style={{ marginBottom:20 }}>
                                                                      <label style={{ display:'block', fontSize:13, fontWeight:500, color:'#475569', marginBottom:6 }}>Password</label>label>
                                                                      <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                                                                        placeholder="••••••••"
                                                                                        style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:8, padding:'10px 12px', fontSize:13, outline:'none', boxSizing:'border-box' }} />
                                                      </div>div>
                                          {error && (
                          <div style={{ background:'#fef2f2', border:'1px solid #fca5a5', color:'#dc2626', borderRadius:8, padding:'10px 12px', fontSize:13, marginBottom:16 }}>
                            {error}
                          </div>div>
                                                      )}
                                                      <button type="submit" disabled={loading}
                                                                      style={{ width:'100%', background: loading ? '#94a3b8' : '#c41e3a', color:'#fff', border:'none', borderRadius:8, padding:'11px', fontSize:14, fontWeight:600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily:"'Inter',sans-serif" }}>
                                                        {loading ? 'Signing in…' : 'Sign in'}
                                                      </button>button>
                                        </form>form>
                            </div>div>
                            <p style={{ textAlign:'center', fontSize:12, color:'#475569', marginTop:20 }}>CaribbeanBiz — Internal use only</p>p>
                  </div>div>
          </div>div>
        );
}Add login + protected route
