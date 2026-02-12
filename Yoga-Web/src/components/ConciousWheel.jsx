import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConsciousnessWheel = () => {
    const [selectedSegment, setSelectedSegment] = useState(0);
    const [rotation, setRotation] = useState(0);

    const wheelData = [
        {
            title: "Light",
            description: "Illumination of consciousness through mindful awareness and clarity of perception, creating inner radiance and spiritual brightness.",
            color: "#8B5CF6",
            lightColor: "#C4B5FD"
        },
        {
            title: "Sound",
            description: "Vibrational healing through sacred mantras, sound therapy, and the resonant frequencies that harmonize mind and body.",
            color: "#7C3AED",
            lightColor: "#C4B5FD"
        },
        {
            title: "Smell",
            description: "Aromatic consciousness practices using essential oils, incense, and natural fragrances to enhance meditation depth.",
            color: "#6D28D9",
            lightColor: "#DDD6FE"
        },
        {
            title: "Touch",
            description: "Physical awareness through mindful movement, massage therapy, and tactile meditation practices that ground the spirit.",
            color: "#5B21B6",
            lightColor: "#DDD6FE"
        },
        {
            title: "Mind & Body",
            description: "Integration of mental and physical wellness through holistic practices that unite consciousness with corporeal experience.",
            color: "#4C1D95",
            lightColor: "#E9D5FF"
        },
        {
            title: "Taste",
            description: "Mindful eating practices, conscious nutrition, and the sacred act of nourishing the body with awareness and gratitude.",
            color: "#581C87",
            lightColor: "#E9D5FF"
        },
        {
            title: "Sleep",
            description: "Restorative consciousness practices including deep sleep techniques, dream work, and nocturnal meditation methods.",
            color: "#6B21A8",
            lightColor: "#F3E8FF"
        },
        {
            title: "Food",
            description: "Sacred relationship with nutrition, mindful consumption, and understanding food as medicine for body and soul.",
            color: "#7E22CE",
            lightColor: "#F3E8FF"
        },
        {
            title: "Purification",
            description: "Cleansing practices for mind, body, and spirit including detoxification, breathwork, and energetic clearing techniques.",
            color: "#9333EA",
            lightColor: "#FAF5FF"
        },
        {
            title: "Home",
            description: "Creating sacred spaces, environmental harmony, and conscious living practices that support spiritual growth.",
            color: "#A855F7",
            lightColor: "#FAF5FF"
        },
        {
            title: "Education",
            description: "Lifelong learning in consciousness studies, spiritual wisdom, and the continuous expansion of awareness and knowledge.",
            color: "#B91C1C",
            lightColor: "#FEF2F2"
        },
        {
            title: "Time",
            description: "Sacred relationship with temporal flow, present moment awareness, and the conscious use of time for spiritual development.",
            color: "#DC2626",
            lightColor: "#FEF2F2"
        },
        {
            title: "Relationships",
            description: "Conscious connection with others, heartful communication, and the practice of loving-kindness in all interactions.",
            color: "#EF4444",
            lightColor: "#FEE2E2"
        },
        {
            title: "Sight",
            description: "Visual consciousness practices including meditation on beauty, sacred geometry, and developing inner and outer vision.",
            color: "#F97316",
            lightColor: "#FFF7ED"
        }
    ];

    const segmentAngle = 360 / wheelData.length;

    const handleSegmentClick = (index) => {
        const targetAngle = index * segmentAngle;
        const currentNormalizedRotation = rotation % 360;
        let rotationDiff = targetAngle - currentNormalizedRotation;

        if (rotationDiff > 180) {
            rotationDiff -= 360;
        } else if (rotationDiff < -180) {
            rotationDiff += 360;
        }

        setRotation(rotation + rotationDiff);
        setSelectedSegment(index);
    };

    const createSegmentPath = (index, innerRadius = 80, outerRadius = 180) => {
        const angle = segmentAngle;
        const startAngle = (index * angle - angle / 2) * Math.PI / 180;
        const endAngle = (index * angle + angle / 2) * Math.PI / 180;

        const x1 = Math.cos(startAngle) * innerRadius;
        const y1 = Math.sin(startAngle) * innerRadius;
        const x2 = Math.cos(endAngle) * innerRadius;
        const y2 = Math.sin(endAngle) * innerRadius;
        const x3 = Math.cos(endAngle) * outerRadius;
        const y3 = Math.sin(endAngle) * outerRadius;
        const x4 = Math.cos(startAngle) * outerRadius;
        const y4 = Math.sin(startAngle) * outerRadius;

        const largeArcFlag = angle > 180 ? 1 : 0;

        return `M ${x1} ${y1} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
    };

    const getTextPosition = (index, radius = 130) => {
        const angle = (index * segmentAngle) * Math.PI / 180;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    };

    return (
        <div className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                        The Wheel of Consciousness Progress
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        A 360° Framework for Modern Living
                    </p>
                    <p className="text-base text-slate-500 mt-4 max-w-4xl mx-auto">
                        The Wheel of Consciousness maps out 14 essential areas of life, each one supported by time-tested
                        Technologies of Consciousness—including:
                    </p>
                    <div className="mt-6 space-y-2 text-sm text-purple-700">
                        <p>• Ayurvedic lifestyle & nutrition</p>
                        <p>• Vedic sound & light therapy</p>
                        <p>• Yoga & breathwork</p>
                        <p>• Consciousness-based health, architecture, and behavioral tools</p>
                    </div>
                    <p className="text-sm text-slate-500 mt-6 max-w-4xl mx-auto">
                        These modalities complement TM by addressing physical health, emotional resilience, purpose, relationships,
                        environment, and more.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Interactive Progress Wheel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-medium text-slate-700 mb-2">Interactive Progress Wheel</h3>
                            <p className="text-sm text-slate-500 max-w-xs">
                                Click on any segment to explore precision-targeted Technologies of Consciousness
                                that accelerate holistic growth and create balance in every area of life.
                            </p>
                        </div>

                        <div className="relative w-96 h-96">
                            <svg width="400" height="400" className="absolute inset-0">
                                <g transform="translate(200, 200)">
                                    <motion.g
                                        animate={{ rotate: -rotation }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    >
                                        {wheelData.map((segment, index) => (
                                            <motion.path
                                                key={index}
                                                d={createSegmentPath(index)}
                                                fill={index === selectedSegment ? segment.color : segment.lightColor}
                                                stroke="white"
                                                strokeWidth="2"
                                                className="cursor-pointer transition-all duration-300"
                                                onClick={() => handleSegmentClick(index)}
                                                whileHover={{
                                                    scale: 1.05,
                                                    filter: "brightness(1.1)"
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            />
                                        ))}

                                        {/* Text labels */}
                                        {wheelData.map((segment, index) => {
                                            const pos = getTextPosition(index);
                                            return (
                                                <motion.text
                                                    key={`text-${index}`}
                                                    x={pos.x}
                                                    y={pos.y}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className={`text-xs font-medium cursor-pointer ${
                                                        index === selectedSegment ? 'fill-white' : 'fill-slate-600'
                                                    }`}
                                                    onClick={() => handleSegmentClick(index)}
                                                    initial={{ opacity: 0 }}
                                                    // ⭐ MODIFICATION START
                                                    animate={{ 
                                                        opacity: 1, 
                                                        rotate: rotation // Apply counter-rotation
                                                    }}
                                                    transition={{
                                                        // Animate opacity on initial load
                                                        opacity: { delay: index * 0.1 + 0.5, duration: 0.5 },
                                                        // Animate rotation to match the wheel's animation
                                                        rotate: { duration: 0.8, ease: "easeInOut" }
                                                    }}
                                                    // ⭐ MODIFICATION END
                                                >
                                                    {segment.title}
                                                </motion.text>
                                            );
                                        })}

                                    </motion.g>

                                    {/* Center circle */}
                                    <motion.circle
                                        cx="0"
                                        cy="0"
                                        r="75"
                                        fill="url(#centerGradient)"
                                        stroke="white"
                                        strokeWidth="3"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1, duration: 0.5 }}
                                    />
                                    <defs>
                                        <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#F3E8FF" />
                                            <stop offset="100%" stopColor="#E9D5FF" />
                                        </linearGradient>
                                    </defs>
                                </g>
                            </svg>

                            {/* Selection Indicator */}
                            <motion.div
                                className="absolute top-1/2 right-2 w-4 h-4"
                                style={{ transform: 'translateY(-50%)' }}
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Holistic Development Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:w-1/2 max-w-md"
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                                Holistic Development
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                The beauty of Transcendental Meditation lies in its holistic nature. As you
                                practice regularly, all areas of life naturally improve together, creating a
                                balanced and fulfilling existence.
                            </p>
                            <p className="text-sm text-slate-500 mt-3">
                                Click any segment above to explore specific benefits.
                            </p>
                        </div>

                        {/* Selected Segment Details */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedSegment}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                                className="relative"
                            >
                                {/* Popup Card */}
                                <motion.div
                                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-purple-100"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        x: -30
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: 0
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25
                                    }}
                                    style={{
                                        background: `linear-gradient(135deg, ${wheelData[selectedSegment].lightColor}E6, white)`,
                                        borderColor: wheelData[selectedSegment].color + '40'
                                    }}
                                >
                                    {/* Connection Line Animation */}
                                    <motion.div
                                        className="absolute left-0 top-1/2 w-8 h-0.5 -translate-x-8 -translate-y-1/2"
                                        style={{ backgroundColor: wheelData[selectedSegment].color }}
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 32, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.4 }}
                                    />

                                    {/* Floating indicator */}
                                    <motion.div
                                        className="absolute -left-2 top-1/2 w-3 h-3 rounded-full -translate-y-1/2"
                                        style={{ backgroundColor: wheelData[selectedSegment].color }}
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            boxShadow: [
                                                `0 0 0 0px ${wheelData[selectedSegment].color}40`,
                                                `0 0 0 8px ${wheelData[selectedSegment].color}20`,
                                                `0 0 0 0px ${wheelData[selectedSegment].color}40`
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: wheelData[selectedSegment].color }}
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            <h4
                                                className="text-xl font-semibold"
                                                style={{ color: wheelData[selectedSegment].color }}
                                            >
                                                {wheelData[selectedSegment].title}
                                            </h4>
                                        </div>

                                        <motion.p
                                            className="text-slate-600 leading-relaxed text-sm"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {wheelData[selectedSegment].description}
                                        </motion.p>
                                    </div>

                                    {/* Decorative Elements */}
                                    <motion.div
                                        className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-60"
                                        style={{ backgroundColor: wheelData[selectedSegment].color }}
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.6, 1, 0.6]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-3 right-4 w-1.5 h-1.5 rounded-full opacity-40"
                                        style={{ backgroundColor: wheelData[selectedSegment].color }}
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.4, 0.8, 0.4]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Bottom Description */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mt-16 max-w-4xl mx-auto"
                >
                    <p className="text-sm text-slate-500 leading-relaxed italic">
                        "This comprehensive approach ensures that your growth is not just mental or spiritual,
                        but encompasses every aspect of human experience, creating lasting transformation
                        that radiates through all areas of life."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ConsciousnessWheel;