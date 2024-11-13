import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import HeroScene from '../components/HeroScene';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Canvas Container */}
        <div className="absolute inset-0 w-full h-full">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary-900/90 via-primary-900/80 to-primary-900/90" 
          style={{ zIndex: 1 }} 
        />
        
        {/* Content */}
        <div 
          className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-center" 
          style={{ zIndex: 2 }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 text-white tracking-tight"
            >
              Innovez avec{' '}
              <motion.span
                className="text-secondary-400 inline-block"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                l'IA
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-gray-200 max-w-3xl mx-auto"
            >
              Propulsez votre entreprise vers le futur avec nos solutions marketing intelligentes
            </motion.p>
            
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-secondary-400 to-secondary-500 text-white rounded-full font-semibold overflow-hidden shadow-lg hover:shadow-secondary-400/20 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Démarrer votre transformation
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-secondary-500 to-secondary-600 transition-transform duration-300"></div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Other Sections */}
      <Services />
      <About />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}
