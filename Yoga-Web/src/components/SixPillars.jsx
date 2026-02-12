// components/SixPillars.jsx
import React from "react";

export default function SixPillars() {
  const sections = [
    {
      title: "Consciousness: The Foundation of Human Potential",
      desc:
        "Consciousness is the field from which clarity, intelligence, creativity, and wellbeing arise. When the mind settles into pure awareness, the brain becomes coherent, the physiology balances, and stress dissolves.",
      cards: [
        "Pure Awareness — the simplest state of the mind, basis of stability and inner coherence.",
        "The Unified Field — where Vedic knowledge and physics converge as unbounded intelligence.",
        "Brain Coherence — synchronized cortical activity supporting clarity and integration.",
        "Association Fibers — networks that unify perception, memory, and decision-making.",
      ],
    },
    {
      title: "Technologies of Consciousness",
      desc:
        "Evidence-based practices that refine awareness, support physiological balance, and align life with natural law.",
      cards: [
        "TM & Advanced Techniques — effortless transcending for clarity and deep rest.",
        "Breathwork & Pranayama — balancing nervous system and emotional stability.",
        "Ayurveda & Daily Routines — aligning lifestyle with nature’s rhythms.",
        "Jyotish, Vastu & Vedic Modalities — harmonizing with cosmic intelligence.",
      ],
    },
    {
      title: "Growth & Transformation",
      desc:
        "As awareness expands, life reorganizes—clarity grows, stress dissolves, and higher capabilities emerge.",
      cards: [
        "Stress Dissolution — deep rest removes fatigue and accumulated tension.",
        "Emotional Stability — coherence brings calmness and resilience.",
        "Mental Clarity — attention sharpens and decision-making becomes effortless.",
        "Creativity & Intelligence — higher consciousness awakens insight and possibility.",
        "Purpose & Fulfillment — life aligns with natural law and meaning.",
        "Harmonious Living — integration across work, health, and relationships.",
      ],
    },
    {
      title: "Unity & Purpose",
      desc:
        "With increasing clarity, life feels meaningful, guided, and naturally supported by inner intelligence.",
      cards: [
        "Living Purposefully — action guided by inner knowing.",
        "Inner Alignment — connection to awareness brings steadiness and intuition.",
        "Harmonious Action — decisions arise naturally and flow with support.",
        "Meaningful Relationships — deeper authenticity and mutual upliftment.",
      ],
    },
    {
      title: "A Conscious Society",
      desc:
        "As individuals awaken, collective coherence grows—reshaping culture, leadership, education, and innovation.",
      cards: [
        "Collective Coherence — rising harmony and wellbeing at scale.",
        "Conscious Leadership — clarity-based decision-making and wisdom.",
        "A Culture of Wellbeing — institutions aligned with human flourishing.",
        "Conscious Education — inner development and practical learning combined.",
        "Conscious Innovation — progress guided by sustainability and insight.",
        "Social Harmony — communities become supportive and purpose-driven.",
      ],
    },
    {
      title: "Conscious Living",
      desc:
        "Where refined awareness expresses itself naturally in daily routines, relationships, environment, and intention.",
      cards: [
        "Daily Routines — living with natural rhythms for clarity and health.",
        "Environment & Home — spaces that support coherence and balance.",
        "Relationships & Communication — connecting with authenticity and presence.",
        "Spiritual Lifestyle — integrating awareness through every moment.",
      ],
    },
  ];

  return (
    <section className="bg-[#FFF8EE] py-20">
      <div className="max-w-6xl mx-auto px-6 space-y-28">

        {sections.map((sec, i) => (
          <div key={i} className="space-y-10">

            {/* Title Block */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-[#D3631E] tracking-wide">
                {sec.title}
              </h2>
              <p className="text-slate-700 text-lg max-w-3xl mx-auto leading-relaxed">
                {sec.desc}
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-[#E7A56F] to-[#C74D11] mx-auto rounded-full"></div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sec.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#FFE8D1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-slate-700 text-base leading-snug">
                    {card}
                  </p>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
