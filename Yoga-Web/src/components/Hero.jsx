// components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-amber-900/30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
      </motion.div>
      
      {/* Floating elements for ambiance */}
      <motion.div 
        animate={{ 
          y: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-2 h-2 bg-amber-300 rounded-full blur-sm"
      />
      <motion.div 
        animate={{ 
          y: [10, -15, 10],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-40 right-32 w-3 h-3 bg-purple-300 rounded-full blur-sm"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-left">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight"
          >
            <span className="block text-blue-600 font-extralight">Elevate</span>
            <span className="block text-blue-700">Awareness.</span>
            <span className="block text-blue-800 mt-2">Unlock</span>
            <span className="block text-purple-700">Your Potential</span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-pink-200/80 to-amber-200/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mt-8"
          >
            <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-medium">
              Transform your performance through scientifically-proven
              consciousness practices that unlock peak potential and sustainable
              well-being.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Begin Your Journey
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}