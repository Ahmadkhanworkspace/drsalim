import { getBooks } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function StorePage() {
    const books = await getBooks();

    return (
        <main className="bg-charcoal-950 min-h-screen pb-24 text-stone-100 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(circle_at_top,rgba(153,0,0,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

            {/* Hero Header */}
            <div className="relative z-10 pt-36 pb-16 border-b border-white/5">
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="inline-block px-5 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-white mb-8 bg-crimson-500">
                        Official Bookstore
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 font-heading text-white tracking-tighter">
                        Scholarly Works of <br /> Dr. Muhammad Salim
                    </h1>

                    <p className="text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Explore a lifetime of research and spiritual insight. Each volume offers a unique perspective on theology, philosophy, and the human condition.
                    </p>
                </div>
            </div>

            {/* Book Grid */}
            <div className="container relative z-10" style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {books.map((book, index) => (
                        <div key={book.id || index} className="book-card-hover glass-card flex flex-col border border-white/5 relative rounded-none" style={{
                            backgroundColor: 'rgba(20, 20, 20, 0.6)',
                            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.5s ease, box-shadow 0.5s ease',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Book Cover Area */}
                            <div style={{
                                height: '260px',
                                background: 'linear-gradient(135deg, hsl(0 0% 12%) 0%, hsl(0 100% 10%) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                            }}>
                                {/* Ambient grid pattern overlay inside cover */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("/section-bg.png")', backgroundSize: 'cover' }} />
                                
                                {/* Elegant Book Mockup */}
                                <div style={{
                                    width: '120px',
                                    height: '170px',
                                    backgroundColor: 'hsl(0 100% 18%)',
                                    borderLeft: '4px solid hsl(0 100% 28%)',
                                    boxShadow: '10px 10px 20px rgba(0,0,0,0.5)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '1rem 0.75rem',
                                    position: 'relative',
                                    transform: 'rotate(-4deg)',
                                    transition: 'transform 0.5s ease',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }} className="book-spine-glow">
                                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                                        Salim
                                    </div>
                                    <div style={{ 
                                        fontFamily: 'var(--font-heading), serif',
                                        fontSize: '0.85rem', 
                                        fontWeight: 'bold', 
                                        color: '#ffffff', 
                                        lineHeight: '1.2',
                                        marginTop: '0.5rem',
                                        marginBottom: 'auto'
                                    }}>
                                        {book.title}
                                    </div>
                                    <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Volume {index + 1}
                                    </div>
                                </div>

                                {/* Price Badge */}
                                {book.price && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        background: 'hsl(0 100% 30%)',
                                        color: 'white',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '0px',
                                        fontWeight: 900,
                                        fontSize: '0.8rem',
                                        letterSpacing: '1px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                                    }}>
                                        ${book.price}
                                    </div>
                                )}
                            </div>

                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-4 h-[1px] bg-crimson-500/50"></span>
                                    <span style={{
                                        color: 'var(--color-crimson-500)',
                                        fontSize: '9px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: 'black'
                                    }}>
                                        Scholarly Work
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 font-heading">
                                    {book.title}
                                </h3>

                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#a3a3a3',
                                    lineHeight: 1.6,
                                    marginBottom: '2rem',
                                    flex: 1,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {book.description}
                                </p>

                                <div style={{ marginTop: 'auto' }}>
                                    <a
                                        href={book.amazonLink || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary w-full text-center"
                                        style={{
                                            display: 'block',
                                            padding: '1rem',
                                            fontSize: '10px',
                                            letterSpacing: '0.2em'
                                        }}
                                    >
                                        Purchase on Amazon
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .book-card-hover:hover {
                    transform: translateY(-8px) !important;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6) !important;
                    border-color: rgba(153, 0, 0, 0.4) !important;
                }
                .book-card-hover:hover .book-spine-glow {
                    transform: rotate(0deg) scale(1.05) !important;
                    box-shadow: 15px 15px 30px rgba(0,0,0,0.7) !important;
                }
            `}</style>
        </main>
    );
}

