import React, { useEffect, useRef, useState } from "react";


import founderImg from "../assets/marisela_cropped.png"; // replace with your image
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target); // Animate only once
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

const AnimatedSection = ({ children, className = "" }) => {
        const [ref, isVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        return (
            <div ref={ref} className={`transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                {children}
            </div>
        );
    };
export default function FounderSection() {
  return (
    <section className="bg-[#F7F8F6] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#5A5246] tracking-wide">
            About Marisela Rodríguez
          </h2>
          <div className="mt-4 w-20 h-[2px] mx-auto bg-gradient-to-r from-[#CABFA8] to-[#B5A78C] rounded-full"></div>
        </AnimatedSection>

        {/* Profile card */}
        <AnimatedSection className="flex flex-col items-center text-center gap-8">
  {/* Image circle */}
  <div>
    <div className="w-56 h-56 rounded-full bg-white shadow-xl border-[6px] border-[#CABFA8]/60 flex items-center justify-center overflow-hidden">
      <img
        src={founderImg}
        alt="Marisela Rodriguez"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  </div>

  {/* Intro text */}
  <div className="max-w-2xl">
    <p className="text-[#5E5A52] text-lg leading-relaxed">
      Consciousness Advisor®, Transcendental Meditation® practitioner,
      and founder of Atmarisa — dedicated to elevating human awareness 
      and helping individuals live with clarity, coherence, and purpose.
    </p>
  </div>
</AnimatedSection>


        {/* Long paragraph area */}
        <AnimatedSection className="mt-16 space-y-6 text-[#5C574E] max-w-4xl mx-auto leading-relaxed text-[17px] font-light">
          <p>
            Her work integrates Vedic science, the mechanics of consciousness,
            intuitive insight, and real-world experience from her background in 
            global business and leadership. This unique combination allows her 
            to guide clients with both depth and precision, supporting them 
            through transition, growth, and inner evolution.
          </p>

          <p>
            Marisela's approach is grounded in stillness and natural law. Rather 
            than analyzing the mind, she helps clients access the deeper field 
            of awareness where clarity, stability, and intuitive knowing 
            naturally emerge.
          </p>

          <p>
            Her mission is to support the awakening of human potential — 
            beginning with Luxembourg and expanding globally — as part of 
            a more conscious, compassionate, and coherent society.
          </p>
          <br />
          <br />
          <br />
          <br />
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-[#463F33] pt-4 text-center">
  A Consciousness-Based Approach to Personal Evolution
</h2>


          <p>
            Marisela's work is centered on helping individuals reconnect to 
            their own inner intelligence. Through refined awareness, the 
            nervous system settles, stress patterns dissolve, and perception 
            expands. From this state, decisions become clear, relationships 
            harmonize, and life begins to reorganize with greater ease and 
            purpose.
          </p>

          <p>
            Rather than offering advice at the level of thought or behavior, 
            she guides clients into deeper alignment with natural law — where 
            the next steps become obvious and progress feels effortless.
          </p>

          <p>
            Her sessions support clarity, emotional stability, creativity, and 
            a grounded sense of direction, making her approach both 
            transformative and practical for daily life.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
