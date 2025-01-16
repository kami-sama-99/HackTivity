'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Linkedin, Facebook } from 'lucide-react'
import logo from "@/app/public/logo/HackTivity logo.png"
import coderImg from "@/app/public/images/coding guy.png"
import reportImg from "@/app/public/images/performance report.png"

export default function Page() {
  const { scrollY } = useScroll()
  
  // Slide in animations for sections
  const worksImageX = useTransform(scrollY, [300, 600], [-100, 0])
  const worksTextX = useTransform(scrollY, [300, 600], [100, 0])
  const worksOpacity = useTransform(scrollY, [300, 600], [0, 1])
  
  const outshineImageX = useTransform(scrollY, [600, 900], [100, 0])
  const outshineTextX = useTransform(scrollY, [600, 900], [-100, 0])
  const outshineOpacity = useTransform(scrollY, [600, 900], [0, 1])

  return (
    <div className="min-h-screen bg-[#0A041C]">
      {/* Hero Section - No animation */}
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Image 
            src={logo.src}
            alt="Logo"
            width={40}
            height={40}
            className='rounded-100'
          />
          <span className="text-white text-xl font-bold">HackTivity</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-white hover:text-green-400">Login</Link>
          <Link href="/signup" className="text-white hover:text-green-400">Sign up</Link>
        </div>
      </nav>

      <section className="flex items-center justify-between p-8 md:p-16 bg-[#FFE5E5]">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            You Hack It
            <br />
            We'll Track It
          </h1>
          <p className="text-lg mb-6 text-gray-900">
            A platform where coders can track what they code and keep up with their peers
          </p>
          <button className="relative px-8 py-3 text-white font-medium bg-black rounded-full overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-green-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
        <div className="hidden md:block">
          <div className="w-72 h-72 bg-green-400 rounded-full flex items-center justify-center">
            <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-green-400 text-4xl">&lt;/&gt;</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section - with slide animation */}
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8 overflow-hidden">
        <motion.div
          style={{ x: worksImageX, opacity: worksOpacity }}
          className="w-full md:w-1/2"
        >
          <Image 
            src={coderImg.src}
            alt="How it works illustration"
            width={400}
            height={400}
            className="rounded-lg w-100"
          />
        </motion.div>
        <motion.div 
          style={{ x: worksTextX, opacity: worksOpacity }}
          className="w-full md:w-1/2 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">How it works?</h2>
          <p className="text-lg">
            All you need to do is sign up create a profile and just sit back and relax, 
            let us help you have your dream coding career
          </p>
        </motion.div>
      </section>

      {/* Outshine section - with slide animation */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between p-8 md:p-16 gap-16 overflow-hidden">
        <motion.div
          style={{ x: outshineImageX, opacity: outshineOpacity }}
          className="w-full md:w-1/2"
        >
          <Image 
            src={reportImg.src}
            alt="Analytics illustration"
            width={400}
            height={400}
            className="rounded-lg "
          />
        </motion.div>
        <motion.div 
          style={{ x: outshineTextX, opacity: outshineOpacity }}
          className="w-full md:w-1/2 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Outshine Your Peers!</h2>
          <p className="text-lg">
            We give detailed performance reports that help you track your progress 
            and see what your peers are doing
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A041C] text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About HackTivity</h3>
              <p className="text-gray-400">
                Track your coding journey and connect with fellow developers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/about" className="text-gray-400 hover:text-green-400">About Us</Link>
                <Link href="/contact" className="text-gray-400 hover:text-green-400">Contact Us</Link>
                <Link href="/privacy" className="text-gray-400 hover:text-green-400">Privacy Policy</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-green-400">
                  <Github className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-green-400">
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-green-400">
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-green-400">
                  <Facebook className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HackTivity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

