'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 15);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scrolling when mobile drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navLinks = [
        { label: 'Books', href: '/#books' },
        { label: 'Articles', href: '/#articles' },
        { label: 'Ask Dr. Salim', href: '/qa' },
        { label: 'About', href: '/about' },
        { label: 'Store', href: '/store' },
        { label: 'Contact', href: '/contact' }
    ];

    if (pathname?.startsWith('/admin')) return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs py-3.5'
                    : 'bg-white/80 backdrop-blur-sm border-b border-stone-200/60 py-4 sm:py-5'
            }`}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    
                    {/* Brand Name */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-serif text-lg font-bold group-hover:bg-crimson-800 transition-colors">
                            S
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-crimson-800 transition-colors font-heading leading-tight">
                                Dr. Muhammad Salim
                            </span>
                            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                                Author & Scholar
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-stone-600 hover:text-crimson-800 transition-colors py-1"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            href="/#books"
                            className="btn btn-primary text-xs tracking-wider uppercase"
                        >
                            Browse Books
                        </Link>
                    </nav>

                    {/* Mobile Menu Actions */}
                    <div className="flex items-center gap-2.5 lg:hidden">
                        <Link
                            href="/#books"
                            className="px-3 py-1.5 rounded-lg bg-crimson-50 text-crimson-800 border border-crimson-200 text-xs font-semibold"
                        >
                            Books
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close Menu' : 'Open Navigation Menu'}
                            className="w-11 h-11 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 flex flex-col items-center justify-center gap-1.5 focus:outline-none active:scale-95 transition-all"
                        >
                            <span
                                className={`w-5 h-[2px] bg-stone-900 rounded-full transition-transform duration-300 origin-center ${
                                    isOpen ? 'rotate-45 translate-y-[5px]' : ''
                                }`}
                            />
                            <span
                                className={`w-5 h-[2px] bg-stone-900 rounded-full transition-opacity duration-300 ${
                                    isOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            <span
                                className={`w-5 h-[2px] bg-stone-900 rounded-full transition-transform duration-300 origin-center ${
                                    isOpen ? '-rotate-45 -translate-y-[5px]' : ''
                                }`}
                            />
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden border-b border-stone-200 bg-white shadow-xl"
                    >
                        <div className="container px-4 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                            
                            <div className="divide-y divide-stone-100">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between py-3.5 px-2 text-stone-800 hover:text-crimson-800 active:bg-stone-50 rounded-lg transition-colors"
                                    >
                                        <span className="font-heading text-lg font-semibold">
                                            {item.label}
                                        </span>
                                        <span className="text-stone-400">›</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-2 space-y-2">
                                <Link
                                    href="/#books"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full btn btn-primary text-center block"
                                >
                                    Browse Complete Book Library
                                </Link>
                                <Link
                                    href="/#newsletter"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full btn btn-outline text-center block"
                                >
                                    Subscribe to Articles
                                </Link>
                            </div>

                            <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500 font-mono">
                                © {new Date().getFullYear()} Dr. Muhammad Salim
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
