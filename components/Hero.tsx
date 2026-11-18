'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Hero() {
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

    return (
        <section className="relative bg-white pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-stone-200 overflow-hidden">
            {/* Subtle Accent Glow */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-50/80 rounded-full blur-[100px] pointer-events-none" />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Left Column: Author Narrative */}
                    <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
                        
                        {/* Award Pill */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wide shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-amber-600" />
                            <span>5-Time Presidential Seerat Award Winner</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
                                Inspiring Books on <br />
                                <span className="text-crimson-800 font-serif italic font-normal">
                                    Faith, Purpose & Life
                                </span>
                            </h1>
                            <div className="w-16 h-1 bg-crimson-800 mx-auto lg:mx-0 rounded-full" />
                        </div>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                            Explore the published books and articles of <strong className="text-stone-900 font-semibold">Dr. Muhammad Salim</strong> — helping readers find inner peace, build meaningful character, and live a purposeful life.
                        </p>

                        {/* High-Impact Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                            <a
                                href="#books"
                                className="w-full sm:w-auto btn btn-primary text-center"
                            >
                                Browse Published Books
                            </a>
                            <a
                                href="#articles"
                                className="w-full sm:w-auto btn btn-outline text-center"
                            >
                                Read Articles
                            </a>
                        </div>

                        {/* Metrics Bar */}
                        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-200">
                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                                <div className="text-2xl font-bold text-stone-900">40+</div>
                                <div className="text-xs text-stone-500 uppercase tracking-wider font-mono">Years of Work</div>
                            </div>
                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                                <div className="text-2xl font-bold text-stone-900">5</div>
                                <div className="text-xs text-stone-500 uppercase tracking-wider font-mono">Core Books</div>
                            </div>
                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                                <div className="text-2xl font-bold text-amber-800">5x</div>
                                <div className="text-xs text-stone-500 uppercase tracking-wider font-mono">National Awards</div>
                            </div>
                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                                <div className="text-2xl font-bold text-crimson-800">4.9 ★</div>
                                <div className="text-xs text-stone-500 uppercase tracking-wider font-mono">Reader Rating</div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Featured Book Card */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="w-full max-w-md bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-md relative">
                            
                            {/* Top Badge */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="px-3 py-1 rounded-full bg-crimson-50 text-crimson-800 border border-crimson-200 text-xs font-bold uppercase tracking-wider">
                                    #1 Bestseller
                                </span>
                                <span className="text-xs font-mono font-bold text-amber-800">
                                    ★ 4.9 Rating
                                </span>
                            </div>

                            {/* Book Visual Mockup */}
                            <div className="w-48 sm:w-56 h-68 sm:h-76 mx-auto rounded-xl bg-gradient-to-br from-[#7F1D1D] to-[#991B1B] text-white p-5 flex flex-col justify-between shadow-xl relative border border-white/20 mb-6">
                                <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/30 rounded-l-xl border-r border-white/10" />
                                
                                <div className="pl-3">
                                    <span className="text-[10px] font-mono tracking-widest text-amber-200/80 uppercase block">
                                        Published Book
                                    </span>
                                    <span className="text-xs font-bold text-white">Dr. Muhammad Salim</span>
                                </div>

                                <div className="pl-3 my-auto text-center space-y-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-amber-100 font-serif leading-tight">
                                        Brotherhood
                                    </h3>
                                    <p className="text-[10px] text-amber-100/80 italic font-serif">
                                        The Power of Unity & Sincere Hearts
                                    </p>
                                </div>

                                <div className="pl-3 flex justify-between items-center text-[10px] text-amber-200/80 font-mono">
                                    <span>280 Pages</span>
                                    <span className="font-bold text-white">$20.50</span>
                                </div>
                            </div>

                            {/* Pull Quote */}
                            <p className="text-xs sm:text-sm text-stone-600 italic font-serif leading-relaxed text-center mb-5">
                                "Real brotherhood is built on sincere hearts, mutual respect, and honest care for one another."
                            </p>

                            {/* Direct Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setIsSampleModalOpen(true)}
                                    className="btn btn-outline text-xs text-center py-2.5 cursor-pointer"
                                >
                                    📖 Read Preview
                                </button>
                                <a
                                    href="https://www.amazon.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary text-xs text-center py-2.5"
                                >
                                    Buy on Amazon →
                                </a>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Availability Strip */}
                <div className="mt-12 sm:mt-16 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
                    <span className="uppercase font-semibold">Published Editions Available Worldwide:</span>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-stone-700 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-600" /> Amazon Paperback
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-stone-700" /> Kindle eBook Edition
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-600" /> Global Library Distribution
                        </span>
                    </div>
                </div>

            </div>

            {/* Free Chapter Preview Modal */}
            {isSampleModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
                    <div className="relative w-full max-w-2xl max-h-[85vh] bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-5">
                        
                        <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                            <div>
                                <span className="text-xs font-mono font-bold text-crimson-800 uppercase tracking-wider">
                                    Free Preview • Chapter 1
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                                    Brotherhood
                                </h3>
                                <p className="text-xs text-stone-500 mt-0.5">By Dr. Muhammad Salim</p>
                            </div>
                            <button
                                onClick={() => setIsSampleModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center text-sm cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="text-stone-700 font-serif leading-relaxed text-sm sm:text-base space-y-4">
                            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-crimson-800 first-letter:mr-2 first-letter:float-left">
                                True brotherhood is more than a social custom; it is a deep spiritual connection rooted in our shared humanity. When two people meet with genuine sincerity, personal egos and small divisions melt away, revealing true mutual respect.
                            </p>
                            <p>
                                A sincere friend acts like a gentle mirror. Just as a mirror reflects what is true without anger and highlights beauty without jealousy, a true brother helps his companion grow in patience, honesty, and kindness.
                            </p>
                            <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-600 text-amber-950 italic text-sm">
                                "The strength of a community is measured by how sincerely its people care for one another."
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <span className="text-xs text-stone-500">Full 280-page book available on Amazon</span>
                            <div className="flex gap-2.5 w-full sm:w-auto">
                                <a
                                    href="https://www.amazon.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary flex-1 sm:flex-initial text-xs text-center"
                                >
                                    Buy on Amazon
                                </a>
                                <button
                                    onClick={() => setIsSampleModalOpen(false)}
                                    className="btn btn-outline flex-1 sm:flex-initial text-xs cursor-pointer"
                                >
                                    Close Preview
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
}
