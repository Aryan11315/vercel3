import React, { useState, useRef, useEffect } from 'react';

const MeditationBook = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [flippedPagesCount, setFlippedPagesCount] = useState(0);

    const content = [
        { title: "A Journey Begins", text: "Welcome. Within these pages, you'll discover the profound yet simple practice of meditation. It's a path to inner peace, clarity, and a more joyful existence." },
        { title: "Effortless Stress Relief", text: "Discover how meditation calms your nervous system and reduces cortisol levels. It's a natural antidote to the pressures of the modern world, bringing tranquility to your daily life." },
        { title: "Enhanced Performance", text: "Learn to sharpen your focus, improve concentration, and boost creativity. Meditation trains your mind to stay present, helping you perform at your peak in both personal and professional settings." },
        { title: "Deeper Life Satisfaction", text: "Cultivate a greater sense of gratitude, joy, and connection. By fostering self-awareness, meditation helps you appreciate the present moment and find more meaning in your life." },
        { title: "Emotional Balance", text: "Observe your emotions without judgment. Meditation creates a space between stimulus and response, allowing you to react to situations with more wisdom and less impulsivity." },
        { title: "Improved Relationships", text: "By fostering empathy and understanding, meditation helps improve your connections with others, leading to more harmonious and meaningful relationships." },
        { title: "Physical Well-being", text: "The benefits extend to the body, with studies showing meditation can lower blood pressure, improve sleep quality, and boost the immune system." },
        { title: "The Path Forward", text: "Your journey doesn't end here. Consistent practice is key. May you carry the peace and clarity you've found into every moment of your life. The path is always open." }
    ];

    const flippableLeavesData = [];
    for (let i = 1; i < content.length - 1; i += 2) {
        flippableLeavesData.push({
            front: content[i],
            back: content[i + 1],
            frontPageNum: i + 1,
            backPageNum: i + 2,
        });
    }

    const leafRefs = useRef([]);
    const flippedRef = useRef(flippedPagesCount);
    useEffect(() => { flippedRef.current = flippedPagesCount; }, [flippedPagesCount]);

    const TOP_BASE = 1000;

    const [leafOrder, setLeafOrder] = useState(
        () => flippableLeavesData.map((_, i) => TOP_BASE - i)
    );

    useEffect(() => {
        const handlers = [];
        leafRefs.current = leafRefs.current.slice(0, flippableLeavesData.length);

        flippableLeavesData.forEach((_, idx) => {
            const el = leafRefs.current[idx];
            if (!el) return;

            const handler = (e) => {
                if (e.propertyName !== 'transform' || e.target !== el) return;
                const isNowFlipped = idx < flippedRef.current;
                setLeafOrder(prev => {
                    const arr = [...prev];
                    if (isNowFlipped) {
                        arr[idx] = idx;
                    } else {
                        arr[idx] = TOP_BASE - idx;
                    }
                    return arr;
                });
            };

            el.addEventListener('transitionend', handler);
            handlers.push({ el, handler });
        });

        return () => {
            handlers.forEach(({ el, handler }) => el.removeEventListener('transitionend', handler));
        };
    }, [flippableLeavesData.length]);

    const handleOpenBook = () => {
        setIsOpen(true);
    };

    const handleFlipPage = (direction) => {
        if (direction === 'next' && flippedPagesCount < flippableLeavesData.length) {
            const idx = flippedPagesCount;
            setLeafOrder(prev => {
                const arr = [...prev];
                arr[idx] = TOP_BASE + 10000 + idx;
                return arr;
            });
            setFlippedPagesCount(prev => prev + 1);
        } else if (direction === 'prev' && flippedPagesCount > 0) {
            const idx = flippedPagesCount - 1;
            setLeafOrder(prev => {
                const arr = [...prev];
                arr[idx] = TOP_BASE + 10000 + idx;
                return arr;
            });
            setFlippedPagesCount(prev => prev - 1);
        }
    };

    const isPrevDisabled = flippedPagesCount === 0;
    const isNextDisabled = flippedPagesCount >= flippableLeavesData.length;

    const PageContent = ({ page, number }) => {
        if (!page) return <div className="page-content-wrapper"></div>;
        return (
            <div className="page-content-wrapper">
                <h2 className="page-title">{page.title}</h2>
                <p className="page-text">{page.text}</p>
                <span className="page-number">{number}</span>
            </div>
        );
    };

    return (
        <>
            <style jsx global>{`
                :root {
                    --cover-bg: #1a2a47; /* Deep navy blue */
                    --spine-bg: #111d33;
                    --page-bg: #f3f0e9; /* Soft, elegant cream */
                    --text-color: #3b3a36;
                    --title-color: #c89c3c; /* Gold accent */
                    --shadow-color: rgba(0, 0, 0, 0.3);
                    --book-height: 75vh;
                }
                
                .scene {
                    background: radial-gradient(circle, #f5f5f5 0%, #d3d3d3 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    padding: 2rem;
                    box-sizing: border-box;
                    perspective: 2500px;
                    overflow: hidden; /* Added to prevent scrollbars on smaller devices */
                }

                /* --- STYLING THE CLOSED BOOK --- */
                .closed-book-cover {
                    width: calc(var(--book-height) * 0.7);
                    height: var(--book-height);
                    position: absolute;
                    transform-style: preserve-3d;
                    transform: rotateY(-35deg) rotateX(15deg);
                    transition: all 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                    cursor: pointer;
                    background-color: var(--cover-bg);
                    border-radius: 8px;
                    box-shadow: 
                        5px 5px 20px var(--shadow-color),
                        0 0 5px rgba(0,0,0,0.1) inset;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 1.5rem;
                    z-index: 100;
                }

                .closed-book-cover::before {
                    content: '';
                    position: absolute;
                    left: 10px;
                    top: 2%;
                    width: 5px;
                    height: 96%;
                    background: var(--spine-bg);
                    box-shadow: 2px 0 5px rgba(0,0,0,0.3);
                }
                
                .closed-book-cover.opening {
                    opacity: 0;
                    visibility: hidden;
                    transform: rotateY(0deg) rotateX(0deg) scale(1.2);
                }
                
                .cover-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.2rem;
                    color: var(--title-color);
                    text-align: center;
                    border: 2px solid var(--title-color);
                    padding: 0.8rem 1.5rem;
                    text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
                    box-shadow: 0 0 10px -2px var(--title-color);
                }

                .cover-subtitle {
                    color: #fff;
                    margin-top: 1rem;
                    font-style: italic;
                    font-family: 'Lora', serif;
                    opacity: 0.8;
                }

                /* --- STYLING THE OPEN BOOK --- */
                .book {
                    width: calc(var(--book-height) * 1.4); /* cover width * 2 */
                    height: var(--book-height);
                    position: relative;
                    transform-style: preserve-3d;
                    opacity: 0;
                    visibility: hidden;
                    transform: scale(0.8);
                    transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.5s;
                }
                
                .book.open {
                    opacity: 1;
                    visibility: visible;
                    transform: scale(1);
                }
                
                .book-leaf {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    transform-origin: left center;
                    transition: transform 1.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
                    transform-style: preserve-3d;
                    will-change: transform;
                }
                
                .book-leaf.flipped {
                    transform: rotateY(-180deg);
                }
                
                .page-front, .page-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: var(--page-bg);
                    backface-visibility: hidden;
                    padding: 2.5rem;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                }
                
                .page-front {
                    border-radius: 0 6px 6px 0;
                    box-shadow: inset -3px 0px 4px -2px rgba(0,0,0,0.1), 3px 3px 10px -2px var(--shadow-color);
                }
                
                .page-back {
                    transform: rotateY(180deg);
                    border-radius: 6px 0 0 6px;
                    box-shadow: inset 3px 0px 4px -2px rgba(0,0,0,0.1), -3px 3px 10px -2px var(--shadow-color);
                }

                .book-cover-static {
                    position: absolute;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    background: var(--page-bg);
                    box-sizing: border-box;
                    padding: 2.5rem;
                }
                
                .book-cover-static.left {
                    left: 0;
                    border-radius: 6px 0 0 6px;
                    box-shadow: inset 3px 0px 4px -2px rgba(0,0,0,0.2), -5px 0 15px -5px var(--shadow-color);
                }
                
                .book-cover-static.right {
                    right: 0;
                    border-radius: 0 6px 6px 0;
                    box-shadow: inset -3px 0px 4px -2px rgba(0,0,0,0.2), 5px 0 15px -5px var(--shadow-color);
                }

                .page-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.2rem;
                    color: var(--title-color);
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid #c89c3c80;
                    padding-bottom: 0.5rem;
                }
                
                .page-text {
                    font-family: 'Lora', serif;
                    font-size: 0.85rem;
                    line-height: 1.8;
                    color: var(--text-color);
                    flex-grow: 1; /* Allow text to fill space */
                }
                
                .page-number {
                    position: absolute;
                    bottom: 1.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 0.75rem;
                    color: #9e9e9e;
                    font-family: 'Lora', serif;
                }

                .page-flipper {
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.5s ease-out 1.5s;
                    margin-top: 2rem;
                }
                
                .page-flipper.visible {
                    opacity: 1;
                    visibility: visible;
                }
                
                .page-flipper button {
                    background-color: transparent;
                    color: var(--text-color);
                    font-family: 'Playfair Display', serif;
                    font-weight: bold;
                    border: 2px solid var(--cover-bg);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                }
                
                .page-flipper button:hover:not(:disabled) {
                    background-color: var(--cover-bg);
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
                }
                
                .page-flipper button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    border-color: #9e9e9e;
                    color: #9e9e9e;
                }

                /* --- RESPONSIVE STYLES --- */

                /* Tablet view */
                @media (max-width: 1024px) {
                    :root {
                        --book-height: 70vh;
                    }
                    .page-title {
                        font-size: 1.1rem;
                        margin-bottom: 1rem;
                    }
                    .page-text {
                        font-size: 0.8rem;
                        line-height: 1.7;
                    }
                    .page-front, .page-back, .book-cover-static {
                        padding: 2rem;
                    }
                    .cover-title {
                        font-size: 2rem;
                    }
                }

                /* Mobile view */
                @media (max-width: 767px) {
                    :root {
                        --book-height: 65vh;
                    }
                    .scene {
                        padding: 1rem;
                    }
                    .book {
                        width: 90vw; /* Use viewport width for better control */
                        height: calc(90vw / 1.4); /* Maintain aspect ratio */
                    }
                    .closed-book-cover {
                        width: 60vw;
                        height: calc(60vw / 0.7);
                    }
                    .cover-title {
                        font-size: 1.5rem;
                        padding: 0.5rem 1rem;
                    }
                    .cover-subtitle {
                        font-size: 0.9rem;
                    }
                    .page-front, .page-back, .book-cover-static {
                        padding: 1.2rem;
                    }
                    .page-title {
                        font-size: 0.9rem;
                        margin-bottom: 0.8rem;
                    }
                    .page-text {
                        font-size: 0.65rem; /* Smaller font for readability */
                        line-height: 1.6;
                    }
                    .page-number {
                        bottom: 0.8rem;
                        font-size: 0.6rem;
                    }
                    .page-flipper {
                        margin-top: 1.5rem;
                    }
                    .page-flipper button {
                        padding: 0.4rem 1rem; /* Adjust button padding */
                        font-size: 0.8rem;
                    }
                }

                 /* Special case for landscape mobile */
                 @media (max-width: 767px) and (orientation: landscape) {
                    :root {
                        --book-height: 80vh;
                    }
                    .book {
                        width: 70vh;
                        height: calc(70vh / 1.4);
                    }
                     .closed-book-cover {
                        width: 45vh;
                        height: calc(45vh / 0.7);
                    }
                    .scene {
                       justify-content: flex-start; /* Prevent buttons from being cut off */
                       padding-top: 4rem;
                       padding-bottom: 4rem;
                    }
                 }
            `}</style>

            <div className="scene">
                <div
                    className={`closed-book-cover ${isOpen ? 'opening' : ''}`}
                    onClick={!isOpen ? handleOpenBook : undefined}
                >
                    <h1 className="cover-title">The Art of Meditation</h1>
                    <p className="cover-subtitle">Click to open</p>
                </div>

                <div className={`book ${isOpen ? 'open' : ''}`}>
                    <div className="book-cover-static left">
                        <PageContent page={content[0]} number={1} />
                    </div>

                    <div className="book-cover-static right">
                        <PageContent page={content[content.length - 1]} number={content.length} />
                    </div>

                    {flippableLeavesData.map((leafData, index) => (
                        <div
                            key={index}
                            ref={el => { leafRefs.current[index] = el; }}
                            className={`book-leaf ${index < flippedPagesCount ? 'flipped' : ''}`}
                            style={{ zIndex: leafOrder[index] }}
                        >
                            <div className="page-front">
                                <PageContent page={leafData.front} number={leafData.frontPageNum} />
                            </div>
                            <div className="page-back">
                                <PageContent page={leafData.back} number={leafData.backPageNum} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`page-flipper w-full max-w-sm flex justify-between ${isOpen ? 'visible' : ''}`}>
                    <button
                        className="px-6 py-2 text-sm rounded-full"
                        onClick={() => handleFlipPage('prev')}
                        disabled={isPrevDisabled}
                    >
                        Previous
                    </button>
                    <button
                        className="px-6 py-2 text-sm rounded-full"
                        onClick={() => handleFlipPage('next')}
                        disabled={isNextDisabled}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default MeditationBook;