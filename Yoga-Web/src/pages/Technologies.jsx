import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import techImg from "../assets/ChatGPT Image Jan 14, 2026, 02_08_39 PM.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube , faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Technologies() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#FAF8F3] selection:bg-emerald-100">
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 bg-fixed bg-center bg-cover overflow-hidden"
        style={{ backgroundImage: `url(${techImg})` }}
      >
        <Navbar
          scrolled={scrolled}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-wide drop-shadow-lg">
            Technologies of Consciousness
          </h1>

          <p className="mt-8 text-lg md:text-xl text-white/90 leading-relaxed font-normal px-4 md:px-0 max-w-2xl mx-auto italic">
            Precise, evidence-based approaches that refine the mind–body system
            and align life with natural law.
          </p>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent mx-auto"></div>
        </motion.div>
      </section>
       <section className="py-20 px-6 bg-[#F7F5EF]">
  <div className="max-w-4xl mx-auto text-center space-y-6">
    <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2E3A44]">
      From Foundation to Application
    </h2>

    <p className="text-lg md:text-xl text-[#5A5A54] leading-relaxed italic max-w-3xl mx-auto">
      The technologies presented here are not techniques layered onto life,
      but structured means of supporting what is already inherent within
      consciousness and the human nervous system.
    </p>

    <p className="text-[1.05rem] text-[#5A5A54] leading-relaxed max-w-3xl mx-auto">
      They are introduced with care, grounded in research, and distinct from
      personal experience. Engagement is invitational, never prescriptive—
      understanding may come later; orientation comes first.
    </p>
  </div>
