import { Routes, Route } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { useTheme } from './hooks/useTheme'
import Home from './pages/Home'
import Pipeline from './pages/Pipeline'
import Login from './pages/Login'
import ClientLogin from './pages/ClientLogin'
import Portal from './pages/Portal'
import Planes from './pages/Planes'
import ProtectedRoute from './components/ProtectedRoute'

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function ClientProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn redirectUrl="/client-login" /></SignedOut>
    </>
  )
}

function AppInner() {
  useTheme() // applies dark/light class to <html> based on hour + manual override
  return (
    <Routes>
      {/* Public */}
      <Route path="/"              element={<Home />} />
      <Route path="/planes"        element={<Planes />} />

      {/* Internal pipeline login (email/password) */}
      <Route path="/login"         element={<Login />} />
      <Route path="/pipeline"      element={
        <ProtectedRoute>
          <Pipeline />
        </ProtectedRoute>
      } />

      {/* Client portal (Clerk auth) */}
      <Route path="/client-login"  element={<ClientLogin />} />
      <Route path="/client-login/*" element={<ClientLogin />} />
      <Route path="/portal"        element={
        <ClientProtectedRoute>
          <Portal />
        </ClientProtectedRoute>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
      <AppInner />
    </ClerkProvider>
  )
}
