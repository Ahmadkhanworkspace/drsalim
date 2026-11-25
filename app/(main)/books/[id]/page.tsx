'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { books, Book } from '@/data/books';
import Image from 'next/image';

export default function BookDetailPage() {
    const params = useParams();
    const bookId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '1');
    const book: Book | undefined = books.find(b => b.id === bookId) || books[0];

    const [activeTab, setActiveTab] = useState<'synopsis' | 'chapters' | 'sample'>('synopsis');
    const [copiedLink, setCopiedLink] = useState(false);

    if (!book) {
        return (
            <div className="bg-white text-stone-900 min-h-[80vh] flex flex-col items-center justify-center text-center p-6 sm:p-8">
                <h1 className="text-6xl font-black text-crimson-700 mb-4 font-heading">404</h1>
                <p className="text-stone-600 max-w-sm mb-8">The book volume you are looking for was not found.</p>
                <Link href="/#books" className="btn btn-primary">
                    Return to Library
                </Link>
            </div>
        );
    }

    const handleCopyShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2500);
        }
    };

    return (
        <main className="bg-white min-h-screen text-stone-900 pt-28 sm:pt-36 pb-24 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-rose-100/20 rounded-full blur-[140px] pointer-events-none z-0" />

            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-xs font-mono text-stone-500">
                    <Link href="/" className="hover:text-crimson-800 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/#books" className="hover:text-crimson-800 transition-colors">Books</Link>
                    <span>/</span>
                    <span className="text-stone-800 font-bold truncate max-w-xs">{book.title}</span>
                </nav>

                {/* Top Book Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    
                    {/* Left: Book Cover & Quick Spec Column (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col items-center justify-center relative">
                            {/* Award Badge if present */}
                            {book.award && (
                                <div className="absolute top-4 left-4 bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs">
                                    ★ {book.award}
                                </div>
                            )}

                            {/* Pristine 2D Hardcover Book Mockup */}
                            <div className="relative w-56 sm:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(26,23,21,0.22)] border border-black/10 my-4 group">
                                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10 pointer-events-none" />
                                <Image
                                    src={book.coverImage || '/images/books/brotherhood-cover.jpg'}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 640px) 240px, 260px"
                                />
                                {book.award && (
                                    <div className="absolute top-3 right-3 z-20">
                                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/40 text-[9px] font-mono font-bold uppercase tracking-wider shadow-md">
                                            ★ {book.award}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Clean Pricing summary */}
                            <div className="mt-8 text-center">
                                <span className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-0.5">List Price</span>
                                <span className="text-2xl font-extrabold text-stone-900">{book.price || '$18.99'}</span>
                            </div>
                        </div>

                        {/* Specification Box */}
                        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
                                Book Specifications
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div>
                                    <span className="text-stone-400 block font-mono text-[10px] uppercase">Author</span>
                                    <span className="font-semibold text-stone-800">Dr. Muhammad Salim</span>
                                </div>
                                <div>
                                    <span className="text-stone-400 block font-mono text-[10px] uppercase">Language</span>
                                    <span className="font-semibold text-stone-800">English</span>
                                </div>
                                <div>
                                    <span className="text-stone-400 block font-mono text-[10px] uppercase">Length</span>
                                    <span className="font-semibold text-stone-800">{book.pages || 350} Pages</span>
                                </div>
                                <div>
                                    <span className="text-stone-400 block font-mono text-[10px] uppercase">ISBN</span>
                                    <span className="font-semibold text-stone-800 font-mono">{book.isbn || '978-969-9022-XX'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Book Details & Purchase Options (7 cols) */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-800 mb-2 block">
                                Volume {book.id} · Published Work
                            </span>
                            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-stone-900 tracking-tight leading-tight mb-2">
                                {book.title}
                            </h1>
                            {book.subtitle && (
                                <p className="text-stone-600 text-base sm:text-lg font-serif italic mb-4">
                                    {book.subtitle}
                                </p>
                            )}
                            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
                                {book.description}
                            </p>
                        </div>

                        {/* PURCHASE OPTIONS CARD */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200/90 shadow-2xs space-y-5">
                            <div>
                                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-900 mb-1">
                                    Where to Order
                                </h3>
                                <p className="text-xs text-stone-600">
                                    Available worldwide in print and digital editions through major booksellers.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Amazon Paperback */}
                                <a
                                    href={book.amazonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-crimson-700 hover:shadow-md transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="font-bold text-stone-900 text-base group-hover:text-crimson-800 transition-colors">
                                            Amazon Paperback
                                        </div>
                                        <div className="text-xs text-stone-500 font-mono mt-1">
                                            Print Edition · {book.price || '$18.99'}
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-crimson-800 pt-4 flex items-center justify-between">
                                        <span>Order on Amazon</span>
                                        <span>↗</span>
                                    </span>
                                </a>

                                {/* Amazon Kindle */}
                                <a
                                    href={book.amazonKindleLink || book.amazonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-crimson-700 hover:shadow-md transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="font-bold text-stone-900 text-base group-hover:text-crimson-800 transition-colors">
                                            Kindle eBook
                                        </div>
                                        <div className="text-xs text-stone-500 font-mono mt-1">
                                            Instant Digital Reading
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-crimson-800 pt-4 flex items-center justify-between">
                                        <span>Buy on Kindle</span>
                                        <span>↗</span>
                                    </span>
                                </a>
                            </div>
                        </div>

                        {/* Interactive Tabs: Synopsis / Chapters / Preview */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                                <button
                                    onClick={() => setActiveTab('synopsis')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === 'synopsis'
                                            ? 'bg-crimson-800 text-white shadow-2xs'
                                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                                    }`}
                                >
                                    Full Synopsis & Themes
                                </button>
                                <button
                                    onClick={() => setActiveTab('chapters')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === 'chapters'
                                            ? 'bg-crimson-800 text-white shadow-2xs'
                                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                                    }`}
                                >
                                    Table of Contents ({book.chapters?.length || 6})
                                </button>
                                <button
                                    onClick={() => setActiveTab('sample')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === 'sample'
                                            ? 'bg-crimson-800 text-white shadow-2xs'
                                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                                    }`}
                                >
                                    📖 Free Sample Excerpt
                                </button>
                            </div>

                            {/* Tab 1: Full Synopsis & Key Themes */}
                            {activeTab === 'synopsis' && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
                                        <h3 className="font-heading font-bold text-lg text-stone-900">
                                            About This Work
                                        </h3>
                                        <div className="text-stone-700 text-sm leading-relaxed space-y-3 whitespace-pre-line font-light">
                                            {book.fullSynopsis || book.description}
                                        </div>
                                    </div>

                                    {/* Key Themes / What You Will Learn */}
                                    {book.keyThemes && (
                                        <div className="space-y-3">
                                            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                                                Key Themes & Takeaways
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {book.keyThemes.map((theme, i) => (
                                                    <div key={i} className="p-4 rounded-xl bg-white border border-stone-200 flex items-start gap-3">
                                                        <span className="text-crimson-700 font-bold text-sm mt-0.5">✓</span>
                                                        <span className="text-xs text-stone-700 leading-relaxed">{theme}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Tab 2: Table of Contents */}
                            {activeTab === 'chapters' && (
                                <div className="space-y-3 animate-fadeIn">
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-2">
                                        Complete Chapter Directory
                                    </h3>
                                    <div className="space-y-2">
                                        {(book.chapters || [
                                            "1. Foundations of Moral Consciousness",
                                            "2. The Structure of Societal Harmony",
                                            "3. Spiritual Purification in Everyday Life",
                                            "4. Overcoming Modern Materialistic Dilemmas",
                                            "5. The Timeless Prophetic Blueprint",
                                            "6. Concluding Reflections & Daily Practice"
                                        ]).map((chapter, i) => (
                                            <div
                                                key={i}
                                                className="p-4 rounded-xl bg-stone-50 border border-stone-200/90 flex items-center justify-between text-xs hover:border-amber-400 transition-colors"
                                            >
                                                <span className="font-medium text-stone-800">{chapter}</span>
                                                <span className="text-stone-400 font-mono text-[11px]">Chapter {i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tab 3: Free Sample Excerpt */}
                            {activeTab === 'sample' && (
                                <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4 animate-fadeIn">
                                    <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                                        <span className="text-xs font-mono font-bold uppercase text-amber-950">
                                            Chapter 1 Preview Excerpt
                                        </span>
                                        <button
                                            onClick={handleCopyShare}
                                            className="text-xs text-crimson-800 hover:underline font-bold cursor-pointer"
                                        >
                                            {copiedLink ? '✓ Link Copied' : 'Share Excerpt'}
                                        </button>
                                    </div>
                                    <blockquote className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                                        "{book.sampleExcerpt || book.description}"
                                    </blockquote>
                                    <div className="pt-2 flex flex-wrap items-center gap-3">
                                        <a
                                            href={book.amazonLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary text-xs"
                                        >
                                            Order on Amazon →
                                        </a>
                                        <Link
                                            href="/#books"
                                            className="btn btn-outline text-xs"
                                        >
                                            Browse Other Volumes
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Other Books Carousel / Navigation */}
                <div className="mt-20 pt-12 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-800 block mb-1">
                                Explore More
                            </span>
                            <h2 className="text-2xl font-bold text-stone-900 font-heading">
                                Other Volumes by Dr. Muhammad Salim
                            </h2>
                        </div>
                        <Link href="/#books" className="text-xs font-bold text-crimson-800 hover:underline">
                            View All 5 Books →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {books.filter(b => b.id !== book.id).slice(0, 4).map((otherBook) => (
                            <Link
                                key={otherBook.id}
                                href={`/books/${otherBook.id}`}
                                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <span className="text-[10px] font-mono text-crimson-700 font-bold uppercase block mb-1">
                                        Volume {otherBook.id}
                                    </span>
                                    <h3 className="font-bold text-stone-900 group-hover:text-crimson-800 transition-colors text-base font-heading mb-2">
                                        {otherBook.title}
                                    </h3>
                                    <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                                        {otherBook.description}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-crimson-800 pt-4 mt-auto">
                                    View Details →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
