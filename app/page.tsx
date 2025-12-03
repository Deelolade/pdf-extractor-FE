'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white text-black">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-24">
            <div className="text-2xl font-bold tracking-tight">APEX</div>
            
            <div className="hidden md:flex items-center space-x-12 text-sm">
              <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
              <a href="#showcase" className="hover:opacity-60 transition-opacity">Showcase</a>
              <a href="#clients" className="hover:opacity-60 transition-opacity">Clients</a>
            </div>

            <div className="flex items-center space-x-6">
              <Link href="/signin" className="text-sm hover:opacity-60 transition-opacity">
                Sign In
              </Link>
              <Link href="/signup" className="px-7 py-3 bg-black text-white text-sm font-medium hover:bg-black/80 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-5xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 bg-neutral-100 rounded-full px-5 py-2 mb-10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm">Available Now</span>
            </div>
            
            <h1 className="text-7xl lg:text-[120px] font-bold mb-10 leading-[0.95] tracking-tight">
              Build Beyond
              <br />
              <span className="italic font-light">Boundaries</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-neutral-600 mb-14 max-w-3xl mx-auto leading-relaxed">
              The most powerful platform for creating extraordinary digital experiences. 
              Designed for those who refuse to compromise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button className="px-10 py-5 bg-black text-white font-medium hover:bg-black/80 transition-all text-base">
                Start Building Free
              </button>
              <button className="px-10 py-5 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all flex items-center gap-3 text-base">
                <span>Watch Video</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-center gap-16 mt-20 text-sm">
              <div>
                <div className="text-4xl font-bold mb-1">99.9%</div>
                <div className="text-neutral-500 uppercase tracking-wider text-xs">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">5M+</div>
                <div className="text-neutral-500 uppercase tracking-wider text-xs">Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">180+</div>
                <div className="text-neutral-500 uppercase tracking-wider text-xs">Countries</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mt-32 mb-20">
            <div className="relative overflow-hidden rounded-none border-2 border-black">
              <img 
                src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&h=900&fit=crop&q=90" 
                alt="Platform interface"
                className="w-full"
              />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-10 left-10 bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden lg:block">
              <div className="text-3xl font-bold mb-1">10x</div>
              <div className="text-sm text-neutral-600">Faster Performance</div>
            </div>
            
            <div className="absolute -bottom-10 right-10 bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden lg:block">
              <div className="text-3xl font-bold mb-1">Zero</div>
              <div className="text-sm text-neutral-600">Code Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 border-y-2 border-black overflow-hidden bg-black text-white">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-2xl font-bold mx-8">INNOVATION</span>
          <span className="text-2xl mx-8">•</span>
          <span className="text-2xl font-bold mx-8">PERFORMANCE</span>
          <span className="text-2xl mx-8">•</span>
          <span className="text-2xl font-bold mx-8">EXCELLENCE</span>
          <span className="text-2xl mx-8">•</span>
          <span className="text-2xl font-bold mx-8">INNOVATION</span>
          <span className="text-2xl mx-8">•</span>
          <span className="text-2xl font-bold mx-8">PERFORMANCE</span>
          <span className="text-2xl mx-8">•</span>
          <span className="text-2xl font-bold mx-8">EXCELLENCE</span>
          <span className="text-2xl mx-8">•</span>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24">
            <h2 className="text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Everything you need.
              <br />
              <span className="italic font-light">Nothing you don't.</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl">
              Powerful features that work seamlessly together to create exceptional experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Visual Builder",
                description: "Design pixel-perfect interfaces without writing a single line of code. Complete creative freedom."
              },
              {
                number: "02",
                title: "Real-time Collaboration",
                description: "Work with your team simultaneously. See changes instantly. Ship faster than ever before."
              },
              {
                number: "03",
                title: "Advanced Components",
                description: "40+ pre-built components that you can customize to match your brand perfectly."
              },
              {
                number: "04",
                title: "Lightning Performance",
                description: "Optimized infrastructure delivers blazing-fast load times and smooth interactions."
              },
              {
                number: "05",
                title: "Global Scale",
                description: "Deploy to 180+ countries with automatic CDN routing and edge optimization."
              },
              {
                number: "06",
                title: "Enterprise Security",
                description: "Bank-level encryption, SOC 2 compliant, and built for the most demanding requirements."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`border-2 border-black p-10 transition-all duration-300 cursor-pointer ${
                  hoveredCard === index 
                    ? 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] translate-x-[-4px] translate-y-[-4px]' 
                    : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <div className="text-6xl font-bold mb-6 text-neutral-200">{feature.number}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-40 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="order-2 lg:order-1">
              <div className="relative border-2 border-black overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=700&fit=crop&q=90" 
                  alt="Team collaboration"
                  className="w-full"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block border-2 border-black px-4 py-2 mb-8 text-sm font-medium">
                COLLABORATION
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                Work together,
                <br />
                <span className="italic font-light">ship faster</span>
              </h2>
              <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
                Real-time collaboration tools that make working with your team feel effortless. 
                See changes as they happen, comment directly on designs, and ship with confidence.
              </p>
              <ul className="space-y-5">
                {[
                  "Live cursors and presence",
                  "Instant synchronization",
                  "Comment and review tools",
                  "Version control built-in"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block border-2 border-black px-4 py-2 mb-8 text-sm font-medium">
                AUTOMATION
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                Automate the
                <br />
                <span className="italic font-light">boring stuff</span>
              </h2>
              <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
                Focus on what matters. Let our intelligent automation handle the repetitive tasks, 
                optimize performance, and keep everything running smoothly.
              </p>
              <ul className="space-y-5">
                {[
                  "Smart asset optimization",
                  "Automatic responsive design",
                  "Performance monitoring",
                  "SEO automation"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="relative border-2 border-black overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=700&fit=crop&q=90" 
                  alt="Automation dashboard"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="clients" className="py-40 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Trusted by the
              <br />
              <span className="italic font-light">best teams</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Switched to APEX and never looked back. The speed and flexibility are unmatched. Our team ships features 3x faster now.",
                name: "Sarah Mitchell",
                role: "Head of Design",
                company: "Quantum Labs",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=90"
              },
              {
                quote: "This is what modern tools should feel like. Powerful enough for complex projects, simple enough to onboard in minutes.",
                name: "David Chen",
                role: "Engineering Lead",
                company: "TechFlow",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=90"
              },
              {
                quote: "The ROI was immediate. We eliminated three separate tools and saved $50k annually while improving our workflow.",
                name: "Maya Rodriguez",
                role: "Product Director",
                company: "Innovate Co",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=90"
              }
            ].map((testimonial, index) => (
              <div key={index} className="border-2 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-8">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg mb-8 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 border-2 border-black" />
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">{testimonial.role}</div>
                    <div className="text-sm text-neutral-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-6xl lg:text-8xl font-bold mb-8 tracking-tight">
            Ready to build
            <br />
            <span className="italic font-light">something amazing?</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-16 max-w-2xl mx-auto">
            Join thousands of teams already creating exceptional experiences with APEX.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-12 py-6 bg-white text-black font-medium hover:bg-neutral-200 transition-all text-lg">
              Start Building Free
            </button>
            <button className="px-12 py-6 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all text-lg">
              Schedule Demo
            </button>
          </div>
          <p className="text-neutral-500 mt-10">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-5 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold mb-6">APEX</div>
              <p className="text-neutral-600 mb-8 max-w-sm">
                The most powerful platform for creating extraordinary digital experiences.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-4 text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-4 text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-4 text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-black pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-600 text-sm">© 2024 APEX. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="text-neutral-600 hover:text-black transition-colors text-sm">Twitter</a>
              <a href="#" className="text-neutral-600 hover:text-black transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-neutral-600 hover:text-black transition-colors text-sm">GitHub</a>
              <a href="#" className="text-neutral-600 hover:text-black transition-colors text-sm">Dribbble</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Page