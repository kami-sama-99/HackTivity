'use client'

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import Outshine from './components/Outshine';
import Footer from './components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0A041C]">
      <Header/>
      <HeroSection/>
      <HowItWorks/>
      <Outshine/>
      <Footer/>   
    </div>
  )
}

