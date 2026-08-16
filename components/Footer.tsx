'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/admin')) return null;

    const bookLinks = [
        { name: 'Brotherhood (#1 Bestseller)', href: '/#books' },
        { name: 'Spiritual Diseases & Management', href: '/#books' },
        { name: 'Divine Providence (Vols. 1 & 2)', href: '/#books' },
        { name: 'Human Journey from Soul to Abode', href: '/#books' },
        { name: 'Host Plant Resistance (Postgraduate)', href: '/#books' }
    ];

    const essayLinks = [
        { name: 'Justice: An Islamic Perspective', href: '/articles/9' },
        { name: 'Evil Web & Taghut', href: '/articles/1' },
        { name: 'Status of Heart in Personality', href: '/articles/2' },
        { name: 'Hidayat (Guidance) for All', href: '/articles/10' },
        { name: 'Moderation: An Analysis', href: '/articles/8' }
    ];

    const channelLinks = [
        { name: 'Amazon KDP (Print & Kindle)', href: 'https://www.amazon.com', icon: '📦' },
        { name: 'Etsy (Collector Editions)', href: 'https://www.etsy.com', icon: '🎨' },
        { name: 'Barnes & Noble (Nook & Hardcover)', href: 'https://www.barnesandnoble.com', icon: '📚' },
        { name: 'Pinterest Visual Library', href: 'https://www.pinterest.com', icon: '📌' }
    ];

    return (
        <footer className="bg-[#06080B] text-stone-300 border-t border-amber-500/15 pt-20 pb-12 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="container max-w-7xl mx-auto px-6 relative z-10 space-y-16">
                
                {/* Upper Scholar Banner */}
                <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#12151B] via-[#0E1117] to-[#0A0D12] border border-amber-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-widest">
                            🎖️ 5x Presidential & Prime Ministerial Seerat Awards
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                            Dr. Muhammad Salim <span className="text-xs font-mono font-normal text-stone-400">(PhD)</span>
                        </h3>
                        <p className="text-stone-400 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
                            Harmonizing Revealed Knowledge and Acquired Science for the intellectual and spiritual elevation of humanity.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/about"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-amber-600 hover:from-crimson-500 hover:to-amber-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-crimson-900/30"
                        >
                            Read Scholarly Bio →
                        </Link>
                        <Link
                            href="/#articles"
                            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-semibold transition-all"
                        >
                            Explore 200+ Treatises
                        </Link>
                    </div>
                </div>

                {/* Main 4-Column Navigation Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    
                    {/* Col 1: Books & Monographs */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                            <span>📚</span> Published Books
                        </h4>
                        <div className="w-8 h-[1px] bg-amber-500/40" />
                        <ul className="space-y-2.5 text-xs">
                            {bookLinks.map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-stone-400 hover:text-amber-200 transition-colors flex items-center gap-1.5 group">
                                        <span className="text-amber-500/60 group-hover:text-amber-400 transition-colors">›</span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 2: Philosophical Treatises */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                            <span>📜</span> Featured Treatises
                        </h4>
                        <div className="w-8 h-[1px] bg-amber-500/40" />
                        <ul className="space-y-2.5 text-xs">
                            {essayLinks.map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-stone-400 hover:text-amber-200 transition-colors flex items-center gap-1.5 group">
                                        <span className="text-amber-500/60 group-hover:text-amber-400 transition-colors">›</span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Official Bookstores & Channels */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                            <span>🌍</span> Distribution Channels
                        </h4>
                        <div className="w-8 h-[1px] bg-amber-500/40" />
                        <ul className="space-y-2.5 text-xs">
                            {channelLinks.map((ch, i) => (
                                <li key={i}>
                                    <a
                                        href={ch.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-stone-400 hover:text-amber-200 transition-colors flex items-center gap-2 group"
                                    >
                                        <span>{ch.icon}</span>
                                        <span>{ch.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Institutional & Scholar Portal */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                            <span>🏛️</span> Scholar Portal
                        </h4>
                        <div className="w-8 h-[1px] bg-amber-500/40" />
                        <div className="space-y-3 text-xs">
                            <p className="text-stone-400 font-light leading-relaxed">
                                Dedicated to the preservation, dissemination, and translation of Dr. Salim's academic corpus.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/admin/dashboard"
                                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/30 text-amber-300 hover:text-amber-200 text-[11px] font-mono font-semibold transition-all"
                                >
                                    <span>🔐</span>
                                    <span>Admin Management Portal</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Row: Copyright & Legal */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
                    <p>© {new Date().getFullYear()} Dr. Muhammad Salim. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/about" className="hover:text-stone-300 transition-colors">Biography</Link>
                        <Link href="/#books" className="hover:text-stone-300 transition-colors">Library</Link>
                        <Link href="/#articles" className="hover:text-stone-300 transition-colors">Treatises</Link>
                        <Link href="/admin/dashboard" className="text-amber-400/70 hover:text-amber-300 transition-colors">Admin Panel</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
