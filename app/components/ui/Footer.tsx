import React from 'react'

import { motion } from 'framer-motion'
const Footer = () => {
  return (
    <footer className="border-t-2 border-black/10 py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-5 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold mb-6 flex items-center gap-2">
                <span className="text-4xl">📄</span>
                DocFeel
              </div>
              <p className="text-neutral-600 mb-8 max-w-sm">
                AI-powered document analysis that helps you understand and interact with your content instantly.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Use Cases", "API"]
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security"]
              }
            ].map((col, i) => (
              <div key={i}>
                <h3 className="font-bold mb-6 text-sm uppercase tracking-wider">{col.title}</h3>
                <ul className="space-y-4 text-neutral-600">
                  {col.links.map((link) => (
                    <motion.li key={link} whileHover={{ x: 5 }}>
                      <a href="#" className="hover:text-black transition-colors">{link}</a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-black/10 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-600 text-sm">© 2024 DocFeel. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <motion.a 
                  key={social}
                  href="#" 
                  className="text-neutral-600 hover:text-black transition-colors text-sm"
                  whileHover={{ y: -2 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
