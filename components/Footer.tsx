'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/admin')) return null;
    const socialLinks = [
        {
            name: 'Facebook',
            href: '#',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
            )
        },
        {
            name: 'Twitter',
            href: '#',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            )
        },
        {
            name: 'YouTube',
            href: '#',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            )
        },
        {
            name: 'Email',
            href: 'mailto:contact@drsalim.com',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
            )
        }
    ];

    const quickLinks = [
        { name: 'Book Store', href: '/store' },
        { name: 'Read the Blog', href: '/#articles' },
        { name: 'About the Author', href: '/#about' },
        { name: 'Suggestions', href: '/suggestions' }
    ];

    return (
        <footer className="bg-charcoal-950 border-t border-stone-900 py-20 relative overflow-hidden">
            {/* Ambient Top Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-crimson-500/20 to-transparent" />
            
            <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
                    
                    {/* About Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center text-crimson-500 rounded-none">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                                </svg>
                            </div>
                            <span className="text-white font-bold tracking-tight text-lg font-heading">
                                Dr. Muhammad Salim
                            </span>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed font-light">
                            A lifetime dedicated to scholarly research, writing, and sharing profound insights on spirituality, philosophy, and Islamic studies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white text-xs font-black uppercase tracking-widest">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-stone-400 hover:text-crimson-500 text-sm font-light transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-crimson-500">→</span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-6">
                        <h4 className="text-white text-xs font-black uppercase tracking-widest">
                            Connect
                        </h4>
                        <p className="text-stone-400 text-sm font-light">
                            Stay connected for the latest publications and insights.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-10 h-10 flex items-center justify-center bg-charcoal-900 border border-stone-850 hover:bg-crimson-500 hover:text-white text-stone-400 hover:border-crimson-500 rounded-none transition-all duration-500"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Copyright Row */}
                <div className="pt-8 border-t border-stone-900/60 text-center text-stone-500 text-xs font-light tracking-wide">
                    <p>© {new Date().getFullYear()} Dr. Muhammad Salim. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
