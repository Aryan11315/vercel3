import React, { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import ConsciousnessWheel from "../components/ConciousWheel";
import LandingPage from "../components/LandingPage";
import MeditationBook from "../components/MeditationBook";
import ResearchSection from "../components/ResearchSection";
import {"Menu" as Menu} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube , faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Stats from "../components/Stats";
import SixPillars from "../components/SixPillars";
// Enhanced Animated Number Component
const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const AnimatedNumber = ({ value, duration = 2, suffix = "" }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
      onUpdate: latest => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [value, duration, count]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return Math.floor(num / 1000) + "K";
    return num.toString();
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-6xl font-bold bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
    >
      {formatNumber(displayValue)}{suffix}
    </motion.div>
  );
};

// Enhanced Buddha SVG Component with more detail and elegance
const BuddhaIcon = ({ fillPercentage = 0 }) => {
    const maskId = `buddha-mask-${Math.random().toString(36).substr(2, 9)}`;
    const imageId = `buddha-image-${Math.random().toString(36).substr(2, 9)}`;

    // Ensure fillPercentage is between 0 and 100
    const clampedFillPercentage = Math.max(0, Math.min(100, fillPercentage));
    const maskHeight = 140 - (clampedFillPercentage / 100 * 140); // Height of the black part of the mask

    return (
        <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            className="drop-shadow-2xl"
            style={{ overflow: 'visible' }} // Allow shadows to extend beyond viewBox
        >
            <defs>
  {/* Define a circular clipPath */}
  <clipPath id="circleClip">
    <circle cx="70" cy="70" r="70" /> {/* center (70,70), radius = 70 (half of 140) */}
  </clipPath>

  <pattern id={imageId} x="0" y="0" width="1" height="1">
    <image
      href="https://img.freepik.com/premium-photo/illustration-girl-meditating-surrounded-animated-character-style-3d-logo-isolated-background_1020867-89702.jpg"
      x="0"
      y="0"
      width="140"
      height="140"
      preserveAspectRatio="xMidYMid slice"
      clipPath="url(#circleClip)"  // Apply the circular clipping
    />
  </pattern>
</defs>


            {/* A rectangle that will display the image and have the mask applied */}
            <rect
                x="0"
                y="0"
                width="140"
                height="140"
                fill={`url(#${imageId})`} // Fill with the image pattern
                mask={`url(#${maskId})`} // Apply the dynamic mask
                filter="url(#drop-shadow)" // Apply a generic drop shadow if desired
            />

            {/* Define a simple drop shadow for the image */}
            <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="4"/>
                <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </svg>
    );
};

