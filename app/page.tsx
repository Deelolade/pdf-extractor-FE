"use client"
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { FcDocument } from 'react-icons/fc'
import { Sparkles } from 'lucide-react'
import Navbar from './components/ui/Navbar'
import HeroSection from './components/ui/HeroSection'
import CTASection from './components/ui/CTASection'
import Footer from './components/ui/Footer'

const Page = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
 
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const features = [
    {
      icon: "✨",
      title: "Smart Summarization",
      description: "Upload any document and get instant, intelligent summaries. Our AI understands context and extracts key insights automatically.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "💬",
      title: "Interactive Chat",
      description: "Ask questions about your documents in natural language. Get precise answers with references to source material.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "📁",
      title: "Multi-Format Support",
      description: "Works with PDFs, Word docs, text files, and more. DocFeel handles all your document formats seamlessly.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "⚡",
      title: "Instant Analysis",
      description: "Lightning-fast processing powered by advanced AI. Get comprehensive insights in seconds, not hours.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "🔄",
      title: "Regenerate & Refine",
      description: "Not satisfied with the summary? Regenerate with different focus points or ask for more specific details.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your documents are encrypted and private. We never share or train models on your confidential data.",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

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

      {/* Navigation */}
      <Navbar scrolled={scrolled}/>

      {/* Hero Section */}
      <HeroSection scaleProgress={scaleProgress} opacityProgress={opacityProgress}/>

      {/* Marquee */}
      <div className="py-12 border-y-2 border-black overflow-hidden bg-black text-white">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-2xl font-bold mx-8">ANALYZE</span>
              <span className="text-2xl mx-8">•</span>
              <span className="text-2xl font-bold mx-8">SUMMARIZE</span>
              <span className="text-2xl mx-8">•</span>
              <span className="text-2xl font-bold mx-8">INTERACT</span>
              <span className="text-2xl mx-8">•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-40 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection className="mb-24">
            <h2 className="text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Powerful features for
              <br />
              <span className="italic font-light bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                smart analysis
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl">
              Everything you need to understand and interact with your documents
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ 
                  scale: 1.03,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="relative overflow-hidden bg-white border-2 border-black/10 p-10 rounded-3xl cursor-pointer group"
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                <motion.div 
                  className="text-6xl mb-6"
                  animate={hoveredCard === index ? { 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon/>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-40 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              See it in
              <br />
              <span className="italic font-light">action</span>
            </h2>
            <p className="text-xl text-neutral-600">Upload a document and watch the magic happen</p>
          </AnimatedSection>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="bg-white border-2 border-black/10 rounded-3xl p-12 shadow-2xl"
              whileHover={{ boxShadow: "0 30px 60px rgba(0,0,0,0.15)" }}
            >
              <motion.div 
                className="border-2 border-dashed border-neutral-300 rounded-2xl p-32 text-center group cursor-pointer"
                whileHover={{ 
                  borderColor: "#000",
                  backgroundColor: "#fafafa"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-8xl mb-6"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  
                </motion.div>
                <div className="text-2xl font-bold mb-2">Drop your document here</div>
                <div className="text-neutral-600 mb-6">or click to browse</div>
                <div className="text-sm text-neutral-500">Supports PDF, DOC, DOCX, TXT and more</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection/>
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Page