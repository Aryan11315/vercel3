import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import image from "../assets/nature_no_text.png";
import Corousel from "../components/Corousel";

export default function Section() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#FAF9F6] selection:bg-teal-100 text-slate-800">
      
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 bg-fixed bg-center bg-cover overflow-hidden"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Refined Overlay: Darker gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent backdrop-blur-[0.5px]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-light tracking-tight text-white drop-shadow-2xl leading-tight"
          >
            Navigate Life with <br/> <span className="italic">Higher Awareness</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto text-white/90"
          >
            Personalized guidance grounded in Maharishi Technologies of Consciousness.
            Experience clarity, stability, and inner coherence as the foundation of lasting growth.
          </motion.p>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 12, 0] }} 
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-60"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* WHAT TO EXPECT - Soft Blue Fade */}
      <section className="py-32 px-6 bg-[#F1F6F9]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-light text-slate-700 tracking-tight">
            What to Expect Working with a Consciousness Advisor
          </h2>

          <div className="w-12 h-[1px] bg-teal-400 mx-auto opacity-50"></div>

          <p className="text-lg md:text-xl leading-relaxed font-light italic text-slate-500 text-left md:text-center">
            A Consciousness Advisor Session is a confidential, high-clarity consultation
            where we explore what you want to strengthen or resolve — whether it's stress,
            direction, purpose, relationships, health, or performance. Rather than analyzing
            the mind, we work at the root: your state of consciousness.
            <br /><br />
            We begin by listening deeply. Together, we map your situation onto the Wheel of
            Progress to identify where stability is strong and where awareness is calling for refinement.
            <br /><br />
            From here, I offer precise, consciousness-based recommendations drawn from Maharishi
            Technologies of Consciousness.
            <br /><br />
            I accompany you throughout your journey. We integrate insights step by step, helping
            you stay consistent, navigate challenges with clarity, and embody new levels of awareness
            until your inner and outer life feel aligned and coherent.
          </p>
        </motion.div>
      </section>

      {/* VALUE CARDS - Earthy Gradient */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#F9F6F2] to-[#F1EDE7]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8"
        >
          {[
            { title: "A Relationship with an Expert", desc: "Personalized guidance from someone deeply trained in consciousness-based development and the principles of natural law." },
            { title: "A Clarity Partner", desc: "A steady, supportive presence helping you see clearly, stay aligned, and evolve without overwhelm or confusion." },
            { title: "Access to Time-Tested Knowledge", desc: "Wisdom validated by both ancient Vedic tradition and modern research — applied precisely to your life." },
            { title: "A Deeper Understanding of Yourself", desc: "Greater clarity about your path, purpose, inner patterns, and the higher potential already present within you." },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white/80 border border-[#E6CFC3] rounded-2xl p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all duration-300"
            >
              <div className="relative mb-6">
                <div className="w-3 h-3 rounded-full bg-teal-500/40 absolute -left-1 -top-1 animate-ping"></div>
                <div className="w-3 h-3 rounded-full bg-teal-600 relative z-10"></div>
              </div>

              <h3 className="text-xl font-medium text-slate-800 mb-4 tracking-tight">
                {card.title}
              </h3>

              <p className="text-slate-600 leading-relaxed font-light">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Corousel/>

      {/* HOW IT WORKS - Modern Stepper */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-serif font-light text-slate-800 text-center mb-20"
          >
            How It Works
          </motion.h2>

          <div className="grid gap-12">
            {[
              { num: "01", title: "Free 30-Minute Introductory Session", desc: "We begin with a complimentary introductory call to understand where you are, what's unfolding in your life, and what you feel called to transform or stabilize." },
              { num: "02", title: "Consciousness Journey Assessment", desc: "If we continue, you'll receive a short reflective questionnaire. This helps clarify your inner landscape and allows me to map your personalized evolutionary pathway." },
              { num: "03", title: "Client Consciousness Journey Tracker", desc: "I create a custom clarity map highlighting the most relevant areas of the Wheel of Progress for your growth. We refine it together and choose where to focus." },
              { num: "04", title: "Co-Create Intentions & Progress Tracking", desc: "We establish intentions that arise naturally from your own clarity — not force — and define simple ways to observe your evolution over time." },
            ].map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row items-start gap-8 p-8 rounded-3xl hover:bg-slate-50 transition-colors duration-500"
              >
                <span className="text-5xl font-serif italic text-teal-600/20 group-hover:text-teal-600/40 transition-colors">
                  {item.num}
                </span>
                <div className="pt-2">
                  <h3 className="text-2xl font-medium text-slate-800 mb-4">{item.title}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SESSION OPTIONS - Minimalist Aesthetic */}
      <section className="py-32 px-6 bg-[#F1F4F2] overflow-hidden">
  <div className="max-w-6xl mx-auto relative">
    <h2 className="text-4xl font-serif font-light text-slate-800 text-center mb-16">
      Session Options
    </h2>

    <div className="flex flex-col lg:flex-row items-end gap-12">
      {/* LEFT: SESSION CARDS */}
      <div className="flex-[1.5] w-full grid gap-4 self-center">
        {[
          { title: "Single Session", price: "€130", desc: "A focused, high-clarity session to address one area of life or gain immediate insight." },
          { title: "3-Session Package", price: "€370", old: "€390", desc: "A short transformative journey with consistent support and a 10% package benefit." },
          { title: "10-Session Package", price: "€1,095", old: "€1,390", desc: "A deep, structured evolution cycle (bi-weekly or monthly), including a 20% package benefit." }
        ].map((option, i) => (
          <motion.div 
            whileHover={{ scale: 1.01, x: 5 }}
            key={i} 
            className="bg-white p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm border border-slate-200"
          >
            <div className="text-center md:text-left">
              <h3 className="text-xl font-medium text-slate-800">{option.title}</h3>
              <p className="text-slate-500 mt-2 font-light">{option.desc}</p>
            </div>
            <div className="flex flex-col items-center md:items-end min-w-[120px]">
              <span className="text-2xl font-light text-teal-700">{option.price}</span>
              {option.old && <span className="text-sm text-slate-400 line-through">{option.old}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* RIGHT: TALLER ANIMATED ELEPHANT */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex-1 relative flex flex-col items-center lg:items-end pb-4"
      >
        {/* Speech Bubble */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="bg-white p-5 rounded-2xl shadow-xl border border-teal-100 mb-6 relative max-w-[220px] text-center z-20"
        >
          <p className="text-base font-medium text-teal-900 leading-snug">
            "Health is most important—book your session now!"
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-teal-100 rotate-45"></div>
        </motion.div>

        {/* Tall Elephant SVG */}
        <svg width="240" height="320" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
          {/* Legs */}
          <rect x="65" y="220" width="25" height="40" rx="10" fill="#94A3B8" />
          <rect x="110" y="220" width="25" height="40" rx="10" fill="#94A3B8" />
          
          {/* Large Body */}
          <ellipse cx="100" cy="170" rx="65" ry="75" fill="#CBD5E1" /> 
          
          {/* Head */}
          <circle cx="100" cy="90" r="55" fill="#CBD5E1" />
          
          {/* Ears */}
          <motion.ellipse 
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4 }}
            cx="50" cy="90" rx="35" ry="45" fill="#94A3B8" 
          />
          <motion.ellipse 
            animate={{ rotate: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 4 }}
            cx="150" cy="90" rx="35" ry="45" fill="#94A3B8" 
          />
          
          {/* Eyes & Smile */}
          <circle cx="80" cy="85" r="5" fill="#1E293B" />
          <circle cx="120" cy="85" r="5" fill="#1E293B" />
          <path d="M90 110 Q100 120 110 110" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          
          {/* Waving Hand (Arm) */}
          <motion.path 
            d="M160 160 Q190 140 185 110" 
            stroke="#CBD5E1" strokeWidth="18" strokeLinecap="round" fill="none"
            animate={{ rotate: [0, -20, 0], originX: "160px", originY: "160px" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />

          {/* Cheeks */}
          <circle cx="75" cy="100" r="6" fill="#FCA5A5" fillOpacity="0.5" />
          <circle cx="125" cy="100" r="6" fill="#FCA5A5" fillOpacity="0.5" />
          
          {/* Waving Trunk */}
          <motion.path 
            d="M100 115 Q100 150 140 145" 
            stroke="#94A3B8" strokeWidth="16" strokeLinecap="round" fill="none"
            animate={{ d: [
              "M100 115 Q100 150 140 145", 
              "M100 115 Q110 170 130 165", 
              "M100 115 Q100 150 140 145"
            ]}}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </div>

    {/* Footer content continues below... */}
    <div className="mt-20 p-8 bg-teal-900/5 rounded-2xl border border-teal-900/10 text-center">
        <h3 className="text-lg font-medium text-slate-800 italic">Flexible Approach</h3>
        <p className="text-slate-600 mt-2 font-light">
          You may schedule a single session, return later, or mix and match session frequency according to what feels natural.
        </p>
    </div>

    <div className="text-center mt-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = '/contact')}
        className="px-12 py-5 bg-teal-800 text-white text-lg font-medium rounded-full hover:bg-teal-900 shadow-2xl transition-all"
      >
        Book Your Free Session
      </motion.button>
    </div>
  </div>
</section>

      {/* FOOTER - Minimalist Night */}
      <footer className="bg-[#0F172A] text-white/80 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
            {['About', 'Consciousness Journey', 'Get Started', 'Legal'].map((col, i) => (
              <div key={i}>
                <h3 className="text-white font-serif text-lg mb-6">{col}</h3>
                <ul className="space-y-4 font-light">
                  {i === 0 && <><li>Our Mission</li><li>Our Services</li><li>Client Stories</li><li>Common Questions</li></>}
                  {i === 1 && <><li>What We Offer</li><li>Technologies</li><li>Practices</li><li>OneConsciousness.org</li></>}
                  {i === 2 && <><li>Book Free Session</li><li>Contact Us</li><li>Session Types</li><li>How It Works</li></>}
                  {i === 3 && <><li>Privacy Policy</li><li>Terms of Use</li><li>Cookie Policy</li><li>Disclaimer</li></>}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 mt-20 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-xs max-w-xl text-center md:text-left leading-relaxed">
              © 2026 Atmarisa Consciousness Advisory. Affiliated with OneConsciousness.org 
              and the Maharishi Technologies of Consciousness Organization.
            </p>
            <div className="flex gap-8">
              {[faFacebook, faInstagram, faYoutube, faLinkedin].map((icon, i) => (
                <a key={i} href="#" className="hover:text-teal-400 transition-colors text-xl">
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}