import { useState } from "react";
import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowITWorks'
import Testimonials from '../components/landing/Testimonials'
import CTA from '../components/landing/CTA'
import Footer from '../components/layout/Footer'
import AuthOverlay from '../components/auth/AuthOverlay'

function Landing() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <Navbar openAuth={() => setShowAuth(true)} />

      {showAuth && <AuthOverlay onClose={() => setShowAuth(false)} />}

      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Landing;
