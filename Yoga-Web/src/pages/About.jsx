import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ChevronDown, Menu, X, Heart, Star, Sparkles, Wind, Waves, Users, UserCheck, Mountain, Smile, Feather } from 'lucide-react';
import JourneySection from '../components/Journey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube , faLinkedin } from '@fortawesome/free-brands-svg-icons';
import image from "../assets/ChatGPT Image Jan 14, 2026, 11_58_49 AM.png"
import FounderSection from '../components/SweetLady';
// Custom Hook: Detects when an element is visible on screen for animations.
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

// Main Component
const About = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroCanvasRef = useRef(null);
    const ctaCanvasRef = useRef(null);
    const journeyPathRef = useRef(null);
    const [journeyPathLength, setJourneyPathLength] = useState(0);
    const [journeyPoints, setJourneyPoints] = useState([]);


    // --- EFFECT HOOKS ---

    // Navbar scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Journey Path Length Calculation and Point Alignment
    useLayoutEffect(() => {
        const path = journeyPathRef.current;
        // Function to calculate points
        const calculatePoints = () => {
            if (path) {
                const totalLength = path.getTotalLength();
                if (totalLength > 0) {
                    setJourneyPathLength(totalLength);

                    const points = journeyData.map((_, index) => {
                        const progress = index / (journeyData.length - 1);
                        const { x, y } = path.getPointAtLength(totalLength * progress);
                        // These are now SVG coordinates, not CSS percentages
                        return { x, y };
                    });
                    setJourneyPoints(points);
                }
            }
        };
        
        calculatePoints(); // Initial calculation

        // Recalculate on resize for responsiveness
        const resizeObserver = new ResizeObserver(calculatePoints);
        if (path) {
            resizeObserver.observe(path);
        }
        return () => resizeObserver.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Hero Section Canvas Animation
    useEffect(() => {
        const canvas = heroCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let particles = [];
        class Particle {
            constructor() {
                this.x = Math.random() * width; this.y = Math.random() * height + height;
                this.speed = Math.random() * 1.5 + 0.5; this.radius = Math.random() * 2.5 + 1;
                this.opacity = Math.random() * 0.4 + 0.2; this.color = `rgba(233, 213, 255, ${this.opacity})`;
            }
            draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); }
            update() { this.y -= this.speed; if (this.y < -this.radius) { this.y = height + this.radius; this.x = Math.random() * width; } this.draw(); }
        }
        const init = () => { particles = []; for (let i = 0; i < 100; i++) particles.push(new Particle()); };
        let animationFrameId;
        const animate = () => { ctx.clearRect(0, 0, width, height); particles.forEach(p => p.update()); animationFrameId = requestAnimationFrame(animate); };
        const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; init(); };
        init(); animate(); window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); };
    }, []);
    
    // CTA Section Canvas Animation
    useEffect(() => {
        const canvas = ctaCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let stars = [];
        class StarParticle {
            constructor() {
                this.x = Math.random() * width; this.y = Math.random() * height;
                this.radius = Math.random() * 1.5 + 0.5; this.vx = (Math.random() - 0.5) * 0.2; this.vy = (Math.random() - 0.5) * 0.2;
                this.opacity = Math.random() * 0.5 + 0.5;
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; ctx.fill();
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                this.draw();
            }
        }
        const init = () => { stars = []; for (let i = 0; i < 150; i++) stars.push(new StarParticle()); };
        let animationFrameId;
        const animate = () => { ctx.clearRect(0, 0, width, height); stars.forEach(s => s.update()); animationFrameId = requestAnimationFrame(animate); };
        const handleResize = () => { width = canvas.width = canvas.offsetWidth; height = canvas.height = canvas.offsetHeight; init(); };
        init(); animate(); window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); };
    }, []);

    // --- COMPONENTS ---

    // Section wrapper for slide-up animations
    const AnimatedSection = ({ children, className = "" }) => {
        const [ref, isVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        return (
            <div ref={ref} className={`transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                {children}
            </div>
        );
    };
    
    // --- DATA ---
    
    const offerings = [
        { icon: <Wind size={36} />, title: "Guided Meditation", description: "Expert-led sessions to deepen your practice.", gradient: "from-violet-500 to-purple-600" },
        { icon: <Heart size={36} />, title: "Mindfulness Training", description: "Practical techniques for daily awareness.", gradient: "from-pink-500 to-rose-600" },
        { icon: <Sparkles size={36} />, title: "Spiritual Workshops", description: "Immersive experiences in ancient wisdom.", gradient: "from-amber-500 to-orange-600" },
        { icon: <Waves size={36} />, title: "Sound Bath Healing", description: "Find deep relaxation through resonant frequencies.", gradient: "from-cyan-500 to-blue-600" },
        { icon: <Users size={36} />, title: "Corporate Wellness", description: "Bring balance and focus to your workplace.", gradient: "from-emerald-500 to-green-600" },
        { icon: <UserCheck size={36} />, title: "Personal Coaching", description: "One-on-one guidance on your spiritual path.", gradient: "from-fuchsia-500 to-purple-600" },
        { icon: <Mountain size={36} />, title: "Silent Retreats", description: "Disconnect to reconnect with your inner self.", gradient: "from-sky-500 to-indigo-600" },
        { icon: <Smile size={36} />, title: "Kids Mindfulness", description: "Playful programs to nurture young minds.", gradient: "from-yellow-400 to-amber-500" },
        { icon: <Feather size={36} />, title: "Breathwork Sessions", description: "Harness the power of your breath for clarity.", gradient: "from-rose-400 to-red-500" },
    ];

    const founders = [
        { name: "Adrian Cole", description: "With over 15 years of practice, Arjun brings ancient Vedic wisdom to modern practitioners.", gradient: "from-indigo-500 to-purple-600" },
        { name: "Elena Pierce", description: "A certified coach and yoga instructor, Priya specializes in stress reduction and emotional wellness.", gradient: "from-pink-500 to-rose-600" },
        { name: "Julian Hart", description: "Combining psychology with Eastern philosophy, Ravi creates unique programs for modern challenges.", gradient: "from-teal-500 to-cyan-600" }
    ];

    const journeyData = [
        { year: "Year 1", title: "Foundation & Vision", description: "Atmarisa was born from a vision to make mindfulness accessible. We began with local workshops, building a foundational community of 100 members." },
        { year: "Year 2", title: "Growth & Digital Expansion", description: "We launched our online platform, developed core digital courses, and grew our community to over 5,000 members worldwide." },
        { year: "Year 3", title: "Impact & Innovation", description: "This year, we focus on deepening our impact with corporate wellness programs, personalized coaching, and a new mobile app." }
    ];
    
    const [activeJourney, setActiveJourney] = useState(0);
    const journeyProgress = activeJourney / (journeyData.length - 1);
    
    // --- RENDER ---
    
    return (
        <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans">
             <style>{`
                /* Keyframe animations for background blobs */
                @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
                .animate-blob { animation: blob 8s infinite ease-in-out; }
                .animation-delay-2000 { animation-delay: -2s; } .animation-delay-4000 { animation-delay: -4s; }
                
                /* Keyframes for Hero section elements */
                @keyframes subtleGlow { from { filter: drop-shadow(0 0 15px rgba(233, 213, 255, 0.3)); } to { filter: drop-shadow(0 0 30px rgba(233, 213, 255, 0.6)); } }
                @keyframes float { from { transform: translateY(0px); } to { transform: translateY(-20px); } }

                /* Styles for Offering cards hover effect */
                .offering-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 1.25rem; 
                    border: 2px solid transparent; background: linear-gradient(135deg, #8B5CF6, #EC4899) border-box; 
                    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: destination-out; mask-composite: exclude;
                    opacity: 0; transition: opacity 0.5s ease; pointer-events: none; }
                .offering-card:hover::before { opacity: 1; }

                /* Journey section animation */
                .journey-text-enter { animation: fadeIn 0.5s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                /* CSS for the animated journey path and plane */
                #plane-container {
                    offset-path: path("M 50 128 C 250 50, 550 200, 750 128");
                    offset-rotate: auto;
                    transition: offset-distance 1s cubic-bezier(0.45, 0, 0.55, 1);
                }
             `}</style>
            
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
            </div>

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




            <section
  id="home"
  className="relative h-screen min-h-[650px] flex items-center justify-center text-center text-white overflow-hidden"
  style={{
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Soft dim overlay */}
  <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"></div>

  {/* Text block */}
  <div className="relative z-20 px-6 max-w-4xl mx-auto">
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
  Guiding Individuals Into Higher States of
  <br />
  <span className="block mt-2">Clarity and Conscious Living</span>
</h1>



    <p className="mt-6 text-base md:text-lg font-light max-w-2xl mx-auto text-white/90 leading-relaxed px-6 md:px-10">
  A Consciousness Advisor® dedicated to helping you expand awareness,
  dissolve inner friction, and live in alignment with natural law.
</p>


    
  </div>

  {/* Chevron indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
    <ChevronDown className="w-8 h-8 text-white/60" />
  </div>
</section>
<FounderSection/>
            
            <section id="about" className="py-24 px-6 bg-cyan-50/30">
                <AnimatedSection className="container mx-auto max-w-5xl">
                     <h2 className="text-4xl md:text-5xl font-thin text-center mb-20 text-gray-800"><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Meet Our Founders</span></h2>
                    <div className="space-y-20">
                        {founders.map((founder, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                 <div className={`relative w-56 h-56 rounded-full bg-gradient-to-br ${founder.gradient} flex-shrink-0 group shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
                                     <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center p-2"><div className="text-7xl">👤</div></div>
                                     <div className={`absolute inset-0 rounded-full border-4 border-white/50 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 ease-in-out`}></div>
                                 </div>
                                <div className={`flex-1 text-center ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                                    <h3 className="text-3xl font-semibold mb-4 text-gray-800">{founder.name}</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">{founder.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </section>
            
            <section id="journey" className="py-24 px-6 bg-amber-50/40">
                 <JourneySection/>
            </section>
            
            <section
  id="contact"
  className="py-24 px-6 bg-[#FAFAF8] text-center"
>
  <AnimatedSection className="max-w-3xl mx-auto">
    
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2E3A44] mb-6">
      Begin Your Consciousness Journey
    </h2>

    {/* Sub Text */}
    <p className="text-base md:text-lg text-[#4A5560] leading-relaxed max-w-2xl mx-auto mb-10">
      Experience the clarity and inner coherence that come from working at the 
      level of consciousness. Explore the Consciousness Advisor sessions 
      and start reconnecting with your deepest intelligence.
    </p>

    {/* Button */}
    <button
      onClick={() => (window.location.href = "/contact")}
      className="px-8 py-4 rounded-full bg-[#DCC8A2] text-[#3C3B37] font-medium transition-all duration-300 hover:bg-[#CBB690] hover:shadow-md"
    >
      Explore Sessions
    </button>

  </AnimatedSection>
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
};

export default About;

