import React, { useState, useEffect, useRef } from 'react';

// A reusable component for fade-in-on-scroll animations
const AnimatedSection = ({ children, className }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(sectionRef.current);
                }
            },
            {
                rootMargin: '0px',
                threshold: 0.2
            }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`${className} transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {children}
        </div>
    );
};


// Main component for the "Our Journey" section
const JourneySection = () => {
    // --- STATE & REFS ---
    const [activeJourney, setActiveJourney] = useState(0);
    const [journeyPoints, setJourneyPoints] = useState([]);
    const [pathLength, setPathLength] = useState(0);
    const [progress, setProgress] = useState(0);
    const journeyPathRef = useRef(null);
    
    // The SVG path definition for our journey line
    const pathD = "M 50 128 C 250 50, 550 200, 750 128";

    const journeyData = [
        { year: "2018", title: "The Spark of an Idea", description: "It all began with a simple question: 'How can we make mindfulness accessible to everyone?' This spark ignited our mission to create a space for peace and personal growth." },
        { year: "2019", title: "Building the Foundation", description: "Our passionate team of developers and meditation experts came together to build the first version of our app, focusing on core principles of usability and authentic teachings." },
        { year: "2021", title: "A Community Sprouts", description: "We launched our beta program and were overjoyed by the positive feedback. A small but dedicated community started to form, sharing stories and supporting one another." },
        { year: "2023", title: "Expanding Horizons", description: "With new guided courses, live sessions, and teacher training programs, we expanded our offerings to serve a rapidly growing global user base across 50 countries." },
        { year: "Today", title: "A Global Movement", description: "What started as an idea is now a thriving global movement. We continue to innovate, inspired by our community, to bring the benefits of mindfulness to the world." },
    ];

    // --- EFFECTS ---

    // Effect to calculate path length and milestone coordinates on mount
    useEffect(() => {
        const pathNode = journeyPathRef.current;
        if (pathNode) {
            const totalLength = pathNode.getTotalLength();
            setPathLength(totalLength);

            const points = journeyData.map((_, index) => {
                const percentage = index / (journeyData.length - 1);
                return pathNode.getPointAtLength(totalLength * percentage);
            });
            setJourneyPoints(points);
            
            // Set initial progress to the first point
            setProgress(0);
        }
    }, [journeyData.length]);

    // --- HANDLERS ---
    
    // Handles clicking on a milestone
    const handleMilestoneClick = (index) => {
        setActiveJourney(index);
        const targetProgress = index / (journeyData.length - 1);
        setProgress(targetProgress);
    };

    // --- RENDER ---
    return (
        <>
            {/* We inject some CSS for the animations into the head */}
            <style>{`
                @keyframes background-pan {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animated-gradient {
                    background-size: 200% 200%;
                    animation: background-pan 15s ease infinite;
                }
                @keyframes text-fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .journey-text-enter {
                    animation: text-fade-in 0.5s ease-out forwards;
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7); }
                    50% { box-shadow: 0 0 10px 8px rgba(168, 85, 247, 0); }
                }
                .pulse-active {
                    animation: pulse-glow 2s infinite;
                }
            `}</style>

            <section id="journey" className="py-24 px-6 bg-gradient-to-br from-gray-50 via-purple-50 to-rose-50 animated-gradient">
                <AnimatedSection className="container mx-auto max-w-5xl text-center">
                    <h2 className="text-4xl md:text-5xl font-thin mb-6 text-gray-800">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Our Journey</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-20">Follow our path from a simple idea to a global community dedicated to mindfulness.</p>
                    
                    <div className="relative w-full h-64">
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 256">
                             {/* SVG Filters for glow effect */}
                            <defs>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#A855F7" />
                                    <stop offset="100%" stopColor="#EC4899" />
                                </linearGradient>
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            {/* The dashed background path */}
                            <path ref={journeyPathRef} d={pathD} stroke="#E9D5FF" strokeWidth="2" fill="none" strokeDasharray="5 5"/>
                            
                            {/* The solid, animated progress path */}
                            <path 
                                d={pathD}
                                stroke="url(#line-gradient)" 
                                strokeWidth="3" 
                                fill="none"
                                style={{
                                    strokeDasharray: pathLength,
                                    strokeDashoffset: pathLength * (1 - progress),
                                    transition: 'stroke-dashoffset 3s cubic-bezier(0.45, 0, 0.55, 1)'
                                }}
                            />

                            {/* Plane Icon animated along the path */}
                            <g style={{ 
                                offsetPath: `path('${pathD}')`,
                                offsetDistance: `${progress * 100}%`,
                                offsetRotate: 'auto',
                                transition: 'offset-distance 3s cubic-bezier(0.45, 0, 0.55, 1)',
                                filter: 'url(#glow)'
                            }}>
                                <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600 drop-shadow-lg -rotate-45">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </g>
                            
                            {/* Milestone buttons rendered inside the SVG */}
                            {journeyPoints.length > 0 && journeyData.map((event, index) => (
                                <foreignObject key={index} x={journeyPoints[index].x - 16} y={journeyPoints[index].y - 16} width="32" height="32" className="overflow-visible">
                                    <button 
                                      onClick={() => handleMilestoneClick(index)} 
                                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-125 cursor-pointer ${activeJourney === index ? 'bg-white border-purple-500 scale-125 pulse-active' : 'bg-white/80 border-gray-300'}`}
                                      aria-label={`Go to milestone: ${event.title}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full transition-all duration-300 ${activeJourney === index ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-300'}`}></div>
                                    </button>
                                </foreignObject>
                            ))}
                        </svg>
                    </div>

                    <div className="mt-12 min-h-[150px] text-left bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white max-w-2xl mx-auto">
                        {/* The key prop forces re-render and re-triggers the CSS animation */}
                        <div key={activeJourney} className="journey-text-enter">
                            <p className="text-sm font-semibold text-purple-500 mb-2">{journeyData[activeJourney].year}</p>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{journeyData[activeJourney].title}</h3>
                            <p className="text-gray-700 leading-relaxed">{journeyData[activeJourney].description}</p>
                        </div>
                    </div>
                </AnimatedSection>
            </section>
        </>
    );
};

export default JourneySection

