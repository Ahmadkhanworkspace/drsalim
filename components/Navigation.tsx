'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Store', href: '/store' },
        { label: 'About', href: '/about' },
        { label: 'Books', href: '#books' },
        { label: 'Articles', href: '#articles' },
        { label: 'Contact', href: '/contact' },
        { label: 'Suggestions', href: '/suggestions' }
    ];

    if (!mounted) return (
        <nav className="fixed top-0 left-0 right-0 z-[1000] bg-transparent py-8">
            <div className="container px-6 lg:px-12">
                <div className="flex justify-between items-center">
                    <div className="text-xl md:text-2xl font-bold tracking-tighter text-white font-heading">
                        Dr. Muhammad Salim
                    </div>
                </div>
            </div>
        </nav>
    );

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${
            scrolled 
            ? 'bg-charcoal-950/90 backdrop-blur-2xl border-b border-white/5 py-4' 
            : 'bg-transparent py-8'
        }`}
        style={{ backgroundColor: scrolled ? 'hsla(0, 0%, 8%, 0.9)' : 'transparent' }}
        >
            <div className="container px-6 lg:px-12">
                <div className="flex justify-between items-center">
                    <Link href="/" className="group">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tighter text-white transition-colors duration-500 group-hover:text-crimson-500 font-heading">
                            Dr. Muhammad Salim
                        </h3>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-white transition-colors duration-500"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link href="#newsletter" className="btn btn-primary ml-4">
                            Subscribe
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
                    >
                        <span className={`w-6 h-[1px] bg-white transition-transform duration-500 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-[1px] bg-white transition-opacity duration-500 ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-[1px] bg-white transition-transform duration-500 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-charcoal-950 z-40 flex flex-col items-center justify-center gap-10 lg:hidden"
                        style={{ backgroundColor: 'hsl(var(--charcoal-950))' }}
                    >
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-bold tracking-tighter text-stone-200 hover:text-crimson-500 transition-colors duration-500 font-heading"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link 
                            href="#newsletter" 
                            onClick={() => setIsOpen(false)}
                            className="btn btn-primary mt-10"
                        >
                            Subscribe
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
