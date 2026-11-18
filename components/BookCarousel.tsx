'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Book } from '@/data/books';

interface PremiumBookShowcaseProps {
    books: Book[];
}

const BOOK_METADATA: Record<number, { pages: number; rating: number; tag: string; excerpt: string; price: string; color: string }> = {
    4: { 
        pages: 428, 
        rating: 4.9, 
        tag: 'National Award Winner', 
        excerpt: 'Real brotherhood is built on sincere hearts, mutual respect, and honest care for one another.', 
        price: '$21.50',
        color: 'from-[#7F1D1D] to-[#991B1B]'
    },
    5: { 
        pages: 352, 
        rating: 4.8, 
        tag: 'Spiritual Health', 
        excerpt: 'Finding inner peace starts with recognizing inner struggles like pride and envy, and replacing them with gratitude and compassion.', 
        price: '$18.50',
        color: 'from-[#064E3B] to-[#047857]'
    },
    1: { 
        pages: 364, 
        rating: 4.8, 
        tag: 'Faith & Life', 
        excerpt: 'Understanding how God\'s guidance and care support us through life\'s tests toward maturity and inner strength.', 
        price: '$18.99',
        color: 'from-[#1E3A8A] to-[#1D4ED8]'
    },
    2: { 
        pages: 320, 
        rating: 4.7, 
        tag: 'Life Purpose', 
        excerpt: 'An inspiring reflection on the human journey, exploring where we come from, why we are here, and where we are heading.', 
        price: '$17.50',
        color: 'from-[#581C87] to-[#6B21A8]'
    },
    3: { 
        pages: 398, 
        rating: 4.6, 
        tag: 'Moral Philosophy', 
        excerpt: 'A deeper look at faith, purpose, and free will, and how our daily choices shape our destiny.', 
        price: '$19.99',
        color: 'from-[#1C1917] to-[#292524]'
    }
};

export default function PremiumBookShowcase({ books }: PremiumBookShowcaseProps) {
    const [previewBook, setPreviewBook] = useState<Book | null>(null);

    return (
        <div className="py-6 sm:py-10">
            {/* Book Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {books.map((book, index) => {
                    const meta = BOOK_METADATA[book.id] || {
                        pages: 300,
                        rating: 4.8,
                        tag: 'Book',
                        excerpt: book.description,
                        price: '$18.99',
                        color: 'from-[#7F1D1D] to-[#991B1B]'
                    };

                    return (
                        <div
                            key={book.id || index}
                            className="bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-300 transition-all flex flex-col justify-between overflow-hidden group"
                        >
                            {/* Card Top: Book Mockup */}
                            <Link href={`/books/${book.id}`} className="block">
                                <div className="p-6 bg-stone-50 border-b border-stone-200/80 flex items-center justify-center relative">
                                    <div className={`w-36 h-50 rounded-xl bg-gradient-to-br ${meta.color} text-white p-4 flex flex-col justify-between shadow-md group-hover:scale-102 transition-transform relative border border-white/15`}>
                                        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/25 rounded-l-xl border-r border-white/10" />
                                        
                                        <div className="pl-2">
                                            <span className="text-[8px] font-mono text-amber-200 uppercase tracking-widest block">
                                                Dr. Salim
                                            </span>
                                        </div>

                                        <div className="pl-2 my-auto text-center">
                                            <h4 className="text-sm font-bold text-white font-serif leading-tight line-clamp-3">
                                                {book.title}
                                            </h4>
                                        </div>

                                        <div className="pl-2 flex justify-between items-center text-[8px] text-amber-200/80 font-mono">
                                            <span>{meta.pages}p</span>
                                            <span className="font-bold text-white">{meta.price}</span>
                                        </div>
                                    </div>

                                    {/* Tag Badge */}
                                    <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-white text-stone-700 border border-stone-200 text-[10px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                                        {meta.tag}
                                    </span>

                                    <span className="absolute top-4 right-4 text-xs font-mono font-bold text-amber-800">
                                        ★ {meta.rating}
                                    </span>
                                </div>
                            </Link>

                            {/* Card Body: Info */}
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <Link href={`/books/${book.id}`}>
                                        <h3 className="text-xl font-bold text-stone-900 group-hover:text-crimson-800 transition-colors leading-snug">
                                            {book.title}
                                        </h3>
                                    </Link>
                                    <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-3">
                                        {meta.excerpt}
                                    </p>
                                </div>

                                <div className="space-y-2.5 pt-2">
                                    <Link
                                        href={`/books/${book.id}`}
                                        className="btn btn-primary w-full text-xs py-2.5 text-center flex items-center justify-center gap-1.5"
                                    >
                                        <span>View Details & Order</span>
                                        <span>→</span>
                                    </Link>
                                    
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setPreviewBook(book)}
                                            className="btn btn-outline flex-1 text-xs py-2 text-center cursor-pointer"
                                        >
                                            📖 Read Preview
                                        </button>
                                        <a
                                            href={book.amazonLink || "https://www.amazon.com"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary flex-1 text-xs py-2 text-center"
                                        >
                                            Buy on Amazon ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Reading Preview Modal */}
            {previewBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
                    <div className="relative w-full max-w-2xl max-h-[85vh] bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-5">
                        <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                            <div>
                                <span className="text-xs font-mono font-bold text-crimson-800 uppercase tracking-wider">
                                    Free Book Preview • Chapter 1
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                                    {previewBook.title}
                                </h3>
                                <p className="text-xs text-stone-500 mt-0.5">By Dr. Muhammad Salim</p>
                            </div>
                            <button
                                onClick={() => setPreviewBook(null)}
                                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center text-sm cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="text-stone-700 font-serif leading-relaxed text-sm sm:text-base space-y-4">
                            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-crimson-800 first-letter:mr-2 first-letter:float-left">
                                {BOOK_METADATA[previewBook.id]?.excerpt || previewBook.description}
                            </p>
                            <p>
                                When we take time to reflect on life with a calm and open mind, our daily challenges become opportunities to develop patience, wisdom, and genuine peace.
                            </p>
                            <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-600 text-amber-950 italic text-sm">
                                "Wisdom is something every sincere seeker values; wherever you find truth, hold onto it."
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <Link
                                href={`/books/${previewBook.id}`}
                                className="text-xs font-bold text-crimson-800 hover:underline"
                            >
                                View Full Book Page (Table of Contents & Details) →
                            </Link>
                            <div className="flex gap-2.5 w-full sm:w-auto">
                                <a
                                    href={previewBook.amazonLink || "https://www.amazon.com"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary flex-1 sm:flex-initial text-xs text-center"
                                >
                                    Buy on Amazon
                                </a>
                                <button
                                    onClick={() => setPreviewBook(null)}
                                    className="btn btn-outline flex-1 sm:flex-initial text-xs cursor-pointer"
                                >
                                    Done Reading
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
