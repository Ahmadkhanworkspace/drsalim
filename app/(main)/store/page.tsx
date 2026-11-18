import { getBooks } from "@/app/lib/actions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function StorePage() {
    const books = await getBooks();

    return (
        <main className="bg-white min-h-screen pb-24 text-stone-900 relative overflow-hidden">
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
                        Scholarly Works of <br />
                        <span className="bg-gradient-to-r from-crimson-700 to-amber-700 bg-clip-text text-transparent font-serif italic font-normal">
                            Dr. Muhammad Salim
                        </span>
                    </h1>

                    <p className="text-stone-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Explore a lifetime of research and spiritual insight. Each volume offers a profound synthesis of theological wisdom, moral philosophy, and empirical inquiry.
                    </p>
                </div>
            </div>

            {/* Book Grid */}
            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {books.map((book, index) => {
                        const colors = [
                            'from-[#800F15] via-[#9B111E] to-[#600A0E]',
                            'from-[#064E3B] via-[#047857] to-[#022C22]',
                            'from-[#1E3A8A] via-[#1D4ED8] to-[#172554]',
                            'from-[#581C87] via-[#6B21A8] to-[#3B0764]',
                            'from-[#0F172A] via-[#1E293B] to-[#020617]'
                        ];
                        const bookBg = colors[index % colors.length];

                        return (
                            <div
                                key={book.id || index}
                                className="group bg-white border border-stone-200/90 hover:border-amber-400 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                            >
                                {/* Book Cover Area */}
                                <div className="h-64 sm:h-72 bg-stone-100 flex items-center justify-center relative overflow-hidden border-b border-stone-200/80 p-6">
                                    {/* Luminous Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/40 via-rose-100/20 to-transparent pointer-events-none" />

                                    {/* Elegant Book Mockup */}
                                    <div className={`w-32 h-44 rounded-xl bg-gradient-to-br ${bookBg} text-white shadow-xl flex flex-col justify-between p-3.5 relative transform group-hover:scale-105 group-hover:rotate-0 -rotate-3 transition-all duration-300 border border-white/20`}>
                                        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/25 border-r border-white/10 rounded-l-xl" />

                                        <div className="text-[8px] font-mono uppercase text-amber-200/80 font-bold tracking-wider pl-2">
                                            Dr. Salim
                                        </div>
                                        <div className="text-xs font-bold text-white font-heading leading-tight pl-2 my-auto">
                                            {book.title}
                                        </div>
                                        <div className="text-[8px] font-mono text-amber-200/60 uppercase pl-2">
                                            Edition {index + 1}
                                        </div>
                                    </div>

                                    {/* Price Badge */}
                                    {book.price && (
                                        <div className="absolute top-4 right-4 bg-amber-500 text-stone-950 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md border border-amber-300">
                                            ${book.price}
                                        </div>
                                    )}
                                </div>

                                {/* Book Information */}
                                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-[2px] bg-crimson-600 rounded-full" />
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-crimson-700">
                                                Authored Monograph
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-stone-900 font-heading group-hover:text-crimson-700 transition-colors leading-snug">
                                            {book.title}
                                        </h3>

                                        <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                                            {book.description}
                                        </p>
                                    </div>

                                    <div className="pt-2 space-y-2">
                                        <Link
                                            href={`/books/${book.id}`}
                                            className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider text-center block transition-all"
                                        >
                                            View Chapters & Options →
                                        </Link>
                                        <a
                                            href={book.amazonLink || 'https://www.amazon.com'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs uppercase tracking-wider text-center block transition-all"
                                        >
                                            Buy on Amazon ↗
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
