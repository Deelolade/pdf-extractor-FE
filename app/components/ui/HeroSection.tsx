import React, { useRef } from 'react'
import { motion, MotionValue } from 'framer-motion'
import Link from 'next/link'

type HeroSectionType={
    opacityProgress: MotionValue<number>;
    scaleProgress: MotionValue<number>,
}
const HeroSection = ({opacityProgress,scaleProgress } : HeroSectionType) => {
    const heroRef = useRef(null)
  return (
    <section ref={heroRef} className="pt-40 pb-32 px-6 lg:px-12 relative min-h-screen flex items-center">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-linear-to-br from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-linear-to-br from-pink-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10 w-full">
          <motion.div 
            className="text-center max-w-5xl mx-auto mb-20"
            style={{ scale: scaleProgress, opacity: opacityProgress }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-black text-white rounded-full px-6 py-3 mb-12"
            >
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium">🚀 AI-Powered Document Analysis</span>
            </motion.div>
            
            <motion.h1 
              className="text-7xl lg:text-[140px] font-bold mb-10 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Documents,
              <br />
              <motion.span 
                className="italic font-light bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Understood
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-neutral-600 mb-16 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Upload any document and let AI do the heavy lifting. Get instant summaries, 
              ask questions, and interact with your content like never before.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup" className="px-12 py-5 bg-black text-white font-medium rounded-full text-base shadow-xl hover:shadow-2xl transition-shadow">
                  Start Analyzing Free
                </Link>
              </motion.div>
              <motion.button 
                className="px-12 py-5 border-2 border-black text-black font-medium rounded-full flex items-center gap-3 text-base group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Watch Demo</span>
                <motion.svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </motion.svg>
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex items-center justify-center gap-16 mt-20 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {[
                { value: "10x", label: "Faster Analysis" },
                { value: "99.9%", label: "Accuracy" },
                { value: "50K+", label: "Documents" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="text-5xl font-bold mb-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-neutral-500 uppercase tracking-wider text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            className="relative mt-32"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div 
              className="relative overflow-hidden rounded-3xl border-2 border-black/10 shadow-2xl"
              whileHover={{ scale: 1.02, rotateX: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&h=900&fit=crop&q=90" 
                alt="DocFeel interface"
                className="w-full"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 to-purple-500/10"></div>
            </motion.div>
            
            {/* Floating Stats */}
            <motion.div 
              className="absolute -bottom-8 left-10 bg-white border-2 border-black p-6 rounded-2xl shadow-xl hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">✨</span>
                <div className="text-3xl font-bold">AI</div>
              </div>
              <div className="text-sm text-neutral-600">Powered Analysis</div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-8 right-10 bg-white border-2 border-black p-6 rounded-2xl shadow-xl hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">⚡</span>
                <div className="text-3xl font-bold">Instant</div>
              </div>
              <div className="text-sm text-neutral-600">Results</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
  )
}

export default HeroSection
