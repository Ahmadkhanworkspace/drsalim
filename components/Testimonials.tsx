'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/data/testimonials';

interface TestimonialsSliderProps {
    testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="section relative overflow-hidden bg-charcoal-900 border-t border-white/5">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-crimson-500/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/section-bg.png')] opacity-5 grayscale mix-blend-overlay" />
            </div>

            <div className="container relative z-10">
                
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <span className="text-crimson-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">
                        Voices of Enlightenment
                    </span>
                    <h2 className="text-5xl md:text-8xl text-white font-bold mb-10 tracking-tighter">
                        Scholarly <span className="text-crimson-500 font-serif-italic font-normal px-2">Impact</span>
                    </h2>
                    <div className="w-24 h-[1px] bg-crimson-500/30 mx-auto" />
                </div>

                {/* Slider Container */}
                <div className="max-w-6xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="glass-card p-12 md:p-24 relative group"
                        >
                            {/* Decorative Large Quote */}
                            <div className="absolute top-12 left-12 text-crimson-500/10 pointer-events-none select-none">
                                <span className="text-[15rem] leading-none font-heading italic">"</span>
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl md:text-4xl font-heading italic text-stone-200 leading-relaxed text-center mb-20 max-w-4xl"
                                >
                                    "{currentTestimonial.content}"
                                </motion.p>

                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-none bg-charcoal-950 flex items-center justify-center mb-8 border border-crimson-500/30 relative overflow-hidden group-hover:border-crimson-500 transition-colors duration-700">
                                        <div className="absolute inset-0 bg-crimson-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <span className="text-3xl font-bold text-crimson-500 relative z-10">
                                            {currentTestimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-2xl font-bold text-white mb-6 tracking-tight">{currentTestimonial.name}</h4>
                                        <div className="flex gap-2 justify-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-crimson-500/40">
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Sophisticated Controls */}
                    <div className="flex justify-center items-center gap-12 mt-16">
                        <button
                            onClick={prevSlide}
                            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 hover:text-white transition-all duration-500"
                        >
                            <span className="w-12 h-[1px] bg-stone-800 group-hover:bg-crimson-500 group-hover:w-20 transition-all duration-700" />
                            <span>Previous</span>
                        </button>
                        
                        <div className="text-stone-600 text-[10px] font-black tracking-[0.2em]">
                            <span className="text-crimson-500">{String(currentIndex + 1).padStart(2, '0')}</span>
                            <span className="mx-2">/</span>
                            <span>{String(testimonials.length).padStart(2, '0')}</span>
                        </div>

                        <button
                            onClick={nextSlide}
                            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 hover:text-white transition-all duration-500"
                        >
                            <span>Next</span>
                            <span className="w-12 h-[1px] bg-stone-800 group-hover:bg-crimson-500 group-hover:w-20 transition-all duration-700" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
