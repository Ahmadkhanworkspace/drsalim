'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book } from '@/data/books';

interface PremiumBookShowcaseProps {
    books: Book[];
}

export default function PremiumBookShowcase({ books }: PremiumBookShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % books.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
    };

    return (
        <div className="relative py-24 overflow-visible">
            {/* Background Decorative Mesh (Crimson) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_50%_50%,rgba(153,0,0,0.08),transparent_70%)] blur-[100px]" />
            </div>

            <div className="flex items-center justify-center min-h-[650px] relative z-10">
                
                {/* Carousel Navigation - Ultra Minimalist (Stone & Crimson) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-30 pointer-events-none px-4 lg:-mx-16">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -8 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSlide}
                        className="w-16 h-16 rounded-none bg-stone-50 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.2)] flex items-center justify-center text-charcoal-950 pointer-events-auto border border-stone-200 hover:bg-crimson-500 hover:text-white transition-colors duration-500"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, x: 8 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="w-16 h-16 rounded-none bg-stone-50 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.2)] flex items-center justify-center text-charcoal-950 pointer-events-auto border border-stone-200 hover:bg-crimson-500 hover:text-white transition-colors duration-500"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </motion.button>
                </div>

                {/* Main Showcase Area */}
                <div className="relative w-full max-w-6xl min-h-[500px] lg:h-[600px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: direction > 0 ? -50 : 50, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center py-8 lg:py-0"
                        >
                            {/* Book Visual - Crimson Spine Detail */}
                            <div className="relative perspective-[2000px] flex justify-center w-full">
                                <motion.div 
                                    whileHover={{ rotateY: -12, rotateX: 2, scale: 1.05 }}
                                    className="relative w-[260px] h-[380px] sm:w-[340px] sm:h-[500px] shadow-[40px_40px_80px_-20px_rgba(0,0,0,0.5)] group transition-all duration-700"
                                >
                                    {/* Spine Depth (Crimson Accent) */}
                                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-black/60 via-crimson-600/20 to-transparent z-10 border-r border-white/5" />
                                    
                                    {/* Cover Content (Charcoal & Stone) */}
                                    <div className="absolute inset-0 bg-charcoal-900 rounded-r-sm overflow-hidden" style={{ backgroundColor: 'hsl(var(--charcoal-900))' }}>
                                        {/* Background Texture */}
                                        <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: 'url("/section-bg.png")' }} />
                                        
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 text-center border-y-[20px] border-crimson-500/10" style={{ borderColor: 'hsla(0, 100%, 30%, 0.1)' }}>
                                            <motion.div 
                                                animate={{ opacity: [0.3, 0.5, 0.3] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                                className="text-crimson-500 mb-4 sm:mb-8"
                                                style={{ color: 'hsl(var(--crimson-500))' }}
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 sm:w-24 sm:h-24">
                                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                                                    <path d="M6.5 2H20v20H6.5" />
                                                </svg>
                                            </motion.div>
                                            <h4 className="text-stone-100 font-heading text-xl sm:text-3xl mb-2 sm:mb-4 leading-tight tracking-tight">{books[currentIndex].title}</h4>
                                            <div className="w-12 sm:w-16 h-[1px] bg-crimson-500/40" style={{ backgroundColor: 'hsla(0, 100%, 30%, 0.4)' }} />
                                            <p className="mt-4 sm:mt-8 text-[8px] sm:text-[10px] text-stone-400 uppercase tracking-[0.3em] font-black">Official Edition</p>
                                        </div>
                                    </div>
                                    
                                    {/* Crimson Edge Detail */}
                                    <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-crimson-500/30" style={{ backgroundColor: 'hsla(0, 100%, 30%, 0.3)' }} />
                                </motion.div>
                            </div>

                            {/* Book Info - Crimson & Charcoal Accent */}
                            <div className="text-center lg:text-left flex flex-col justify-center px-4 sm:px-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <span className="text-crimson-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 sm:mb-8 block" style={{ color: 'hsl(var(--crimson-500))' }}>
                                        Book Details
                                    </span>
                                    
                                    <h3 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 sm:mb-8 leading-[1.1] lg:leading-[0.9] font-heading tracking-tighter">
                                        {books[currentIndex].title}
                                    </h3>
                                    
                                    <p className="text-base sm:text-xl text-stone-400 mb-8 sm:mb-12 leading-relaxed max-w-lg font-light tracking-wide italic border-t-2 sm:border-t-0 sm:border-l-2 border-crimson-500/20 pt-4 sm:pt-0 sm:pl-8 mx-auto lg:mx-0" style={{ borderLeftColor: 'hsla(0, 100%, 30%, 0.2)', borderTopColor: 'hsla(0, 100%, 30%, 0.2)' }}>
                                        {books[currentIndex].description}
                                    </p>
                                    
                                    <div className="flex items-center justify-center lg:justify-start gap-12">
                                        <a
                                            href={books[currentIndex].amazonLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-crimson-500 text-white font-black uppercase tracking-widest text-[9px] sm:text-[10px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(153,0,0,0.3)]"
                                            style={{ backgroundColor: 'hsl(var(--crimson-500))' }}
                                        >
                                            <span className="relative z-10">Buy on Amazon</span>
                                            <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                            <span className="absolute inset-0 flex items-center justify-center bg-stone-900 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">Buy Now</span>
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Imperial Pagination (Crimson) */}
            <div className="flex justify-center gap-6 mt-16">
                {books.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className="group flex flex-col items-center gap-3"
                    >
                        <div className={`h-[1px] transition-all duration-700 ${
                            currentIndex === idx ? 'w-16 bg-crimson-500' : 'w-8 bg-charcoal-800 group-hover:bg-charcoal-700'
                        }`} 
                        style={{ backgroundColor: currentIndex === idx ? 'hsl(var(--crimson-500))' : undefined }}
                        />
                    </button>
                ))}
            </div>

        </div>
    );
}


