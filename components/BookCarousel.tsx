'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/data/books';

interface PremiumBookShowcaseProps {
    books: Book[];
}

export default function PremiumBookShowcase({ books }: PremiumBookShowcaseProps) {
    const [previewBook, setPreviewBook] = useState<Book | null>(null);

    return (
        <div className="py-6 sm:py-10">
            {/* Book Cards Grid - Clean 2D Luxury Monograph Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {books.map((book) => {
                    return (
                        <div
                            key={book.id}
                            className="bg-white border border-[#E3DBD0] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#C5A059]/60"
                        >
                            {/* Card Top: Pristine 2D Book Cover Display */}
                            <div className="p-8 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F5] to-white border-b border-[#EAE3D8] flex items-center justify-center">
                                <Link 
                                    href={`/books/${book.id}`}
                                    className="relative w-48 sm:w-52 aspect-[2/3] rounded-xl overflow-hidden shadow-[0_16px_36px_rgba(26,23,21,0.18)] border border-black/10 block transition-transform duration-300 group-hover:scale-103"
                                >
                                    {/* Left book spine shadow bar */}
                                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10 pointer-events-none" />
                                    
                                    <Image
                                        src={book.coverImage}
                                        alt={book.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 200px, 220px"
                                    />

                                    {/* Award Badge Overlay */}
                                    {book.award && (
                                        <div className="absolute top-2.5 right-2.5 z-20">
                                            <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/40 text-[9px] font-mono font-bold uppercase tracking-wider shadow-sm">
                                                ★ Award
                                            </span>
                                        </div>
                                    )}

                                    {/* Bottom Spec Strip */}
                                    <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 flex items-center justify-between text-[10px] font-mono text-white/90">
                                        <span className="text-[#F2D794] font-semibold">{book.price || '$18.99'}</span>
                                        <span className="text-stone-300">{book.pages || 350} Pages</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Book Information */}
                            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between text-xs font-mono text-[#7A726A]">
                                        <span className="text-[#7A1C1C] font-bold uppercase tracking-wider">
                                            Volume {book.id}
                                        </span>
                                        {book.isbn && <span>ISBN {book.isbn.slice(-7)}</span>}
                                    </div>

                                    <Link href={`/books/${book.id}`}>
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#1A1715] font-heading group-hover:text-[#7A1C1C] transition-colors leading-snug">
                                            {book.title}
                                        </h3>
                                    </Link>

                                    {book.subtitle && (
                                        <p className="text-xs font-serif italic text-[#7A726A] line-clamp-1">
                                            {book.subtitle}
                                        </p>
                                    )}

                                    <p className="text-[#554E48] text-xs sm:text-sm font-light leading-relaxed line-clamp-3 pt-1">
                                        {book.description}
                                    </p>
                                </div>

                                <div className="pt-3 space-y-2.5 border-t border-[#EAE3D8]">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setPreviewBook(book)}
                                            className="py-2.5 px-3 rounded-xl border border-[#D9CEBA] bg-white hover:bg-[#F5F1E8] text-[#1A1715] font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer shadow-xs"
                                        >
                                            📖 Excerpt
                                        </button>
                                        <Link
                                            href={`/books/${book.id}`}
                                            className="py-2.5 px-3 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white font-bold text-xs uppercase tracking-wider text-center transition-all shadow-xs"
                                        >
                                            Details →
                                        </Link>
                                    </div>

                                    <a
                                        href={book.amazonLink || 'https://www.amazon.com'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-2.5 px-4 rounded-xl bg-[#7A1C1C] hover:bg-[#631414] text-white font-bold text-xs uppercase tracking-wider text-center block transition-all shadow-xs"
                                    >
                                        Order on Amazon ↗
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Read Excerpt Modal */}
            {previewBook && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setPreviewBook(null)}
                >
                    <div
                        className="bg-[#FAF7F2] border border-[#D9CEBA] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-[#E3DBD0] pb-4">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-[#7A1C1C] uppercase tracking-wider">
                                    Volume {previewBook.id} · Chapter Excerpt
                                </span>
                                <h3 className="text-xl font-bold text-[#1A1715] font-heading">
                                    {previewBook.title}
                                </h3>
                            </div>
                            <button
                                onClick={() => setPreviewBook(null)}
                                className="w-8 h-8 rounded-full bg-[#EFE9DC] hover:bg-[#E3DBD0] text-[#1A1715] flex items-center justify-center text-sm font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[#E3DBD0] text-sm text-[#443E38] leading-relaxed font-serif italic">
                            "{previewBook.sampleExcerpt || previewBook.description}"
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <Link
                                href={`/books/${previewBook.id}`}
                                className="text-xs font-bold text-[#7A1C1C] hover:underline"
                            >
                                View Table of Contents & Synopsis →
                            </Link>
                            <a
                                href={previewBook.amazonLink}
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
        </div>
    );
}
