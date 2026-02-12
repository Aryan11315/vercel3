// components/Stats.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    {
      number: 5,
      suffix: 'M+',
      label: 'People Practicing Worldwide',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      number: 400,
      suffix: '+',
      label: 'Scientific Studies Published',
      color: 'from-slate-600 to-gray-700'
    },
    {
      number: 50,
      suffix: '+',
      label: 'Years of Modern Teaching',
      color: 'from-amber-600 to-stone-600'
    }
  ];

  const AnimatedCounter = ({ number, suffix, delay = 0 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => {
          const duration = 2000;
          const increment = number / (duration / 16);
          let current = 0;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= number) {
              setCount(number);
              clearInterval(counter);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);

          return () => clearInterval(counter);
        }, delay);

        return () => clearTimeout(timer);
      }
    }, [number, delay]);

    return (
      <span className="text-6xl md:text-7xl font-light">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-stone-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4">
            Our Global Impact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4`}>
                  <AnimatedCounter
                    number={stat.number}
                    suffix={stat.suffix}
                    delay={index * 200}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.5 + index * 0.2 }}
                  className="h-1 w-16 bg-gradient-to-r from-gray-300 to-emerald-400 mx-auto mb-6 rounded-full"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.8 + index * 0.2 }}
                  className="text-slate-700 text-lg font-medium"
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
