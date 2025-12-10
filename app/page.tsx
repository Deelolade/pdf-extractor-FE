"use client"
import Link from 'next/link'
import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { FcDocument } from 'react-icons/fc'
import { Sparkles } from 'lucide-react'
import Navbar from './components/ui/Navbar'
import HeroSection from './components/ui/HeroSection'
import CTASection from './components/ui/CTASection'
import Footer from './components/ui/Footer'
import Marquee from './components/ui/Marquee'
import FeaturesGrid from './components/ui/FeaturesGrid'
import AnimatedSection from './components/ui/AnimationWrapper'
import SeeItInAction from './components/ui/SeeItInAction'



const Page = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="bg-white text-black overflow-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full border-2 border-black pointer-events-none z-50 hidden lg:block mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      <Navbar scrolled={scrolled} />
      <HeroSection scaleProgress={scaleProgress} opacityProgress={opacityProgress} />
      <Marquee />
      <FeaturesGrid hoveredCard={hoveredCard} setHoveredCard={setHoveredCard}/>
      <SeeItInAction/>
      <CTASection />
      <Footer />
    </div>
  )
}

export default Page
