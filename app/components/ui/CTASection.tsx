import React from 'react'
import { motion } from "framer-motion"
import Link from 'next/link'
const CTASection = () => {
  return (
    <section className="py-40 px-6 lg:px-12 bg-black text-white relative overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl lg:text-8xl font-bold mb-8 tracking-tight">
              Start analyzing
              <br />
              <span className="italic font-light">smarter today</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-16 max-w-2xl mx-auto">
              Join thousands of professionals who trust DocFeel to understand their documents better
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup" className="px-12 py-6 bg-white text-black font-medium rounded-full text-lg inline-block">
                  Get Started Free
                </Link>
              </motion.div>
              <motion.button 
                className="px-12 py-6 border-2 border-white text-white font-medium rounded-full text-lg"
                whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
            <p className="text-neutral-500 mt-10">No credit card required • Free forever plan available</p>
          </motion.div>
        </div>
      </section>

  )
}

export default CTASection
