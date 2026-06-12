'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section 
            ref={containerRef}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal-950"
        >
            {/* Cinematic Background Layer */}
            <motion.div 
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{ 
                        backgroundImage: 'url("/hero-bg.png")',
                        filter: 'brightness(0.2) contrast(1.1) grayscale(1)'
                    }}
                />
                
                {/* Dynamic Mesh Gradient Overlays (Crimson & Charcoal) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(153,0,0,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
            </motion.div>

            {/* Floating Ethereal Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                    animate={{ 
                        y: [0, -30, 0],
                        opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-[15%] w-96 h-96 bg-crimson-500/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="container relative z-10 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    
                    {/* Minimalist Accent (Crimson) */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-24 h-[1px] bg-crimson-500/60 mx-auto mb-12"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mb-10"
                    >
                        <span className="text-stone-300 font-bold uppercase tracking-[0.5em] text-[9px] md:text-[11px] block">
                            Islamic Thought & Modern Philosophy
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mb-12"
                    >
                        <h1 className="text-5xl md:text-8xl lg:text-[7rem] xl:text-[9rem] 2xl:text-[10rem] font-bold text-white tracking-tighter leading-[0.85] font-heading">
                            A <span className="text-crimson-500 font-serif-italic font-normal px-2">Legacy</span> <br />
                            <span className="opacity-95 text-stone-100">of Thought</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 2, delay: 1 }}
                        className="text-lg md:text-2xl text-stone-200 max-w-3xl mx-auto mb-20 font-light leading-relaxed tracking-wide italic"
                    >
                        Navigating the profound intersections of classical wisdom, 
                        modern philosophy, and the enduring human spirit.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-10"
                    >
                        <a 
                            href="#books" 
                            className="btn btn-primary"
                        >
                            Access Library
                        </a>
                        
                        <a 
                            href="#articles" 
                            className="btn btn-outline"
                        >
                            Read the Blog
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Premium Progress Ornament (Crimson) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-crimson-500/40 to-transparent relative">
                    <motion.div 
                        animate={{ y: [0, 80] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-[-1px] w-[3px] h-8 bg-crimson-500 blur-[2px]"
                    />
                </div>
            </motion.div>



            {/* Side Ornaments */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-20 opacity-20">
                <span className="rotate-90 text-[10px] tracking-[1em] uppercase text-white font-black">Est. 1984</span>
            </div>
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-20 opacity-20">
                <span className="rotate-90 text-[10px] tracking-[1em] uppercase text-white font-black">Scholarly Works</span>
            </div>
        </section>
    );
}
