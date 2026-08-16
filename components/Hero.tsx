'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
    const containerRef = useRef(null);
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section 
            ref={containerRef}
            className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#07090D] pt-24 pb-16 border-b border-amber-500/10"
        >
            {/* Cinematic Background Atmosphere */}
            <motion.div 
                style={{ y, opacity }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                {/* Ambient Radial Lights */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(180,20,20,0.18),transparent_70%)] blur-[120px]" />
                <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_65%)] blur-[100px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#07090D_20%,transparent_80%)]" />
            </motion.div>

            {/* Subtle Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container relative z-10 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Prestigious Editorial Content */}
                    <div className="lg:col-span-7 text-center lg:text-left space-y-8">
                        
                        {/* Elite Top Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-crimson-500/10 to-transparent border border-amber-500/20 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-[11px] font-mono tracking-widest text-amber-300 font-bold uppercase">
                                40+ Years of Intellectual Inquiry
                            </span>
                        </motion.div>

                        {/* Grand Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.05] font-heading">
                                Illumination of the <br />
                                <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-amber-400 bg-clip-text text-transparent font-serif italic font-normal">
                                    Soul & Intellect
                                </span>
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-crimson-500 via-amber-500 to-transparent mt-6 mx-auto lg:mx-0 rounded-full" />
                        </motion.div>

                        {/* Literary Sub-description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-base sm:text-lg text-stone-300/90 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0"
                        >
                            Bridging classical Islamic philosophy with modern existential inquiry. Explore foundational treatises on divine providence, moral ethics, and the purification of the human heart by <strong className="text-amber-200 font-semibold">Dr. Muhammad Salim</strong>.
                        </motion.p>

                        {/* Action Triggers */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
                        >
                            <button
                                onClick={() => setIsSampleModalOpen(true)}
                                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-crimson-600 via-red-600 to-amber-600 hover:from-crimson-500 hover:to-amber-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-crimson-900/30 hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
                            >
                                <span>📖 Read Free Sample Chapter</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>

                            <a
                                href="#books"
                                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white font-semibold text-sm border border-white/10 hover:border-amber-500/30 backdrop-blur-md transition-all duration-300 text-center"
                            >
                                Explore Book Catalogue
                            </a>
                        </motion.div>

                        {/* Key Pillars Highlights */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.8 }}
                            className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0"
                        >
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono">540K+</div>
                                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">Monthly Readers</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-white font-mono">5 Seminal</div>
                                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">Core Books</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono">4.9 ★</div>
                                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">Global Rating</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: 3D Interactive Bestseller Book Showcase */}
                    <div className="lg:col-span-5 flex justify-center relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative group perspective-[1200px]"
                        >
                            {/* Glowing Backlight Halo */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-crimson-600/30 via-amber-500/20 to-transparent rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

                            {/* 3D Book Container */}
                            <motion.div
                                whileHover={{ rotateY: -8, rotateX: 4, scale: 1.03 }}
                                transition={{ duration: 0.4 }}
                                className="relative w-[280px] sm:w-[320px] h-[430px] sm:h-[480px] rounded-xl bg-gradient-to-br from-[#1A1D24] via-[#12151B] to-[#0A0C10] border border-amber-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-7"
                            >
                                {/* Spine Lighting Detail */}
                                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/70 via-amber-500/10 to-transparent border-r border-white/5" />

                                {/* Top Badge & Emblem */}
                                <div className="flex justify-between items-start z-10">
                                    <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-[10px] font-black tracking-widest text-amber-300 uppercase">
                                        #1 Bestseller
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-crimson-500/20 border border-crimson-500/40 flex items-center justify-center text-amber-300 font-serif text-sm">
                                        ⚜
                                    </div>
                                </div>

                                {/* Center Book Title & Artwork */}
                                <div className="my-auto text-center space-y-3 z-10">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-amber-500/20 to-crimson-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 text-xl">
                                        📜
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                                        Brotherhood
                                    </h3>
                                    <div className="w-12 h-[1px] bg-amber-400/50 mx-auto" />
                                    <p className="text-xs text-stone-300 font-serif italic line-clamp-2 px-2">
                                        "The Spiritual & Social Foundations of Communal Unity"
                                    </p>
                                </div>

                                {/* Bottom Book Details */}
                                <div className="pt-4 border-t border-white/10 flex justify-between items-end z-10">
                                    <div>
                                        <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-mono">Author</span>
                                        <span className="text-xs font-bold text-amber-200">Dr. Muhammad Salim</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-emerald-400 font-bold block">★★★★★ 4.9</span>
                                        <span className="text-xs font-mono font-bold text-stone-300">58 Sales (50%)</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>

                {/* Marketplace Trust Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6"
                >
                    <span className="text-[11px] font-mono tracking-wider text-stone-400 uppercase font-semibold">
                        Official Editions Available Worldwide:
                    </span>
                    <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300 font-medium">
                        <span className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                            <span className="w-2 h-2 rounded-full bg-amber-500" /> Amazon KDP (Kindle & Print)
                        </span>
                        <span className="flex items-center gap-2 hover:text-orange-300 transition-colors">
                            <span className="w-2 h-2 rounded-full bg-orange-500" /> Etsy Marketplace (Collector Sets)
                        </span>
                        <span className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Barnes & Noble (Nook & Hardcover)
                        </span>
                        <span className="flex items-center gap-2 hover:text-red-300 transition-colors">
                            <span className="w-2 h-2 rounded-full bg-red-500" /> Pinterest Commerce
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Free Chapter Preview Modal */}
            {isSampleModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
                    <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#0E1117] border border-amber-500/30 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-6">
                        <div className="flex justify-between items-start border-b border-white/10 pb-4">
                            <div>
                                <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">Sample Chapter 1</span>
                                <h3 className="text-xl font-bold text-white font-heading">Brotherhood: The Soul's Covenant</h3>
                                <p className="text-xs text-stone-400">By Dr. Muhammad Salim</p>
                            </div>
                            <button
                                onClick={() => setIsSampleModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 flex items-center justify-center text-sm cursor-pointer transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="prose prose-invert prose-stone max-w-none text-stone-300 leading-relaxed font-serif text-sm sm:text-base space-y-4">
                            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-2 first-letter:float-left">
                                True brotherhood is not merely a social contract; it is a spiritual resonance rooted in the primordial recognition of the Creator. When two hearts meet in sincerity, the barriers of ego and worldly division dissolve, revealing the underlying unity of all human souls.
                            </p>
                            <p>
                                In classical Islamic psychology, brotherhood acts as a mirror. Just as a mirror reflects flaws without hatred and illuminates beauty without jealousy, the sincere brother guides his companion toward purification (Tazkiyah) with gentle compassion.
                            </p>
                            <p className="italic text-amber-200/90 border-l-2 border-amber-500 pl-4 py-1">
                                "The strength of a community is not measured by its physical wealth, but by the purity of the bonds that unite the hearts of its people."
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <span className="text-xs text-stone-400">Full 280-page edition available online</span>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <a
                                    href="#books"
                                    onClick={() => setIsSampleModalOpen(false)}
                                    className="px-5 py-2.5 rounded-lg bg-crimson-600 hover:bg-crimson-500 text-white font-bold text-xs transition-colors text-center w-full sm:w-auto"
                                >
                                    Get Full Book
                                </a>
                                <button
                                    onClick={() => setIsSampleModalOpen(false)}
                                    className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-semibold"
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
