'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SHOWCASE_BOOKS = [
    {
        id: 4,
        volume: 'Volume IV',
        title: 'Brotherhood',
        subtitle: 'A Foundation for Peaceful Society (#1 National Bestseller)',
        award: 'Conferred National Seerat Award',
        pages: 428,
        price: '$21.50',
        coverImage: '/images/books/brotherhood-cover.jpg',
        quote: 'Real brotherhood is built on sincere hearts, mutual respect, and honest care for one another.',
        amazonLink: 'https://www.amazon.com',
        detailLink: '/books/4',
        excerpt: 'True brotherhood is not merely polite social courtesy; it is an active spiritual contract. It means desiring for your brother what you desire for yourself, defending his honor in his absence, and covering his faults while gently encouraging his growth.'
    },
    {
        id: 5,
        volume: 'Volume V',
        title: 'Spiritual Diseases',
        subtitle: 'Management & Purification of the Heart',
        award: 'Prime Ministerial Award Winner',
        pages: 352,
        price: '$18.50',
        coverImage: '/images/books/spiritual-diseases-cover.jpg',
        quote: 'Finding inner peace begins when we diagnose the subtle ailments of the heart and apply daily spiritual remedies.',
        amazonLink: 'https://www.amazon.com',
        detailLink: '/books/5',
        excerpt: 'The heart is the master of the limbs. When it is sound, the entire personality reflects gentle patience, kindness, and moral courage. But when it harbors unchecked resentments or silent pride, no amount of outward ritual can conceal the inner unrest.'
    },
    {
        id: 1,
        volume: 'Volume I',
        title: 'Divine Providence',
        subtitle: 'The Reality of Rububiyah & Divine Sustenance in Human Life',
        award: 'Presidential Conference Citation',
        pages: 364,
        price: '$18.99',
        coverImage: '/images/books/divine-providence-cover.jpg',
        quote: 'To understand Divine Providence is to recognize how every hardship is nurtured with hidden divine wisdom.',
        amazonLink: 'https://www.amazon.com',
        detailLink: '/books/1',
        excerpt: 'To understand Divine Providence, one must first recognize that sustenance is not restricted to material food and shelter. The highest form of Rububiyah is spiritual nourishment—the light of conscious awareness, the capacity to choose good over evil, and the divine reminders that awaken the dormant heart.'
    }
];

