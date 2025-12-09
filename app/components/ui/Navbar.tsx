import Link from 'next/link'
import { motion } from 'framer-motion'
import { FcDocument } from 'react-icons/fc'

type NavbarType ={
    scrolled : boolean
}
const Navbar = ({scrolled}:NavbarType) => {
  return (
   <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-sm' : 'bg-transparent'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-24">
            <motion.div 
              className="text-2xl font-bold tracking-tight flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span 
                className="text-3xl"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FcDocument/>
              </motion.span>
              DocFeel
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-12 text-sm">
              {['Features', 'How it Works', 'Testimonials'].map((item, i) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="hover:opacity-60 transition-opacity"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link href="/signin" className="text-sm hover:opacity-60 transition-opacity">
                Sign In
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup" className="px-7 py-3 bg-black text-white text-sm font-medium hover:bg-black/80 transition-all rounded-full">
                  Try Free
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.nav>
  )
}

export default Navbar