// Enhanced Stylish Loader Component
const StylishLoader = ({ finishLoading }) => {
    const [progress, setProgress] = useState(0);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    const inspirationalQuotes = [
        "Elevating consciousness, one breath at a time...",
        "Mindfulness is the key to mental clarity.",
        "Inner peace begins with acceptance.",
        "Transform your thoughts, transform your life.",
        "Wisdom arises from stillness within.",
        "Breathe deeply, live fully.",
        "Find balance in the present moment.",
        "Enlightenment is the journey, not the destination."
    ];

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => finishLoading(), 1500);
                    return 100;
                }
                const increment = prev < 70 ? Math.random() * 5 + 1 : Math.random() * 2 + 0.5;
                return Math.min(prev + increment, 100);
            });
        }, 100);

        // Cycle through quotes
        const quoteInterval = setInterval(() => {
            setCurrentQuoteIndex(prev => (prev + 1) % inspirationalQuotes.length);
        }, 2500);

        return () => {
            clearInterval(interval);
            clearInterval(quoteInterval);
        };
    }, [finishLoading, inspirationalQuotes.length]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50 overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-blue-200/20 to-indigo-200/20"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 12 + Math.random() * 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            <div className="text-center max-w-3xl px-8 relative z-10 flex flex-col items-center">
                 {/* Enhanced Buddha Loading Animation */}
                <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 80 }}
                    className="relative mb-12"
                >
                     {/* Meditation circle background */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
                            width: "200px",
                            height: "200px",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                    <BuddhaIcon fillPercentage={progress} />
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent"
                        style={{
                            background: `conic-gradient(from 0deg, #3b82f6 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
                            mask: "radial-gradient(transparent 65px, black 67px)",
                            WebkitMask: "radial-gradient(transparent 65px, black 67px)",
                            width: "140px",
                            height: "140px",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%) rotate(-90deg)",
                        }}
                    />
                </motion.div>
                
                {/* Progress percentage with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                  className="mb-8"
                >
                  <div className="bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <span className="text-slate-700 text-xl font-bold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </motion.div>

                {/* Enhanced Quote with smooth transitions */}
                <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative min-h-[80px]"
                >
                    <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                        <p className="text-slate-700 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                            "{inspirationalQuotes[currentQuoteIndex]}"
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};


// Enhanced Shining Text Component with gradient colors
const ShiningText = ({ text, className, gradient }) => {
    const letters = text.split("");
    return (
        <h1 className={className}>
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    whileHover={{
                        color: "#fff",
                        textShadow: "0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6)",
                        scale: 1.05,
                        transition: { duration: 0.2 }
                    }}
                    className={`inline-block ${gradient} bg-clip-text text-transparent drop-shadow-2xl`}
                    style={{
                        textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </h1>
    );
};

// Animated Cloud Component
const AnimatedCloud = ({ delay = 0, duration = 20, top = "20%", size = "w-32 h-20" }) => (
    <motion.div
        className={`absolute ${size} opacity-30`}
        style={{ top }}
        initial={{ x: "-200px" }}
        animate={{ x: "calc(100vw + 200px)" }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "linear",
        }}
    >
        <svg viewBox="0 0 100 60" className="w-full h-full fill-white/80">
            <path d="M20,40 Q10,20 30,20 Q40,10 60,20 Q80,15 90,30 Q85,45 70,40 Q50,50 30,40 Q15,45 20,40 Z" />
        </svg>
    </motion.div>
);
const Navbar = ({ scrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
          : "py-4"
      }`}
      style={{
        background: scrolled
          ? undefined
          : "linear-gradient(90deg, #ebe7df, #fdf7e8, #fffcea, #f7e8e3, #e0e0e0)",
        borderBottom: "1px solid rgba(0,0,0,0.18)",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">

        {/* Colorful Gradient Logo */}
        <div className="text-[1.8rem] tracking-[0.45em] font-light bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm transition-all duration-300 hover:brightness-110">
          ATMARISA
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-12 items-center">
          {["Home", "About","Technologies", "Sessions", "Learn", "Contact"].map((item) => (
            <li key={item} className="relative group">
              <a
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-[1.06rem] font-medium text-gray-800 transition-colors duration-300 group-hover:text-purple-600"
              >
                {item}
              </a>

              {/* Hover Underline */}
              <span
                className="
                  absolute left-0 -bottom-1 h-[2px] w-0 
                  bg-gradient-to-r from-purple-600 to-pink-600 
                  transition-all duration-300 group-hover:w-full
                "
              ></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-white/95 backdrop-blur-xl transition-all duration-500 ease-in-out
          ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <ul className="p-6 space-y-4 text-center">
          {["Home", "About","Technologies", "Sessions", "Learn", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-800 hover:text-purple-600 transition-colors py-2 text-lg"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};



export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   
      useEffect(() => {
          const handleScroll = () => {
              setScrolled(window.scrollY > 10);
          };
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
      }, []);
  const companies = [
  { name: 'WSJ', color: 'text-slate-700' },
  { name: 'CNN', color: 'text-red-600' },
  { name: 'BBC NEWS', color: 'text-red-600' },
  { name: 'TIME', color: 'text-red-500' },
  { name: 'Forbes', color: 'text-amber-700' },
  { name: 'Bloomberg', color: 'text-purple-700' },
  { name: 'Reuters', color: 'text-blue-600' },
  { name: 'NY Times', color: 'text-slate-700' },
  { name: 'The Guardian', color: 'text-green-700' },
  { name: 'Al Jazeera', color: 'text-yellow-600' },
  { name: 'Fox News', color: 'text-red-700' },
  { name: 'CNBC', color: 'text-teal-600' },
];

const groupSize = 4;
const groups = Array.from({ length: Math.ceil(companies.length / groupSize) }, (_, i) =>
  companies.slice(i * groupSize, (i + 1) * groupSize)
);
const [groupIndex, setGroupIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGroupIndex((idx) => (idx + 1) % groups.length);
    }, 3000); // 1 second
    return () => clearInterval(interval);
  }, []);
  if (loading) {
    return <StylishLoader finishLoading={() => setLoading(false)} />;
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section with Mountain Background */}
      <LandingPage style={{ height: '100vh' }} />

      <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Statistics Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 px-6 lg:px-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      >
        
          <Stats/>
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
            <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Why Transcendental Meditation?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience profound benefits that enhance every aspect of your life through regular TM practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: 'Enhanced Brain Function',
                description: 'Improved cognitive abilities and mental clarity'
              },
              {
                icon: "⚡",
                title: 'Increased Energy',
                description: 'Natural vitality and sustained mental alertness'
              },
              {
                icon: "❤️",
                title: 'Boosted Creativity',
                description: 'Greater innovative thinking and problem-solving'
              },
              {
                icon: "🌙",
                title: 'Stress Reduction',
                description: 'Significant decrease in stress and anxiety levels'
              },
              {
                icon: "💪",
                title: 'Better Cardiovascular Health',
                description: 'Improved heart health and circulation'
              },
              {
                icon: "⏰",
                title: 'Quality Sleep',
                description: 'Deeper rest and natural sleep patterns'
              }
            ].map((benefit, index) => (
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
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-100/50 group hover:shadow-2xl hover:border-teal-200 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-16 h-16 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-emerald-200 group-hover:via-teal-200 group-hover:to-cyan-200 transition-colors duration-300 text-2xl"
                >
                  {benefit.icon}
                </motion.div>
                
                <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
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
              "These benefits develop naturally through regular practice, backed by over 400 peer-reviewed scientific studies. Each person's experience is unique, unfolding according to their individual nature and needs."
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* What is Transcendental Meditation Section */}
      <motion.section 
        className="py-20 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-light bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent text-center mb-4"
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
                <h3 className="text-2xl font-medium bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent mb-6">A Universal Practice</h3>
                <div className="space-y-6">
                  {[
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
                  ].map((detail, index) => (
                    <motion.div
                      key={detail.title}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-white/80 to-orange-50/80 backdrop-blur-sm p-6 rounded-xl border border-orange-100 shadow-lg"
                      whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(251, 146, 60, 0.15)" }}
                    >
                      <h4 className="font-semibold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">{detail.title}</h4>
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
                <h3 className="text-2xl font-medium bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent mb-6">Ancient Wisdom, Modern Validation</h3>
                <motion.div 
                  className="bg-gradient-to-r from-white/90 to-yellow-50/90 backdrop-blur-sm p-8 rounded-xl border border-amber-100 shadow-lg"
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

          {/* Company Logos Section */}
          <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      viewport={{ once: true }}
      className="text-center mt-20"
    >
      <p className="text-sm text-slate-500 mb-8 tracking-wide">AS FEATURED IN</p>
      <AnimatePresence mode="wait">
        <motion.div
          key={groupIndex}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center items-center space-x-12 flex-wrap gap-4"
        >
          {groups[groupIndex].map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-orange-100"
            >
              <span className={`font-bold text-lg ${company.color}`}>
                {company.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>

          {/* Quote Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-16 text-center"
          >
            <motion.blockquote 
              className="text-2xl md:text-3xl text-slate-700 leading-relaxed mb-6 bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-yellow-100"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              "Of all the routines and habits, the most consistent among guests is some form of daily meditation or mindfulness practice. More than{' '}
              <motion.span 
                className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-semibold"
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
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              — Tim Ferriss
            </motion.p>
          </motion.div>
        </div>
        <br></br>
        <br />
        <SixPillars/>
        <ConsciousnessWheel/>
      </motion.section>
      
      <ResearchSection/>
      {/* Discover Section */}
      
      <footer className="bg-gray-900 text-white py-16 px-6">
  <div className="max-w-7xl mx-auto">

    {/* --- TOP 4 COLUMNS --- */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">

      {/* About */}
      <div>
        <h3 className="text-xl font-serif mb-5">About</h3>
        <ul className="space-y-3 text-gray-300">
          <li><a href="#" className="hover:text-white">Our Mission</a></li>
          <li><a href="#" className="hover:text-white">Our Services</a></li>
          <li><a href="#" className="hover:text-white">Client Stories</a></li>
          <li><a href="#" className="hover:text-white">Common Questions</a></li>
        </ul>
      </div>

      {/* Consciousness Journey */}
      <div>
        <h3 className="text-xl font-serif mb-5">Consciousness Journey</h3>
        <ul className="space-y-3 text-gray-300">
          <li><a href="#" className="hover:text-white">What We Offer</a></li>
          <li><a href="#" className="hover:text-white">Technologies</a></li>
          <li><a href="#" className="hover:text-white">Practices</a></li>
          <li><a href="#" className="hover:text-white">OneConsciousness.org</a></li>
        </ul>
      </div>

      {/* Get Started */}
      <div>
        <h3 className="text-xl font-serif mb-5">Get Started</h3>
        <ul className="space-y-3 text-gray-300">
          <li><a href="#" className="hover:text-white">Book Free Session</a></li>
          <li><a href="#" className="hover:text-white">Contact Us</a></li>
          <li><a href="#" className="hover:text-white">Session Types</a></li>
          <li><a href="#" className="hover:text-white">How It Works</a></li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h3 className="text-xl font-serif mb-5">Legal</h3>
        <ul className="space-y-3 text-gray-300">
          <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white">Terms of Use</a></li>
          <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
          <li><a href="#" className="hover:text-white">Disclaimer</a></li>
        </ul>
      </div>

    </div>

    {/* Divider */}
    <hr className="border-gray-700 my-10" />

    {/* --- BOTTOM SECTION --- */}
    <div className="flex flex-col md:flex-row items-center justify-between">

      {/* Copyright Text */}
      <p className="text-sm text-gray-400 text-center md:text-left">
        © 2025 Atmarisa Consciousness Advisory. Affiliated with OneConsciousness.org 
        and the Maharishi Technologies of Consciousness Organization.
      </p>

      {/* Social Icons */}
      <div className="flex gap-6 mt-6 md:mt-0">
        {[
          { icon: "facebook", emoji: <FontAwesomeIcon icon={faFacebook} size="1x" /> },
          { icon: "instagram", emoji: <FontAwesomeIcon icon={faInstagram} size="1x" /> },
          { icon: "youtube", emoji:  <FontAwesomeIcon icon={faYoutube} size="1x" />},
          { icon: "linkedin", emoji: <FontAwesomeIcon icon={faLinkedin} size="1x" /> }
        ].map((item, i) => (
          <a
            key={i}
            href="#"
            className="text-2xl text-gray-300 hover:text-white transition-colors"
          >
            {item.emoji}
          </a>
        ))}
      </div>

    </div>
  </div>
</footer>
    </div>

  );
}