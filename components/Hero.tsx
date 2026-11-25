'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const InteractiveBook3D = dynamic(() => import('@/components/3d/InteractiveBook3D'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[450px] sm:h-[520px] flex items-center justify-center bg-stone-50/50 rounded-3xl animate-pulse">
            <span className="text-xs font-mono text-stone-400">Loading 3D Library Stage...</span>
        </div>
    )
});

const SHOWCASE_BOOKS = [
    {
        id: 4,
        title: 'Brotherhood',
        subtitle: 'A Foundation for Peaceful Society',
        award: 'National Seerat Award Winner',
        price: '$21.50',
        coverImage: '/images/books/brotherhood-cover.jpg',
        spineColor: '#7A1C1C',
        quote: 'Real brotherhood is built on sincere hearts, mutual respect, and honest care for one another.',
        amazonLink: 'https://www.amazon.com',
        detailLink: '/books/4'
    },
    {
        id: 5,
        title: 'Spiritual Diseases',
        subtitle: 'Management & Purification of the Heart',
        award: 'Prime Ministerial Award',
        price: '$18.50',
        coverImage: '/images/books/spiritual-diseases-cover.jpg',
        spineColor: '#104F3B',
        quote: 'Finding inner peace begins when we diagnose the subtle ailments of the heart and apply daily spiritual remedies.',
        amazonLink: 'https://www.amazon.com',
        detailLink: '/books/5'
    },
    {
        id: 1,
        title: 'Divine Providence',
        subtitle: 'The Reality of Rububiyah in Human Life',
        award: 'Presidential Conference Citation',
        price: '$18.99',
        coverImage: '/images/books/divine-providence-cover.jpg',
        spineColor: '#172E54',
        quote: 'To understand Divine Providence is to recognize how every hardship is nurtured with hidden divine wisdom.',
        amazonLink: 'https://www.amazon.com',
        detailLink: '/books/1'
    }
];

