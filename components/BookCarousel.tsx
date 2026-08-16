'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book } from '@/data/books';

interface PremiumBookShowcaseProps {
    books: Book[];
}

const BOOK_METADATA: Record<number, { pages: number; rating: number; tag: string; excerpt: string; sales: number; price: string }> = {
    4: { pages: 280, rating: 4.9, tag: 'Bestseller (50% Sales)', excerpt: 'True brotherhood is not merely a social contract; it is a spiritual resonance rooted in the primordial recognition of the Divine.', sales: 58, price: '$20.50' },
    5: { pages: 320, rating: 4.8, tag: 'Top Rated (20% Sales)', excerpt: 'Purification of the heart (Tazkiyah) begins with recognizing subtle spiritual ailments like pride and envy before applying the spiritual remedy.', sales: 24, price: '$19.80' },
    1: { pages: 340, rating: 4.8, tag: 'Seminal Work', excerpt: 'Divine Providence (Rububiyah) guides the cosmos with delicate balance, nurturing every created soul through life\'s trials toward spiritual maturation.', sales: 15, price: '$19.90' },
    2: { pages: 260, rating: 4.7, tag: 'Philosophical Treatise', excerpt: 'The human journey is a sacred trajectory from the primordial covenant to the ultimate return, navigating reason and faith.', sales: 12, price: '$19.80' },
    3: { pages: 380, rating: 4.6, tag: 'Advanced Volume', excerpt: 'Volume II examines the metaphysical implications of divine will and human agency in classical and contemporary theological thought.', sales: 9, price: '$19.90' }
};

export default function PremiumBookShowcase({ books }: PremiumBookShowcaseProps) {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [previewBook, setPreviewBook] = useState<Book | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    const currentBook = books[activeTab] || books[0];
    const meta = BOOK_METADATA[currentBook?.id] || { pages: 300, rating: 4.8, tag: 'Featured Book', excerpt: currentBook?.description || '', sales: 15, price: '$19.99' };

    return (
        <div className="relative py-12">
            {/* Book Tabs Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {books.map((b, idx) => (
                    <button
                        key={b.id}
                        onClick={() => setActiveTab(idx)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                            activeTab === idx
                                ? 'bg-gradient-to-r from-crimson-600 to-amber-600 text-white shadow-lg shadow-crimson-900/30 scale-105 border border-amber-400/40'
                                : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 hover:border-amber-500/20'
                        }`}
                    >
                        <span>{b.id === 4 ? '👑' : b.id === 5 ? '🌿' : '📚'}</span>
                        <span>{b.title}</span>
                    </button>
                ))}
            </div>

            {/* Main Interactive Book Card */}
            <div className="relative max-w-5xl mx-auto bg-gradient-to-br from-[#12151B] via-[#0E1117] to-[#0A0C10] border border-amber-500/20 rounded-2xl p-6 sm:p-12 shadow-2xl overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-crimson-600/10 rounded-full blur-[100px] pointer-events-none" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentBook.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                    >
                        {/* 3D Book Cover View */}
                        <div className="lg:col-span-5 flex justify-center">
                            <motion.div
                                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.04 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-[240px] sm:w-[280px] h-[360px] sm:h-[420px] rounded-xl bg-gradient-to-br from-stone-900 via-charcoal-900 to-black border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 flex flex-col justify-between overflow-hidden group perspective-[1000px]"
                            >
                                {/* Spine */}
                                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/80 via-amber-500/10 to-transparent border-r border-white/5" />

                                <div className="flex justify-between items-start z-10">
                                    <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] font-bold text-amber-300 uppercase">
                                        {meta.tag}
                                    </span>
                                    <span className="text-amber-400 text-xs font-bold">★ {meta.rating}</span>
                                </div>

                                <div className="my-auto text-center space-y-2 z-10">
                                    <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 text-lg">
                                        📖
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-bold text-white font-heading leading-tight">
                                        {currentBook.title}
                                    </h4>
                                    <div className="w-10 h-[1px] bg-amber-500/40 mx-auto" />
                                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">By Dr. Muhammad Salim</p>
                                </div>

                                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-stone-400 font-mono z-10">
                                    <span>{meta.pages} Pages</span>
                                    <span className="text-amber-300 font-bold">{meta.price}</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Book Metadata & Purchasing Actions */}
                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2.5 py-1 rounded-full bg-crimson-500/20 text-crimson-300 border border-crimson-500/30 text-[10px] font-black uppercase tracking-wider">
                                        {meta.tag}
                                    </span>
                                    <span className="text-amber-300 text-xs font-mono font-bold">
                                        {meta.sales} Verified Collectors
                                    </span>
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                                    {currentBook.title}
                                </h3>
                            </div>

                            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                                {currentBook.description}
                            </p>

                            {/* Pull Quote */}
                            <div className="p-4 rounded-xl bg-amber-500/5 border-l-2 border-amber-500 text-amber-100/90 text-xs sm:text-sm font-serif italic">
                                "{meta.excerpt}"
                            </div>

                            {/* Multi-Platform Availability Buttons */}
                            <div className="pt-2 space-y-3">
                                <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                                    Available on Official Marketplaces:
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={currentBook.amazonLink || "https://www.amazon.com"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all"
                                    >
                                        <span>📦</span> Amazon KDP (Kindle & Paperback)
                                    </a>
                                    <a
                                        href="https://www.etsy.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 border border-orange-500/30 text-xs font-bold flex items-center gap-2 transition-all"
                                    >
                                        <span>🎨</span> Etsy (Collector Hardcover)
                                    </a>
                                    <a
                                        href="https://www.barnesandnoble.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/30 text-xs font-bold flex items-center gap-2 transition-all"
                                    >
                                        <span>📚</span> Barnes & Noble (Nook)
                                    </a>
                                </div>
                            </div>

                            {/* Read Preview Trigger */}
                            <div className="pt-2">
                                <button
                                    onClick={() => setPreviewBook(currentBook)}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-amber-600 hover:from-crimson-500 hover:to-amber-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-crimson-900/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                                >
                                    <span>🔍</span> Read Sample Excerpt
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Interactive Reader Modal */}
            {previewBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
                    <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#0E1117] border border-amber-500/30 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-6">
                        <div className="flex justify-between items-start border-b border-white/10 pb-4">
                            <div>
                                <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">Sample Chapter</span>
                                <h3 className="text-xl font-bold text-white font-heading">{previewBook.title}</h3>
                                <p className="text-xs text-stone-400">By Dr. Muhammad Salim</p>
                            </div>
                            <button
                                onClick={() => setPreviewBook(null)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 flex items-center justify-center text-sm cursor-pointer transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="prose prose-invert prose-stone max-w-none text-stone-300 leading-relaxed font-serif text-sm sm:text-base space-y-4">
                            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-2 first-letter:float-left">
                                {BOOK_METADATA[previewBook.id]?.excerpt || previewBook.description}
                            </p>
                            <p>
                                The study of this subject requires understanding the dual nature of human perception—the physical faculties that navigate the temporal world and the spiritual intuition that perceives eternal truths. When these two realms harmonize, intellectual inquiry transforms into illuminated wisdom.
                            </p>
                            <p className="italic text-amber-200/90 border-l-2 border-amber-500 pl-4 py-1">
                                "Wisdom is the lost property of the sincere seeker; wherever he finds it, he has the greatest right to it."
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                            <span className="text-xs text-stone-400">Available across Amazon, Etsy & Barnes & Noble</span>
                            <button
                                onClick={() => setPreviewBook(null)}
                                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                            >
                                Done Reading
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
