'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatItemProps {
    number: number;
    label: string;
    suffix?: string;
    icon?: string;
}

function StatItem({ number, label, suffix = '', icon }: StatItemProps) {
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
                    const duration = 1800;
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
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [number, hasAnimated]);

    return (
        <div ref={ref} className="text-center p-6 sm:p-8 lg:p-10 relative group transition-all duration-300">
            {icon && (
                <div className="text-xl sm:text-2xl mb-2 sm:mb-3 opacity-80 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            )}
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 mb-2 sm:mb-3 font-heading tracking-tight flex items-center justify-center"
            >
                <span>{count}</span>
                <span className="text-crimson-600 ml-0.5">{suffix}</span>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-stone-600 group-hover:text-crimson-700 transition-colors"
            >
                {label}
            </motion.div>
            
            {/* Subtle Accent Line */}
            <div className="w-8 h-[2px] bg-stone-200 group-hover:bg-crimson-600 group-hover:w-14 mx-auto mt-3 transition-all duration-300 rounded-full" />
        </div>
    );
}

export default function Stats() {
    return (
        <section id="achievements" className="relative py-14 sm:py-20 bg-gradient-to-r from-stone-50 via-amber-50/30 to-stone-50 overflow-hidden border-y border-stone-200/80">
            <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-stone-200/80 bg-white/70 backdrop-blur-sm rounded-2xl border border-stone-200/80 shadow-sm">
                    <StatItem number={40} label="Years of Impact" suffix="+" icon="⏳" />
                    <StatItem number={200} label="Scholarly Works" suffix="+" icon="📜" />
                    <StatItem number={25} label="Authored Books" suffix="+" icon="📚" />
                    <StatItem number={15} label="Prestigious Honors" suffix="+" icon="🎖️" />
                </div>
            </div>
        </section>
    );
}
