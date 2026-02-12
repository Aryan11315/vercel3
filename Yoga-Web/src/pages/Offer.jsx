import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Brain, Zap, Heart, Moon, Activity, Clock } from 'lucide-react';

const Offer = () => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const companies = [
    { name: 'WSJ', logo: 'WSJ' },
    { name: 'CNN', logo: 'CNN' },
    { name: 'BBC NEWS', logo: 'BBC NEWS' },
    { name: 'TIME', logo: 'TIME' }
  ];

  const benefits = [
    {
      icon: Brain,
      title: 'Enhanced Brain Function',
      description: 'Improved cognitive abilities and mental clarity'
    },
    {
      icon: Zap,
      title: 'Increased Energy',
      description: 'Natural vitality and sustained mental alertness'
    },
    {
      icon: Heart,
      title: 'Boosted Creativity',
      description: 'Greater innovative thinking and problem-solving'
    },
    {
      icon: Moon,
      title: 'Stress Reduction',
      description: 'Significant decrease in stress and anxiety levels'
    },
    {
      icon: Activity,
      title: 'Better Cardiovascular Health',
      description: 'Improved heart health and circulation'
    },
    {
      icon: Clock,
      title: 'Quality Sleep',
      description: 'Deeper rest and natural sleep patterns'
    }
  ];

  const practiceDetails = [
    {
      title: 'Simple & Inclusive',
      description: 'Easy to practice, regardless of age, religion, philosophical, or lifestyle beliefs. Practiced by millions of all faiths and backgrounds around the world.'
    },
    {
      title: 'Evidence Based',
      description: 'Over 380 peer-reviewed studies show effectiveness for stress reduction, cognitive enhancement, and overall wellbeing.'
    },
    {
      title: 'Effortless Technique',
      description: 'Unlike other forms of meditation, TM requires no concentration or control of thoughts. The mind settles into a state of restful alertness.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % companies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center py-16 px-6"
      >
        {/* Company Logos Carousel */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-sm text-slate-500 mb-6 tracking-wide">AS FEATURED IN</p>
          <div className="flex justify-center items-center space-x-8 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLogoIndex}
                variants={logoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center space-x-8"
              >
                {companies.map((company, index) => (
                  <motion.div
                    key={company.name}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      index === currentLogoIndex
                        ? 'bg-white shadow-lg scale-110'
                        : 'bg-slate-100 opacity-60 scale-95'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={`font-bold ${
                      company.name === 'CNN' ? 'text-red-600' :
                      company.name === 'BBC NEWS' ? 'text-red-600' :
                      company.name === 'TIME' ? 'text-red-500' :
                      'text-slate-700'
                    }`}>
                      {company.logo}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-16">
          <motion.blockquote 
            className="text-2xl md:text-3xl text-slate-700 leading-relaxed mb-6"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            "Of all the routines and habits, the most consistent among guests is some form of daily meditation or mindfulness practice. More than{' '}
            <motion.span 
              className="text-blue-600 font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              80% of the world-class performers
            </motion.span>{' '}
            I interviewed shared this trait."
          </motion.blockquote>
          <motion.p 
            className="text-slate-500 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            — Tim Ferriss
          </motion.p>
        </motion.div>
      </motion.div>

      {/* What is Transcendental Meditation Section */}
      <motion.section 
        className="py-16 px-6 bg-white/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-light text-slate-800 text-center mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            What is Transcendental Meditation?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A simple, natural technique practiced for 15-20 minutes twice daily while sitting comfortably with eyes closed—no concentration, contemplation, or control of thoughts required.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Universal Practice */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-medium text-slate-800 mb-6">A Universal Practice</h3>
                <div className="space-y-6">
                  {practiceDetails.map((detail, index) => (
                    <motion.div
                      key={detail.title}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                    >
                      <h4 className="font-semibold text-blue-800 mb-2">{detail.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{detail.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Ancient Wisdom */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-medium text-slate-800 mb-6">Ancient Wisdom, Modern Validation</h3>
                <motion.div 
                  className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-xl border border-slate-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-slate-700 leading-relaxed mb-6">
                    TM originates from the ancient Vedic tradition of India and represents the most scientifically-validated form of meditation, with comprehensive understanding of consciousness and human potential that provides profound insights for life's challenges and opportunities.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    This time-tested learning has been adapted for modern life, maintaining its effectiveness while meeting today's scientific standards regardless of cultural background or personal beliefs.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Transcendental Meditation Section */}
      <motion.section 
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Why Transcendental Meditation?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience profound benefits that enhance every aspect of your life through regular TM practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/50 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors duration-300"
                  >
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Quote */}
          <motion.div 
            className="text-center mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p 
              className="text-lg text-slate-600 italic leading-relaxed"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              "These benefits develop naturally through regular practice, backed by over four peer-reviewed scientific studies. Each person's experience is unique, unfolding according to their individual nature and needs."
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 px-6 bg-gradient-to-r from-blue-50 to-indigo-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3 
            className="text-3xl font-light text-slate-800 mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Begin Your Journey
          </motion.h3>
          
          <motion.p 
            className="text-lg text-slate-600 mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the world-class performers who have discovered the transformational power of daily meditation practice.
          </motion.p>
          
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-medium text-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Learn More About TM
          </motion.button>
        </div>
      </motion.section>

      {/* Floating Elements */}
      <motion.div
        className="fixed top-20 left-10 w-3 h-3 bg-blue-200 rounded-full opacity-60"
        animate={{
          y: [0, -10, 0],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="fixed top-40 right-16 w-2 h-2 bg-indigo-200 rounded-full opacity-50"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="fixed bottom-32 left-20 w-4 h-4 bg-blue-100 rounded-full opacity-40"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default Offer;