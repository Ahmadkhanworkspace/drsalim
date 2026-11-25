'use client';

import { useState } from 'react';
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
        <section id="testimonials" className="bg-[#FAF7F2] border-b border-[#E3DBD0] py-20 sm:py-28">
            <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1C1C] mb-2 block">
                        Reader Accolades & Endorsements
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1715] tracking-tight font-heading">
                        Reader <span className="text-[#7A1C1C] font-serif italic font-normal">Reflections</span>
                    </h2>
                </div>

                {/* Card */}
                <div className="bg-white border border-[#E3DBD0] rounded-3xl p-8 sm:p-14 shadow-sm text-center space-y-7">
                    <p className="text-xl sm:text-2xl font-serif italic text-[#1A1715] leading-relaxed max-w-2xl mx-auto">
                        "{currentTestimonial.content}"
                    </p>

                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#7A1C1C] text-white flex items-center justify-center font-bold text-base mb-2 shadow-xs">
                            {currentTestimonial.name.charAt(0)}
                        </div>
                        <h4 className="text-base font-bold text-[#1A1715] font-heading">
                            {currentTestimonial.name}
                        </h4>
                        <div className="flex gap-1 justify-center mt-1 text-[#C5A059] text-sm">
                            ★★★★★
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center gap-6 pt-4 border-t border-stone-100">
                        <button
                            onClick={prevSlide}
                            className="text-xs font-semibold text-stone-500 hover:text-stone-900 cursor-pointer p-2"
                        >
                            ← Previous
                        </button>
                        
                        <div className="text-xs font-mono font-bold text-stone-400">
                            <span className="text-stone-900">{currentIndex + 1}</span> / {testimonials.length}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="text-xs font-semibold text-stone-500 hover:text-stone-900 cursor-pointer p-2"
                        >
                            Next →
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