</section>

      {/* BENEFITS GRID */}
      <section className="py-24 px-6 relative z-10">
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {[
      {
        icon: "🧠",
        title: "Mind & Brain",
        desc:
          "Deep rest and brain coherence through Transcendental Meditation, advanced techniques, and consciousness technologies.",
        tags: ["TM", "Advanced Techniques", "TM-Sidhis", "AMSV"],
      },
      {
        icon: "🌬️",
        title: "Breath & Body",
        desc:
          "Energy refinement and physiological balance through breathwork, pranayama, and yoga asanas.",
        tags: ["Breathwork", "Pranayama", "Asanas"],
      },
      {
        icon: "💚",
        title: "Daily Rhythms & Ayurveda",
        desc:
          "Aligning lifestyle with natural law through small, realistic adjustments to daily habits.",
        tags: ["Ayurvedic Guidance", "Daily Routines"],
      },
      {
        icon: "✨",
        title: "Jyotish, Vastu & Vedic Modalities",
        desc:
          "Subtle Vedic tools that help you understand timing, environment, and alignment with natural law.",
        tags: ["Jyotish", "Vastu", "Other Vedic Modalities"],
      },
    ].map((item) => (
      <motion.div
        key={item.title}
        variants={itemVariants}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
                  border border-stone-100 group hover:shadow-xl hover:border-emerald-100 
                  transition-all duration-300"
      >
        {/* Icon */}
        <div className="w-14 h-14 bg-stone-50 rounded-full flex items-center justify-center 
                        mb-6 group-hover:bg-emerald-50 transition-colors duration-300 text-3xl">
          {item.icon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed mb-6">
          {item.desc}
        </p>

        {/* Includes */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-500 mb-2 tracking-wide">
            INCLUDES:
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md text-xs bg-stone-100 text-slate-600 border border-stone-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Learn More */}
        <button className="text-sm font-medium text-emerald-700 group-hover:underline transition-colors">
          Learn More →
        </button>
      </motion.div>
    ))}
  </motion.div>
</section>


      {/* DETAILED CONTENT SECTIONS */}
      <section className="py-28 px-6 bg-[#FAFAF7] overflow-hidden">
  <div className="max-w-6xl mx-auto space-y-32">
    {[
      {
        id: "1",
        emoji: "🧠",
        title: "Mind & Brain",
        description: "Consciousness technologies that create deep rest, brain coherence, and inner stability – the foundation for clarity and growth.",
        content: [
          { title: "Transcendental Meditation® (TM)", items: ["A simple, effortless technique practiced 20 minutes twice a day.", "Allows the mind to settle into pure awareness, beyond thought.", "Research shows increased brain coherence, reduced stress, and improved wellbeing."] },
          { title: "Advanced Techniques", items: ["Introduced after TM is well established.", "Deepens the experience of transcendence and clarity in activity."] },
          { title: "TM-Sidhis Program", items: ["Cultures the ability of the mind to function from subtler levels of awareness.", "Supports intuition, inner stability, and integration of higher consciousness."] },
          { title: "AMSV / Maharishi Vedic Sound", items: ["Listening to specific Vedic sound to dissolve stress deeply.", "Normalizes the nervous system and supports emotional balance."] }
        ]
      },
      {
        id: "2",
        emoji: "🌬️",
        title: "Breath & Body",
        description: "Gentle, precise practices to support the nervous system, energy flow, and physiological balance.",
        content: [
          { title: "Breathwork", items: ["Simple breathing patterns to calm and stabilize energy.", "Used to support integration — not as a replacement for TM."] },
          { title: "Pranayama", items: ["Traditional techniques that refine subtle life force (prana).", "Practiced gently and tailored to each individual."] },
          { title: "Asanas (Yoga Postures)", items: ["Comfortable postures to release tension and support flexibility.", "Prepare the body for deeper rest in meditation and life."] }
        ]
      },
      {
        id: "3",
        emoji: "💚",
        title: "Daily Rhythms & Ayurveda",
        description: "Aligning lifestyle with natural law through gentle, realistic adjustments.",
        content: [
          { title: "Ayurvedic Guidance", items: ["Practical suggestions for sleep, digestion, daily rhythm.", "Always adapted to real-life circumstances — work, family, demands."] },
          { title: "Daily Routines", items: ["Small shifts that support energy, clarity, and rest.", "Doable changes — not rigid discipline."] }
        ]
      },
      {
        id: "4",
        emoji: "✨",
        title: "Jyotish, Vastu & Vedic Modalities",
        description: "Subtle tools to understand timing, environment, and alignment with natural law.",
        content: [
          { title: "Jyotish (Vedic Astrology)", items: ["Vedic insight into timing and tendencies.", "Used to guide action from clarity — not prediction or fear."] },
          { title: "Vastu", items: ["Principles of harmonious space and spatial influence.", "Practical suggestions for home or office coherence."] },
          { title: "Other Vedic Modalities", items: ["Used only when useful — never replacing your own inner intelligence.", "Often shared through certified experts when needed."] }
        ]
      }
    ].map((section, idx) => (
      <motion.div
        key={section.id}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-20 items-start`}
      >
        {/* TEXT CONTENT */}
        <div className="flex-1 space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2E3A44] flex items-center gap-4">
              <span className="text-2xl opacity-80">{section.emoji}</span> {section.title}
            </h2>
            <p className="text-[#5A5954] text-lg leading-relaxed border-l-2 border-emerald-200 pl-6 italic">
              {section.description}
            </p>
          </motion.div>

          <div className="grid gap-10">
            {section.content.map((sub) => (
              <motion.div variants={itemVariants} key={sub.title} className="group">
                <h4 className="text-xl font-medium text-[#2E3A44] mb-3 group-hover:text-emerald-700 transition-colors">
                  {sub.title}
                </h4>
                <ul className="text-[#5A5954] space-y-3">
                  {sub.items.map((li, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-emerald-400 mt-1.5 text-xs">◆</span>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* IMAGE / LOGO SPACE */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 w-full flex justify-center items-center"
        >
          <div className="relative w-full aspect-square max-w-md group">
            {/* Decorative background shape */}
            <div className="absolute inset-0 bg-emerald-50 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700 opacity-50 blur-2xl" />
            
            {/* The Logo/Image Placeholder */}
            <div className="relative z-10 w-full h-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 flex items-center justify-center overflow-hidden">
               <span className="text-9xl opacity-20 filter grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500 scale-110 group-hover:scale-125">
                 {section.emoji}
               </span>
               {/* Note: You can replace the span above with an <img src={yourLogo} /> */}
            </div>
            
            {/* Aesthetic accent */}
            <div className={`absolute -bottom-6 ${idx % 2 === 0 ? "-right-6" : "-left-6"} w-24 h-24 border-2 border-emerald-100 rounded-full opacity-50`} />
          </div>
        </motion.div>
      </motion.div>
    ))}
  </div>
</section>
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