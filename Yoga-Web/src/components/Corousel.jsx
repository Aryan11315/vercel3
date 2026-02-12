import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Corousel() {
  const testimonials = [
    {
      quote: "A subtle but profound shift in clarity and calm.",
      name: "Julia",
      location: "Luxembourg",
    },
    {
      quote: "Helped me integrate deep inner silence into daily life.",
      name: "Daniel",
      location: "Mexico",
    },
    {
      quote: "Clear, gentle guidance that reconnects you with your inner compass.",
      name: "Elena",
      location: "Sweden",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 px-6 bg-[#4A1D24]"> {/* Deeper, more elegant wine color */}
      <div className="max-w-4xl mx-auto relative">
        
        {/* Quote Icon Decoration */}
        <div className="text-center mb-2">
          <span className="text-6xl font-serif text-[#F8EFE6] opacity-20">“</span>
        </div>

        <div className="relative min-h-[280px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="
                absolute
                w-full
                bg-[#FDFBF7]
                text-[#3A2F2B]
                rounded-3xl px-8 md:px-16 py-12
                shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                text-center
                border border-white/10
              "
            >
              <p className="italic text-xl md:text-2xl text-[#3A2F2B] mb-8 leading-relaxed font-serif">
                {testimonials[index].quote}
              </p>

              <div className="flex flex-col items-center">
                <div className="w-8 h-px bg-emerald-600/30 mb-4"></div>
                <p className="text-sm tracking-widest text-[#705E56] font-semibold uppercase">
                  {testimonials[index].name} 
                  <span className="mx-2 text-emerald-600/40">•</span> 
                  <span className="font-light italic lowercase">{testimonials[index].location}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Indicators (Refined) */}
        <div className="flex justify-center gap-4 mt-12 relative z-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group relative py-2"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className={`
                h-1 transition-all duration-500 rounded-full
                ${i === index ? "w-8 bg-[#F8EFE6]" : "w-4 bg-[#F8EFE6]/30 group-hover:bg-[#F8EFE6]/60"}
              `} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}