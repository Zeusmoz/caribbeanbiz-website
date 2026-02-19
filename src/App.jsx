import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pipeline from './pages/Pipeline'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pipeline" element={
        <ProtectedRoute>
          <Pipeline />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