export default function Hero() {
    const [selectedBookIndex, setSelectedBookIndex] = useState(0);
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

    const activeBook = SHOWCASE_BOOKS[selectedBookIndex];

    return (
        <section className="relative bg-[#FCFBF8] pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-stone-200/80 overflow-hidden">
            {/* Luminous Warm Background Glows */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-rose-100/25 rounded-full blur-[130px] pointer-events-none -z-10" />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Left Column: Author Narrative & Editorial Authority */}
                    <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
                        
                        {/* National Award Laurel Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/90 border border-amber-300/80 text-amber-950 text-xs font-semibold tracking-wide shadow-2xs">
                            <span className="text-amber-700 text-sm">✦</span>
                            <span className="uppercase font-mono text-[11px] tracking-wider font-bold">
                                5-Time Presidential & Prime Ministerial Seerat Award Winner
                            </span>
                        </div>

                        {/* Majestic Headline */}
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12] font-heading">
                                Faith, Moral Philosophy & <br />
                                <span className="text-crimson-800 font-serif italic font-normal">
                                    The Human Journey
                                </span>
                            </h1>
                            <div className="w-16 h-1 bg-gradient-to-r from-crimson-800 via-amber-600 to-transparent mx-auto lg:mx-0 rounded-full" />
                        </div>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                            Explore the authoritative published books and discourse of <strong className="text-stone-900 font-semibold">Dr. Muhammad Salim</strong> — examining spiritual psychology, divine providence, and building a peaceful society.
                        </p>

                        {/* High-Impact Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                            <a
                                href="#books"
                                className="w-full sm:w-auto btn btn-primary text-center flex items-center justify-center gap-2"
                            >
                                <span>Explore The Bookshop</span>
                                <span>→</span>
                            </a>
                            <Link
                                href="/store"
                                className="w-full sm:w-auto btn btn-outline text-center"
                            >
                                View All 5 Volumes
                            </Link>
                            <a
                                href="#articles"
                                className="w-full sm:w-auto px-5 py-3 rounded-xl hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors text-center"
                            >
                                Read Articles
                            </a>
                        </div>

                        {/* Authority Metrics Bar */}
                        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-stone-200">
                            <div className="p-3.5 bg-white/80 backdrop-blur-xs rounded-xl border border-stone-200/90 shadow-2xs">
                                <div className="text-2xl font-extrabold text-stone-900 font-heading">40+</div>
                                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-mono mt-0.5">Years of Research</div>
                            </div>
                            <div className="p-3.5 bg-white/80 backdrop-blur-xs rounded-xl border border-stone-200/90 shadow-2xs">
                                <div className="text-2xl font-extrabold text-stone-900 font-heading">5</div>
                                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-mono mt-0.5">Published Books</div>
                            </div>
                            <div className="p-3.5 bg-white/80 backdrop-blur-xs rounded-xl border border-stone-200/90 shadow-2xs">
                                <div className="text-2xl font-extrabold text-amber-800 font-heading">5x</div>
                                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-mono mt-0.5">National Honors</div>
                            </div>
                            <div className="p-3.5 bg-white/80 backdrop-blur-xs rounded-xl border border-stone-200/90 shadow-2xs">
                                <div className="text-2xl font-extrabold text-crimson-800 font-heading">4.9 ★</div>
                                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-mono mt-0.5">Reader Rating</div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Fluid 3D Interactive Book Showcase */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-stone-200/90 rounded-3xl p-5 sm:p-7 shadow-xl relative">
                            
                            {/* Top Card Bar: Active Book Badge & Price */}
                            <div className="flex items-center justify-between mb-2 px-1">
                                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold uppercase tracking-wider">
                                    ★ {activeBook.award}
                                </span>
                                <span className="text-xs font-mono font-bold text-stone-900">
                                    {activeBook.price}
                                </span>
                            </div>

                            {/* THE FLUID 3D INTERACTIVE BOOK */}
                            <InteractiveBook3D
                                key={activeBook.id}
                                coverImage={activeBook.coverImage}
                                title={activeBook.title}
                                spineColor={activeBook.spineColor}
                            />

                            {/* Interactive Book Selector Switcher */}
                            <div className="mt-3 space-y-3">
                                <div className="flex items-center justify-center gap-1.5 p-1 bg-stone-100/90 rounded-2xl border border-stone-200">
                                    {SHOWCASE_BOOKS.map((b, idx) => (
                                        <button
                                            key={b.id}
                                            onClick={() => setSelectedBookIndex(idx)}
                                            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all cursor-pointer truncate ${
                                                selectedBookIndex === idx
                                                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                                                    : 'text-stone-600 hover:text-stone-900'
                                            }`}
                                            title={`Switch 3D View to ${b.title}`}
                                        >
                                            {b.title}
                                        </button>
                                    ))}
                                </div>

                                {/* Pull Quote */}
                                <p className="text-xs text-stone-600 italic font-serif leading-relaxed text-center px-2">
                                    "{activeBook.quote}"
                                </p>

                                {/* Direct Action Buttons */}
                                <div className="grid grid-cols-2 gap-2.5 pt-1">
                                    <button
                                        onClick={() => setIsSampleModalOpen(true)}
                                        className="btn btn-outline text-xs text-center py-2.5 cursor-pointer"
                                    >
                                        📖 Read Preview
                                    </button>
                                    <Link
                                        href={activeBook.detailLink}
                                        className="btn btn-primary text-xs text-center py-2.5 flex items-center justify-center gap-1"
                                    >
                                        <span>Order Volume</span>
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Published Editions Strip */}
                <div className="mt-14 sm:mt-18 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
                    <span className="uppercase font-semibold tracking-wider">Official Editions Available Worldwide:</span>
                    <div className="flex flex-wrap items-center justify-center gap-5 text-stone-700 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-600" /> Amazon Paperback Edition
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-stone-700" /> Kindle Digital Edition
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-700" /> Global Library Distribution
                        </span>
                    </div>
                </div>

            </div>

            {/* Reading Preview Modal */}
            {isSampleModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
                    <div className="relative w-full max-w-2xl max-h-[85vh] bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-5 animate-fadeIn">
                        <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                            <div>
                                <span className="text-xs font-mono font-bold text-crimson-800 uppercase tracking-wider">
                                    Official Preview • Chapter 1 Excerpt
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading mt-0.5">
                                    {activeBook.title}
                                </h3>
                                <p className="text-xs text-stone-500">{activeBook.subtitle} — By Dr. Muhammad Salim</p>
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
                                {activeBook.quote}
                            </p>
                            <p>
                                When we take time to reflect on life with a calm and open mind, our daily challenges become opportunities to cultivate patience, humility, and genuine peace.
                            </p>
                            <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-600 text-amber-950 italic text-sm">
                                "Wisdom is something every sincere seeker values; wherever you find truth, hold onto it."
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <Link
                                href={activeBook.detailLink}
                                className="text-xs font-bold text-crimson-800 hover:underline"
                            >
                                View Complete Book Details & Chapters →
                            </Link>
                            <div className="flex gap-2.5 w-full sm:w-auto">
                                <a
                                    href={activeBook.amazonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary flex-1 sm:flex-initial text-xs text-center"
                                >
                                    Buy on Amazon ↗
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
