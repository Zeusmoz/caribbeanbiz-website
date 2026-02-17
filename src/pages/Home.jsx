import { useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Challenges from '../components/Challenges'
import Methodology from '../components/Methodology'
import Services from '../components/Services'
import Acquisition from '../components/Acquisition'
import WhyCaribbeanBiz from '../components/WhyCaribbeanBiz'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal  = useCallback(() => setIsModalOpen(true),  [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <>
      <div className="noise-bg" aria-hidden="true" />
      <Navbar onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <About />
        <Challenges />
        <Methodology />
        <Services />
        <Acquisition onOpenModal={openModal} />
        <WhyCaribbeanBiz />
        <CTABanner onOpenModal={openModal} />
      </main>
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      <WhatsAppButton />
    </>
  )
}
