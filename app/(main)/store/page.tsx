import { getBooks } from "@/app/lib/actions";
import Link from "next/link";
import FluidTiltCard from "@/components/3d/FluidTiltCard";

export const dynamic = 'force-dynamic';

export default async function StorePage() {
    const books = await getBooks();

    return (
        <main className="bg-[#FCFBF8] min-h-screen pb-24 text-stone-900 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[140px] pointer-events-none z-0" />

            {/* Hero Header */}
            <div className="relative z-10 pt-32 sm:pt-40 pb-14 sm:pb-16 border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-white">
                <div className="container px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-crimson-800 bg-crimson-50 border border-crimson-200 shadow-2xs">
                        Official Bookstore
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight font-heading text-stone-900 tracking-tight">
                        Published Works of <br />
                        <span className="text-crimson-800 font-serif italic font-normal">
                            Dr. Muhammad Salim
                        </span>
                    </h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-crimson-800 via-amber-600 to-transparent mx-auto rounded-full" />

                    <p className="text-stone-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Explore authoritative published volumes on moral philosophy, spiritual heart management, divine providence, and building a peaceful society.
                    </p>
                </div>
            </div>

            {/* Book Grid with Fluid 3D Tilt */}
            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {books.map((book) => {
                        return (
                            <div
                                key={book.id}
                                className="group bg-white border border-stone-200/90 hover:border-amber-400 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                            >
                                {/* 3D Fluid Tilt Cover Area */}
                                <Link
                                    href={`/books/${book.id}`}
                                    className="block p-6 sm:p-8 bg-gradient-to-b from-stone-50 via-stone-50/70 to-white border-b border-stone-100"
                                >
                                    <FluidTiltCard
                                        coverImage={book.coverImage || '/images/books/brotherhood-cover.jpg'}
                                        title={book.title}
                                        badge={book.award ? 'Award Winner' : undefined}
                                        pages={book.pages || 350}
                                        price={book.price || '$18.99'}
                                    />
                                </Link>

                                {/* Book Information */}
                                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                                            <span className="text-crimson-800 font-bold uppercase tracking-wider">
                                                Volume {book.id}
                                            </span>
                                            {book.isbn && <span>ISBN {book.isbn.slice(-7)}</span>}
                                        </div>

                                        <Link href={`/books/${book.id}`}>
                                            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading group-hover:text-crimson-700 transition-colors leading-snug">
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

                                    <div className="pt-3 space-y-2.5 border-t border-stone-100">
                                        <Link
                                            href={`/books/${book.id}`}
                                            className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider text-center block transition-all shadow-2xs"
                                        >
                                            View Chapters & Details →
                                        </Link>
                                        <a
                                            href={book.amazonLink || 'https://www.amazon.com'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider text-center block transition-all"
                                        >
                                            Order on Amazon ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
