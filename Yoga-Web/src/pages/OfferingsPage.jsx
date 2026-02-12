import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Star, Gift, Users, Zap, Shield, Award, Headphones, TrendingUp, MessageCircle, X, CreditCard, Banknote, Menu } from 'lucide-react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube , faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './water-section.css';

// --- HELPER ICONS ---
const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

// --- HELPER: RAZORPAY SCRIPT LOADER ---
const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
    document.body.appendChild(script);
  });
};

// --- PAYMENT FORM COMPONENT ---
const PaymentForm = ({ amount: initialAmount, onBack, setPaymentMessage }) => {
    const [amount, setAmount] = useState(initialAmount || "");
    const [mode, setMode] = useState("upi");
    const [upiId, setUpiId] = useState("");
    const [cardholderName, setCardholderName] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!amount || !mode) {
            setPaymentMessage({ type: 'error', text: 'Please ensure amount and payment mode are set.' });
            return;
        }

        setLoading(true);
        try {
            await loadRazorpayScript();

            // NOTE: This requires a running backend server at the specified URL.
            const resp = await axios.post("http://localhost:4000/api/create-order", {
                amount: Math.round(Number(amount) * 100), // Convert rupees to paise
                currency: "INR",
            });

            const { order, keyId } = resp.data;

            const options = {
                key: keyId,
                amount: order.amount,
                currency: order.currency,
                name: "Atmarisa",
                description: "Journey to Inner Peace",
                order_id: order.id,
                handler: function (response) {
                    // NOTE: This requires a running backend server to verify the payment.
                    axios.post("/api/verify-payment", response).then((res) => {
                        if (res.data.ok) {
                            setPaymentMessage({ type: 'success', text: 'Payment Successful!' });
                        } else {
                            setPaymentMessage({ type: 'error', text: 'Payment Verification Failed.' });
                        }
                    }).catch(() => {
                        setPaymentMessage({ type: 'error', text: 'Could not verify payment.' });
                    });
                },
                prefill: {
                    ...(mode === "upi" ? { method: "upi", vpa: upiId } : { name: cardholderName }),
                    email: "", 
                    contact: "",
                },
                theme: { color: "#8B5CF6" }, // Purple theme for Razorpay modal
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            setPaymentMessage({ type: 'error', text: 'Payment could not be started. Is the backend server running?' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 p-6 animate-fadeIn">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Final Step: Payment
                </h2>
                <p className="text-center text-gray-500 mb-8">Securely complete your transaction.</p>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Amount (₹)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                        placeholder="Enter amount"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Mode of Payment</label>
                    <div className="grid grid-cols-2 gap-4">
                         <button onClick={() => setMode('upi')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition ${mode === 'upi' ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-gray-100 border-gray-200'}`}>
                            <Banknote className="w-5 h-5" /> UPI
                        </button>
                        <button onClick={() => setMode('card')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition ${mode === 'card' ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-gray-100 border-gray-200'}`}>
                            <CreditCard className="w-5 h-5" /> Card
                        </button>
                    </div>
                </div>

                {mode === 'upi' && (
                    <div className="mb-6 animate-fadeIn">
                        <label className="block text-sm font-medium text-gray-600 mb-2">UPI ID</label>
                        <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                            placeholder="yourname@upi"
                        />
                    </div>
                )}
                
                {mode === 'card' && (
                    <div className="mb-6 animate-fadeIn">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Cardholder Name</label>
                        <input
                            type="text"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                            placeholder="Name as it appears on card"
                        />
                    </div>
                )}

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {loading ? "Processing..." : `Pay ₹${amount || 0}`}
                </button>
                <button 
                    onClick={onBack} 
                    className="w-full mt-4 text-center text-gray-500 hover:text-purple-600 transition-colors duration-300"
                >
                    &larr; Back to Summary
                </button>
            </div>
        </div>
    );
};

// --- PLAN SUMMARY COMPONENT ---
const PlanSummary = ({ plan, onBack, onProceedToPayment }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 p-6 animate-fadeIn">
             <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                    Complete Your Purchase
                </h1>
                <p className="text-gray-600 mb-6">You have selected the <span className="font-bold text-gray-800">{plan.name}</span> plan.</p>
                
                <div className="bg-gray-100 rounded-xl p-6 mb-8">
                    <p className="text-lg text-gray-500">Total Amount (in INR)</p>
                    <p className="text-5xl font-bold text-gray-900 my-2">
                        ₹{plan.price}
                    </p>
                </div>

                <button 
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-4"
                    onClick={onProceedToPayment}
                >
                    Pay with Razorpay
                </button>

                <button 
                    onClick={onBack} 
                    className="text-gray-500 hover:text-purple-600 transition-colors duration-300"
                >
                    &larr; Go Back to Plans
                </button>
            </div>
        </div>
    );
};

// --- MESSAGE MODAL COMPONENT ---
const MessageModal = ({ message, setMessage }) => {
    if (!message) return null;

    const isSuccess = message.type === 'success';
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message, setMessage]);

    return (
        <div className="fixed top-5 right-5 z-[100] bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-4 flex items-center gap-4 animate-fadeIn border"
            style={{ borderColor: isSuccess ? 'rgb(34 197 94)' : 'rgb(239 68 68)'}}>
            <div className={`w-2.5 h-2.5 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className="text-gray-700">{message.text}</p>
            <button onClick={() => setMessage(null)} className="text-gray-400 hover:text-gray-700">&times;</button>
        </div>
    );
}

const Section = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Navigate Life with Greater Clarity</h1>
        <p>
          Personalized guidance from an expert trained in Maharishi Technologies
          of Consciousness. Get ongoing support, accountability, and access to
          time-tested techniques for deeper clarity and growth.
        </p>
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---
const OfferingsPage = () => {
    const [showMainOfferings, setShowMainOfferings] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [chatOpen, setChatOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // View management state
    const [view, setView] = useState('offerings'); // 'offerings', 'summary', 'payment'
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentMessage, setPaymentMessage] = useState(null); // {type: 'success' | 'error', text: '...'}


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / 20;
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
        card.style.transition = 'transform 0.1s ease';
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        card.style.transition = 'transform 0.5s ease';
    };

    const handlePlanSelection = (plan) => {
        const priceValue = parseInt(plan.price.replace('$', '').replace('₹',''));
        setSelectedPlan({ name: plan.name, price: priceValue });
        setView('summary');
    };

    const mainPlans = [
        { name: 'Initiate', price: '₹2400', period: '/month', features: ['Access to Core Meditations', 'Community Forum', 'Basic Support', 'Progress Tracking'], color: 'from-cyan-400 to-blue-500', popular: false },
        { name: 'Ascend', price: '₹4900', period: '/month', features: ['Everything in Initiate', 'Exclusive Workshops', 'Priority Support', 'Advanced Analytics', 'Guided Journals'], color: 'from-purple-500 to-pink-500', popular: true },
        { name: 'Enlighten', price: '₹8200', period: '/month', features: ['Everything in Ascend', 'Personalized Coaching', '24/7 Premium Support', 'Retreat Discounts', 'API Access'], color: 'from-amber-400 to-orange-500', popular: false }
    ];

    const additionalPlans = [
        { icon: <Star className="w-8 h-8" />, name: 'Starter Kit', price: '₹1500', desc: 'Perfect for beginners', color: 'from-green-400 to-teal-500' },
        { icon: <Gift className="w-8 h-8" />, name: 'Bundle Pack', price: '₹12400', desc: 'Best value package', color: 'from-yellow-400 to-orange-500' },
        { icon: <Users className="w-8 h-8" />, name: 'Team Plan', price: '₹16500', desc: 'For growing teams', color: 'from-indigo-400 to-purple-500' },
        { icon: <Zap className="w-8 h-8" />, name: 'Performance', price: '₹6500', desc: 'Speed optimization', color: 'from-pink-400 to-rose-500' },
    ];

    const carouselItems = [
        { title: 'Begin with a Free Demo', desc: 'Experience our platform with no commitment', bg: 'from-blue-500 to-purple-600' },
        { title: '20% Off Group Bookings', desc: 'Save more when you book multiple services', bg: 'from-green-500 to-teal-600' },
        { title: 'Gift a Journey of Peace', desc: 'Purchase a gift card for your loved ones', bg: 'from-orange-500 to-pink-600' }
    ];

    // --- RENDER LOGIC BASED ON VIEW STATE ---
    if (view === 'summary') {
        return <PlanSummary plan={selectedPlan} onBack={() => setView('offerings')} onProceedToPayment={() => setView('payment')} />;
    }

    if (view === 'payment') {
        return <PaymentForm amount={selectedPlan.price} onBack={() => setView('summary')} setPaymentMessage={setPaymentMessage} />;
    }
    
    return (
        <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 text-gray-800 font-sans animate-gradient-shift">
            <MessageModal message={paymentMessage} setMessage={setPaymentMessage} />

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
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
                       {["Home", "About", "Sessions", "Learn", "Contact"].map((item) => (
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
                       {["Home", "About", "Sessions", "Learn", "Contact"].map((item) => (
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
            
            <Section/>
            <div className="relative pt-24 min-h-screen">
                <div className={`transition-all duration-1000 ease-in-out ${showMainOfferings ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'}`}>
                    <div className="container mx-auto px-8 py-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600" style={{ textShadow: '0 2px 20px rgba(168, 85, 247, 0.3)'}}>
                            Choose Your Path to Peace
                        </h1>
                        <p className="text-center text-slate-500 mb-16 text-lg md:text-xl animate-fadeIn animation-delay-200">Unlock a deeper connection with yourself and the world around you.</p>

                        <div className="flex flex-wrap justify-center gap-10 mb-16">
                            {mainPlans.map((plan, index) => (
                                <div key={plan.name}
                                    className={`relative bg-white/60 backdrop-blur-xl border border-white rounded-3xl p-8 w-full max-w-sm cursor-pointer shadow-2xl animate-slideUp group`}
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}>
                                    
                                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 rounded-3xl transition-opacity duration-500 group-hover:opacity-10`}></div>
                                    <div className={`absolute inset-0 rounded-3xl ring-2 ring-inset ring-transparent group-hover:ring-purple-300 transition-all duration-500`}></div>

                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-glow">Most Popular</div>
                                    )}
                                    
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-bold mb-4 text-gray-900">{plan.name}</h3>
                                        <div className="flex items-baseline mb-6"><span className={`text-6xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>{plan.price}</span><span className="text-gray-500 ml-2">{plan.period}</span></div>
                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center text-gray-600"><Check className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" /><span>{feature}</span></li>
                                            ))}
                                        </ul>
                                        <button onClick={() => handlePlanSelection(plan)} className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r ${plan.color} text-white font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>Begin Journey</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center animate-bounce-slow">
                            <button onClick={() => setShowMainOfferings(false)} className="group flex flex-col items-center mx-auto text-purple-600 hover:text-pink-500 transition-colors duration-300">
                                <span className="text-xl font-semibold mb-2 drop-shadow-lg">Explore More Offerings</span>
                                <ChevronDown className="w-10 h-10 group-hover:animate-pulse" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`transition-all duration-1000 ease-in-out ${!showMainOfferings ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'}`}>
                    <div className="container mx-auto px-8 py-16">
                        <div className="mb-16 relative">
                            <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/20">
                                <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                    {carouselItems.map((item, index) => (
                                        <div key={index} className={`min-w-full h-64 bg-gradient-to-r ${item.bg} flex flex-col justify-center items-center text-white p-8 relative`}>
                                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                                            <h2 className="text-4xl font-bold mb-4 animate-fadeIn z-10">{item.title}</h2>
                                            <p className="text-xl opacity-90 animate-fadeIn animation-delay-200 z-10">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4 space-x-2">{carouselItems.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-slate-800 w-8' : 'bg-slate-400'}`} />))}</div>
                        </div>

                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg">Add-On Services & Packages</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {additionalPlans.map((plan, index) => (
                                <div key={plan.name} className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer shadow-xl animate-slideUp" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} text-white mb-4 shadow-lg`}>{plan.icon}</div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4 text-sm">{plan.desc}</p>
                                    <div className="flex items-baseline justify-between">
                                        <span className={`text-3xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>{plan.price}</span>
                                        <button onClick={() => handlePlanSelection(plan)} className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/20">Select</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-16">
                            <button onClick={() => setShowMainOfferings(true)} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl">Back to Main Plans</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-8 right-8 z-50">
                {!chatOpen ? (
                    <button onClick={() => setChatOpen(true)} className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-4 shadow-2xl transform transition-all duration-300 hover:scale-110 animate-glow">
                        <MessageCircle className="w-8 h-8" />
                    </button>
                ) : (
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-slideUp border">
                        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800">How can I help?</h3><button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-800 transition-colors"><X className="w-5 h-5" /></button></div>
                        <p className="text-gray-600">I'm here to help you choose the perfect plan. What are you looking for?</p>
                        <div className="mt-4 space-y-2">
                            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm text-gray-700">Compare plans</button>
                            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm text-gray-700">Get recommendation</button>
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
                .animate-gradient-shift { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
                @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
                .animate-blob { animation: blob 10s infinite ease-in-out; }
                .animation-delay-2000 { animation-delay: -2s; }
                .animation-delay-4000 { animation-delay: -4s; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
                .animate-slideUp { animation: slideUp 0.6s ease-out forwards; opacity: 0; }
                .animation-delay-200 { animation-delay: 0.2s; }
                @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.7); } 50% { box-shadow: 0 0 35px rgba(168, 85, 247, 0.9); } }
                .animate-glow { animation: glow 4s infinite ease-in-out; }
                @keyframes bounce-slow { 0%, 100% { transform: translateY(-10%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }
                .animate-bounce-slow { animation: bounce-slow 2s infinite; }
            `}</style>

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

export default OfferingsPage;

