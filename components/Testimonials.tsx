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
        <section id="testimonials" className="bg-stone-50 border-b border-stone-200 py-16 sm:py-24">
            <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-800 mb-2 block">
                        Global Reader Feedback
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight font-heading">
                        Reader <span className="text-crimson-800 font-serif italic font-normal">Endorsements</span>
                    </h2>
                </div>

                {/* Card */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-12 shadow-xs text-center space-y-6">
                    <p className="text-lg sm:text-2xl font-serif italic text-stone-800 leading-relaxed max-w-2xl mx-auto">
                        "{currentTestimonial.content}"
                    </p>

                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-base mb-2">
                            {currentTestimonial.name.charAt(0)}
                        </div>
                        <h4 className="text-base font-bold text-stone-900 font-heading">
                            {currentTestimonial.name}
                        </h4>
                        <div className="flex gap-1 justify-center mt-1 text-amber-500 text-sm">
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
