import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pipeline from './pages/Pipeline'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pipeline" element={<Pipeline />} />
    </Routes>
  )
}