export default function Hero() {
    const [selectedBookIndex, setSelectedBookIndex] = useState(0);
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

    const activeBook = SHOWCASE_BOOKS[selectedBookIndex];

    return (
        <section className="relative bg-[#FAF7F2] pt-28 sm:pt-36 pb-20 sm:pb-28 border-b border-[#E8E1D5] overflow-hidden">
            {/* Ambient Warm Architectural Highlights */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#EFE8DC]/60 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#F7EFE3]/70 rounded-full blur-[130px] pointer-events-none -z-10" />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Author Narrative & Editorial Authority */}
                    <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
                        
                        {/* Presidential Award Laurel Seal */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F3ECE0] border border-[#D9CEBA] text-[#5C4A28] text-xs font-semibold tracking-wide shadow-xs">
                            <span className="text-[#C5A059] text-base leading-none">✦</span>
                            <span className="uppercase font-mono text-[11px] tracking-widest font-bold">
                                5-Time Presidential & Prime Ministerial Seerat Award Winner
                            </span>
                        </div>

                        {/* Grand Editorial Headline */}
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-[#1A1715] tracking-tight leading-[1.08] font-heading">
                                Illumination of the <br />
                                <span className="text-[#7A1C1C] font-serif italic font-normal">
                                    Soul & Intellect
                                </span>
                            </h1>
                            <div className="w-20 h-1 bg-gradient-to-r from-[#7A1C1C] via-[#C5A059] to-transparent mx-auto lg:mx-0 rounded-full" />
                        </div>

                        {/* Author Narrative */}
                        <p className="text-base sm:text-lg text-[#554E48] leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                            Bridging classical Islamic philosophy with modern existential inquiry. Explore foundational published treatises on divine providence, moral ethics, and the purification of the human heart by <strong className="text-[#1A1715] font-semibold">Dr. Muhammad Salim</strong>.
                        </p>

                        {/* High-Impact Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                            <a
                                href="#books"
                                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#7A1C1C] hover:bg-[#631414] text-white font-bold text-xs uppercase tracking-widest text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <span>Explore The Books</span>
                                <span>↓</span>
                            </a>
                            <Link
                                href="/store"
                                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#F5F1E8] border border-[#D9CEBA] text-[#1A1715] font-bold text-xs uppercase tracking-widest text-center transition-all shadow-xs"
                            >
                                Official Bookstore
                            </Link>
                            <a
                                href="#articles"
                                className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-[#554E48] hover:text-[#1A1715] hover:bg-[#EFE9DC] text-xs font-semibold tracking-wider uppercase transition-colors text-center"
                            >
                                Read Articles
                            </a>
                        </div>

                        {/* Authority Metrics Strip */}
                        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-[#E3DBD0]">
                            <div className="p-4 bg-white/90 rounded-2xl border border-[#E3DBD0] shadow-xs">
                                <div className="text-2xl font-extrabold text-[#1A1715] font-heading">40+</div>
                                <div className="text-[10px] text-[#7A726A] uppercase tracking-wider font-mono mt-1">Years of Research</div>
                            </div>
                            <div className="p-4 bg-white/90 rounded-2xl border border-[#E3DBD0] shadow-xs">
                                <div className="text-2xl font-extrabold text-[#1A1715] font-heading">5</div>
                                <div className="text-[10px] text-[#7A726A] uppercase tracking-wider font-mono mt-1">Seminal Works</div>
                            </div>
                            <div className="p-4 bg-white/90 rounded-2xl border border-[#E3DBD0] shadow-xs">
                                <div className="text-2xl font-extrabold text-[#7A1C1C] font-heading">5x</div>
                                <div className="text-[10px] text-[#7A726A] uppercase tracking-wider font-mono mt-1">National Honors</div>
                            </div>
                            <div className="p-4 bg-white/90 rounded-2xl border border-[#E3DBD0] shadow-xs">
                                <div className="text-2xl font-extrabold text-[#C5A059] font-heading">4.9 ★</div>
                                <div className="text-[10px] text-[#7A726A] uppercase tracking-wider font-mono mt-1">Global Rating</div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Pristine 2D Luxury Book Presentation */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <div className="w-full max-w-md bg-white border border-[#E3DBD0] rounded-3xl p-6 sm:p-8 shadow-xl relative">
                            
                            {/* Top Card Bar: Volume and Price */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-[#7A1C1C]/10 text-[#7A1C1C] font-mono text-[11px] font-bold uppercase tracking-wider">
                                        {activeBook.volume}
                                    </span>
                                    <span className="text-[11px] font-mono text-[#7A726A]">
                                        {activeBook.pages} Pages
                                    </span>
                                </div>
                                <span className="text-sm font-mono font-bold text-[#1A1715]">
                                    {activeBook.price}
                                </span>
                            </div>

                            {/* Crisp 2D Book Cover Display */}
                            <div className="relative mx-auto w-56 sm:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(26,23,21,0.22)] border border-black/10 group">
                                {/* Left book spine shadow bar */}
                                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-black/15 to-transparent z-10 pointer-events-none" />
                                
                                <Image
                                    src={activeBook.coverImage}
                                    alt={activeBook.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                                    priority
                                    sizes="(max-width: 640px) 240px, 260px"
                                />

                                {/* Conferred Award Badge Overlay */}
                                <div className="absolute top-3 right-3 z-20">
                                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/40 text-[9px] font-mono font-bold uppercase tracking-wider shadow-md">
                                        ★ {activeBook.award}
                                    </span>
                                </div>
                            </div>

                            {/* Book Switcher Selector */}
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-center gap-1.5 p-1 bg-[#F5F1E8] rounded-2xl border border-[#E3DBD0]">
                                    {SHOWCASE_BOOKS.map((b, idx) => (
                                        <button
                                            key={b.id}
                                            onClick={() => setSelectedBookIndex(idx)}
                                            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer truncate ${
                                                selectedBookIndex === idx
                                                    ? 'bg-white text-[#1A1715] shadow-xs font-bold border border-[#D9CEBA]'
                                                    : 'text-[#7A726A] hover:text-[#1A1715]'
                                            }`}
                                        >
                                            {b.title}
                                        </button>
                                    ))}
                                </div>

                                {/* Pull Quote */}
                                <p className="text-xs text-[#554E48] italic font-serif leading-relaxed text-center px-2">
                                    "{activeBook.quote}"
                                </p>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <button
                                        onClick={() => setIsSampleModalOpen(true)}
                                        className="py-2.5 px-4 rounded-xl border border-[#D9CEBA] bg-white hover:bg-[#F5F1E8] text-[#1A1715] text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer shadow-xs"
                                    >
                                        📖 Read Sample
                                    </button>
                                    <a
                                        href={activeBook.amazonLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-2.5 px-4 rounded-xl bg-[#7A1C1C] hover:bg-[#631414] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-xs flex items-center justify-center gap-1"
                                    >
                                        <span>Order Amazon</span>
                                        <span>↗</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Read Sample Modal */}
            {isSampleModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setIsSampleModalOpen(false)}
                >
                    <div 
                        className="bg-[#FAF7F2] border border-[#D9CEBA] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-[#E3DBD0] pb-4">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-[#7A1C1C] uppercase tracking-wider">
                                    {activeBook.volume} · Excerpt
                                </span>
                                <h3 className="text-xl font-bold text-[#1A1715] font-heading">
                                    {activeBook.title}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setIsSampleModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-[#EFE9DC] hover:bg-[#E3DBD0] text-[#1A1715] flex items-center justify-center text-sm font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[#E3DBD0] text-sm text-[#443E38] leading-relaxed font-serif italic">
                            "{activeBook.excerpt}"
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <Link
                                href={activeBook.detailLink}
                                className="text-xs font-bold text-[#7A1C1C] hover:underline"
                            >
                                View Complete Book Details →
                            </Link>
                            <a
                                href={activeBook.amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-xl bg-[#7A1C1C] text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-[#631414]"
                            >
                                Order Print Edition ↗
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
