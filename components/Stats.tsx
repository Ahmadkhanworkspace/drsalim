'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatItemProps {
    number: number;
    label: string;
    suffix?: string;
}

function StatItem({ number, label, suffix = '' }: StatItemProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    let start = 0;
                    const duration = 2000;
                    const increment = number / (duration / 16);
                    
                    const animate = () => {
                        start += increment;
                        if (start >= number) {
                            setCount(number);
                        } else {
                            setCount(Math.floor(start));
                            requestAnimationFrame(animate);
                        }
                    };
                    animate();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [number, hasAnimated]);

    return (
        <div ref={ref} className="text-center p-12 relative group transition-all duration-700">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl font-bold text-white mb-6 font-heading tracking-tightest flex items-center justify-center"
            >
                <span className="text-stone-100">{count}</span>
                <span className="text-crimson-500">{suffix}</span>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 group-hover:text-crimson-500 transition-colors duration-500"
            >
                {label}
            </motion.div>
            
            {/* Decorative flourish */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-crimson-500/20 group-hover:w-24 group-hover:bg-crimson-500/50 transition-all duration-700" />
        </div>
    );
}

export default function Stats() {
    return (
        <section id="achievements" className="relative py-40 bg-charcoal-950 overflow-hidden border-y border-white/5">
            {/* Background Texture (Subtle) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/section-bg.png")', backgroundSize: 'cover' }} />
            
            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-0 lg:divide-x lg:divide-white/5">
                    <StatItem number={40} label="Years of Impact" suffix="+" />
                    <StatItem number={200} label="Scholarly Works" suffix="+" />
                    <StatItem number={25} label="Authored Books" suffix="+" />
                    <StatItem number={15} label="Prestigious Awards" suffix="+" />
                </div>
            </div>

            {/* Accent Ornaments (Crimson) */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-crimson-500/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-crimson-500/5 blur-[180px] rounded-full translate-x-1/3 translate-y-1/3" />
        </section>
    );
}
