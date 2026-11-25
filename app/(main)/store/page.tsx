import { books } from "@/data/books";
import Link from "next/link";
import Image from "next/image";

export default function StorePage() {
    return (
        <main className="bg-[#FAF7F2] min-h-screen pb-24 text-[#1A1715] relative overflow-hidden">
            {/* Ambient Background Highlights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#EFE8DC]/60 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#F7EFE3]/70 rounded-full blur-[140px] pointer-events-none z-0" />

            {/* Hero Header */}
            <div className="relative z-10 pt-32 sm:pt-40 pb-14 sm:pb-16 border-b border-[#E8E1D5] bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F5] to-[#FAF8F5]">
                <div className="container px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#7A1C1C] bg-[#7A1C1C]/10 border border-[#7A1C1C]/20 shadow-2xs">
                        Official Publishing Bookstore
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight font-heading text-[#1A1715] tracking-tight">
                        Published Works of <br />
                        <span className="text-[#7A1C1C] font-serif italic font-normal">
                            Dr. Muhammad Salim
                        </span>
                    </h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#7A1C1C] via-[#C5A059] to-transparent mx-auto rounded-full" />

                    <p className="text-[#554E48] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Explore authoritative published volumes on moral philosophy, spiritual heart management, divine providence, and building a peaceful society.
                    </p>
                </div>
            </div>

            {/* Book Grid - Clean 2D Luxury Monograph Showcase */}
            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {books.map((book) => {
                        return (
                            <div
                                key={book.id}
                                className="group bg-white border border-[#E3DBD0] hover:border-[#C5A059]/60 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Pristine 2D Book Cover Display */}
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

                                        {/* Award Badge */}
                                        {book.award && (
                                            <div className="absolute top-2.5 right-2.5 z-20">
                                                <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/40 text-[9px] font-mono font-bold uppercase tracking-wider shadow-sm">
                                                    ★ Award Winner
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
                                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
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
                                        <Link
                                            href={`/books/${book.id}`}
                                            className="w-full py-3 px-4 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white font-bold text-xs uppercase tracking-wider text-center block transition-all shadow-2xs"
                                        >
                                            View Chapters & Details →
                                        </Link>
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
            </div>
        </main>
    );
}
