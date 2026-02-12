import React, { useState, useEffect, useRef } from 'react';
import { Menu as Menu } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube , faLinkedin } from '@fortawesome/free-brands-svg-icons';
/* ------------------ ICONS ------------------ */
const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

/* ------------------ NAVBAR ------------------ */
const Navbar = ({ scrolled, mobileMenuOpen, setMobileMenuOpen }) => {
    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 
                ${scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "py-4"}`}
            style={{
                background: scrolled
                    ? undefined
                    : "linear-gradient(90deg, #ebe7df, #fdf7e8, #fffcea, #f7e8e3, #e0e0e0)",
                borderBottom: "1px solid rgba(0,0,0,0.18)",
            }}
        >
            <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                <div className="text-[1.8rem] tracking-[0.45em] font-light bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm transition-all duration-300 hover:brightness-110">
                    ATMARISA
                </div>

                <ul className="hidden md:flex gap-12 items-center">
                    {["Home", "About","Technologies", "Sessions", "Learn", "Contact"].map((item) => (
                        <li key={item} className="relative group">
                            <a
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-[1.06rem] font-medium text-gray-800 transition-colors duration-300 group-hover:text-purple-600"
                            >
                                {item}
                            </a>
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

                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
                    <Menu />
                </button>
            </div>

            <div
                className={`md:hidden fixed inset-x-0 top-[60px] bg-white/95 backdrop-blur-xl transition-all duration-500 ease-in-out
                ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
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

/* ------------------ LEAVES ANIMATION ------------------ */
const LeavesAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let leaves = [];
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight;
        };

        const mouse = { x: null, y: null, radius: 150 };

        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        class Leaf {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -canvas.height;
                this.size = Math.random() * 20 + 10;
                this.speed = Math.random() * 2 + 1;
                this.angle = Math.random() * 360;
                this.spin = Math.random() < 0.5 ? -1 : 1;
                this.color = `rgba(167, 139, 250, ${Math.random() * 0.5 + 0.3})`;
            }

            update() {
                this.y += this.speed;
                this.angle += this.spin * 0.5;
                if (this.y > canvas.height) {
                    this.y = Math.random() * -100 - 20;
                    this.x = Math.random() * canvas.width;
                }

                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const maxPush = 5;
                        this.x += forceDirectionX * force * maxPush;
                        this.y += forceDirectionY * force * maxPush;
                    }
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle * Math.PI / 180);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(this.size / 2, -this.size / 4, this.size, -this.size / 2, this.size, 0);
                ctx.bezierCurveTo(this.size, this.size / 2, this.size / 2, this.size / 4, 0, 0);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        const init = () => {
            leaves = [];
            let leafCount = (canvas.width * canvas.height) / 20000;
            if (leafCount > 100) leafCount = 100;
            for (let i = 0; i < leafCount; i++) leaves.push(new Leaf());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            leaves.forEach((leaf) => {
                leaf.update();
                leaf.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        init();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            init();
        });

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

/* ------------------ CONTACT SECTION ------------------ */
const ContactSection = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [scheduledEvent, setScheduledEvent] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        const submissionData = { ...formData, scheduledEvent };

        try {
            const response = await fetch("http://localhost:4000/api/users/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setStatus("success");
            setFormData({ fullName: '', email: '', phone: '', message: '' });
            setShowCalendar(false);
            setScheduledEvent(null);
            setTimeout(() => setStatus(""), 3000);
        } catch (error) {
            setStatus("error");
        }
    };

    const isCheckboxDisabled =
        !formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim();

    useEffect(() => {
        if (isCheckboxDisabled) setShowCalendar(false);
    }, [isCheckboxDisabled]);

    return (
        <>
            <section id="contact" className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
                <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
                <LeavesAnimation />

                <div className="container mx-auto max-w-2xl text-center z-10">
                    
                    {/* ------------------ NEW CONTACT FORM UI (MATCHES IMAGE) ------------------ */}
                    <div className="bg-white/70 backdrop-blur-lg p-10 md:p-12 rounded-2xl shadow-xl border border-white">

                        {/* Title */}
                        <h2
  className="
    text-5xl font-serif mb-4 
    bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 
    bg-clip-text text-transparent 
    drop-shadow-[0_2px_12px_rgba(255,180,200,0.45)]
  "
>
  Contact
</h2>


                        <p className="text-gray-600 text-lg mb-10">
                            Interested in starting a journey or have questions?
                        </p>

                        {/* Email + WhatsApp */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                            <a href="mailto:info@atmarisa.com"
                                className="text-purple-700 underline text-lg hover:text-purple-900">
                                info@atmarisa.com
                            </a>

                            <span className="text-gray-500 hidden md:block">or</span>

                            <a href="#"
                                className="flex items-center gap-2 bg-white px-8 py-3 rounded-full shadow-lg border border-gray-200 text-gray-700 font-semibold tracking-wide hover:shadow-xl transition-all">
                                <span className="text-green-500 text-xl">💬</span>
                                MESSAGE ON WHATSAPP
                            </a>
                        </div>

                        {/* Divider */}
                        <p className="text-gray-500 mb-6">Or use the form below</p>

                        <form onSubmit={handleSubmit} className="space-y-6 text-left">

                            <input
                                type="text"
                                name="fullName"
                                placeholder="Your Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-800 placeholder-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-800 placeholder-gray-400"
                            />

                            <textarea
                                name="message"
                                rows="4"
                                placeholder="How can we help?"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-800 placeholder-gray-400"
                            ></textarea>

                            <label className={`flex items-center space-x-2 ${isCheckboxDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
                                <input
                                    type="checkbox"
                                    checked={showCalendar}
                                    onChange={(e) => setShowCalendar(e.target.checked)}
                                    disabled={isCheckboxDisabled}
                                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                />
                                <span className="text-sm text-gray-700">Schedule a Demo?</span>
                            </label>

                            {showCalendar && (
                                <div className="rounded-lg overflow-hidden border border-gray-300 transition-all duration-300">
                                    <InlineWidget
                                        url="https://calendly.com/wattamwararyan396/30min"
                                        onEventScheduled={(e) => setScheduledEvent(e.data.payload)}
                                        styles={{ height: "700px" }}
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full mt-6 bg-white text-gray-900 border border-gray-300 font-semibold tracking-widest py-4 rounded-full hover:shadow-xl transition-all"
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? "Sending..." : "SEND MESSAGE"}
                            </button>
                        </form>

                        {status === "success" && <p className="text-green-600 mt-4 text-center">Thank you for your message! We'll get back to you soon.</p>}
                        {status === "error" && <p className="text-red-600 mt-4 text-center">Something went wrong. Please try again.</p>}
                    </div>
                </div>
            </section>

            {/* ------------------ ORIGINAL FOOTER ------------------ */}
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

        </>
    );
};

export default ContactSection;
