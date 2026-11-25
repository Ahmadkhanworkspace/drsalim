'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Book } from '@/data/books';
import FluidTiltCard from '@/components/3d/FluidTiltCard';

interface PremiumBookShowcaseProps {
    books: Book[];
}

export default function PremiumBookShowcase({ books }: PremiumBookShowcaseProps) {
    const [previewBook, setPreviewBook] = useState<Book | null>(null);

    return (
        <div className="py-6 sm:py-10">
            {/* Book Cards Grid with Fluid 3D Tilt */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {books.map((book) => {
                    return (
                        <div
                            key={book.id}
                            className="bg-white border border-stone-200/90 rounded-3xl shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all flex flex-col justify-between overflow-hidden group"
                        >
                            {/* Card Top: 3D Fluid Tilt Book Mockup */}
                            <Link href={`/books/${book.id}`} className="block p-6 sm:p-8 bg-gradient-to-b from-stone-50 via-stone-50/70 to-white border-b border-stone-100">
                                <FluidTiltCard
                                    coverImage={book.coverImage}
                                    title={book.title}
                                    badge={book.award ? 'Award Winner' : undefined}
                                    pages={book.pages || 350}
                                    price={book.price || '$18.99'}
                                />
                            </Link>

                            {/* Card Body: Info */}
                            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                                        <span className="text-crimson-800 font-bold uppercase tracking-wider">
                                            Volume {book.id}
                                        </span>
                                        {book.isbn && <span>ISBN {book.isbn.slice(-7)}</span>}
                                    </div>

                                    <Link href={`/books/${book.id}`}>
                                        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-crimson-800 transition-colors leading-snug font-heading">
                                            {book.title}
                                        </h3>
                                    </Link>

                                    {book.subtitle && (
                                        <p className="text-xs font-serif italic text-stone-500">
                                            {book.subtitle}
                                        </p>
                                    )}

                                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 pt-1">
                                        {book.description}
                                    </p>
                                </div>

                                <div className="space-y-2.5 pt-3 border-t border-stone-100">
                                    <Link
                                        href={`/books/${book.id}`}
                                        className="btn btn-primary w-full text-xs py-2.5 text-center flex items-center justify-center gap-1.5"
                                    >
                                        <span>View Chapters & Details</span>
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
                                            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors text-center"
                                        >
                                            Amazon ↗
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
                    <div className="relative w-full max-w-2xl max-h-[85vh] bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-5 animate-fadeIn">
                        <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                            <div>
                                <span className="text-xs font-mono font-bold text-crimson-800 uppercase tracking-wider">
                                    Free Book Preview • Chapter 1
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading mt-0.5">
                                    {previewBook.title}
                                </h3>
                                <p className="text-xs text-stone-500">By Dr. Muhammad Salim</p>
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
                                {previewBook.sampleExcerpt || previewBook.description}
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
                                    Buy on Amazon ↗
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
