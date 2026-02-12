import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data for the research studies ---
// In a real application, this would likely come from an API.
const researchData = [
    {
        title: "Effects of the Transcendental Meditation Technique on Trait Anxiety: A Meta-Analysis of Randomized Controlled Trials",
        authors: "Orme-Johnson, D. W., & Barnes, V. A. (2014) - The Journal of Alternative and Complementary Medicine",
        journalImpact: 2.6,
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3921027/",
        details: "This meta-analysis synthesized the results of 16 randomized controlled trials and found that Transcendental Meditation practice is highly effective in reducing trait anxiety, with an effect size that is significantly larger than that of other meditation and relaxation techniques."
    },
    {
        title: "Contemplative Mental Training Reduces Hair Glucocorticoid Levels in a Randomized Clinical Trial",
        authors: "Engert, V., et al. (2021) - Psychosomatic Medicine",
        journalImpact: 4.6,
        link: "https://pubmed.ncbi.nlm.nih.gov/28731836/",
        details: "This landmark study demonstrated that long-term contemplative practice can lead to a significant reduction in cortisol concentrations in hair, a reliable biomarker for chronic stress. This provides physiological evidence for the stress-reducing effects of sustained meditation."
    },
    {
        title: "Improving the mental health and well-being of healthcare providers using the transcendental meditation technique during the COVID-19 pandemic",
        authors: "Wentz, A. E., et al. (2022) - PLoS ONE",
        journalImpact: 3.7,
        link: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0262747",
        details: "During the intense pressure of the COVID-19 pandemic, healthcare providers who practiced Transcendental Meditation reported significant reductions in burnout, anxiety, and insomnia compared to a control group, highlighting its effectiveness as a tool for resilience in high-stress professions."
    },
    {
        title: "Effects of Mindfulness-Based Interventions on Salivary Cortisol in Healthy Adults: A Meta-Analytical Review",
        authors: "Sanada, K., et al. (2016) - Frontiers in Physiology",
        journalImpact: 4.0,
        link: "https://www.frontiersin.org/articles/10.3389/fphys.2016.00270/full",
        details: "A comprehensive review analyzing multiple studies concluded that mindfulness-based interventions have a small but significant effect on reducing salivary cortisol levels, suggesting that regular practice can help regulate the body's primary stress hormone response."
    }
];

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 opacity-50 group-hover:opacity-100 transition-opacity">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);


const ResearchSection = () => {
    // State to keep track of which card is expanded. null means none are expanded.
    const [expandedIndex, setExpandedIndex] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    const detailsVariants = {
        collapsed: { opacity: 0, height: 0, marginTop: 0 },
        open: { 
            opacity: 1, 
            height: 'auto', 
            marginTop: '16px',
            transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }
        }
    };

    return (
        <motion.section 
            className="py-20 px-6 bg-stone-100/70"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="max-w-4xl mx-auto">
                <motion.h2 
                    className="text-4xl md:text-5xl font-light text-center mb-4 bg-gradient-to-r from-rose-500 via-orange-500 to-rose-600 bg-clip-text text-transparent"
                    variants={itemVariants}
                >
                    Supporting Research for Stress & Anxiety
                </motion.h2>

                <motion.p 
                    className="text-center text-slate-500 mb-12"
                    variants={itemVariants}
                >
                    Click any study title to collapse/expand details
                </motion.p>

                <motion.div 
                    className="space-y-4"
                    variants={containerVariants}
                >
                    {researchData.map((item, index) => {
                        const isExpanded = index === expandedIndex;
                        return (
                            <motion.div key={item.title} variants={itemVariants} layout>
                                <motion.div
                                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-stone-200 cursor-pointer transition-all duration-300 hover:border-rose-300 hover:shadow-lg"
                                    whileHover={{ scale: 1.02,
                                         boxShadow: "0 10px 25px rgba(239, 68, 68, 0.1)" }}
                                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                >
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex-1">
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()} // Prevents the card from collapsing when the link is clicked
                                                className="text-lg font-medium text-slate-800 group transition-colors hover:text-rose-600"
                                            >
                                                {item.title}
                                                <ExternalLinkIcon />
                                            </a>
                                            <p className="text-sm text-slate-500 mt-2">
                                                {item.authors} (<span className="text-purple-600 font-medium">Journal Impact Factor: {item.journalImpact}</span>)
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-rose-500">
                                            <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
                                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                variants={detailsVariants}
                                                initial="collapsed"
                                                animate="open"
                                                exit="collapsed"
                                                className="overflow-hidden"
                                            >
                                                <p className="text-slate-600 leading-relaxed border-t border-stone-200 pt-4 mt-4">
                                                    {item.details}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ResearchSection;