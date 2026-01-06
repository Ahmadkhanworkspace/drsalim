import { getBooks } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function StorePage() {
    const books = await getBooks();

    return (
        <main style={{ background: '#0f172a', minHeight: '100vh', paddingBottom: '6rem' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #172554 100%)',
                padding: '8rem 2rem 6rem',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Decoration */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '20px',
                        color: '#60a5fa',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        marginBottom: '1.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                        Official Bookstore
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-1px'
                    }}>
                        Scholarly Works of <br /> Dr. Muhammad Salim
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: '#94a3b8',
                        maxWidth: '650px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        Explore a lifetime of research and spiritual insight. Each volume offers a unique perspective on theology, philosophy, and the human condition.
                    </p>
                </div>
            </div>

            {/* Book Grid */}
            <div className="container" style={{
                maxWidth: '1200px',
                margin: '-4rem auto 0',
                padding: '0 2rem',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {books.map((book, index) => (
                        <div key={book.id || index} className="book-card-hover" style={{
                            background: '#1e293b',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(148, 163, 184, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Book Cover Area */}
                            <div style={{
                                height: '240px',
                                background: `linear-gradient(135deg, 
                  ${index % 5 === 0 ? '#1e3a8a' :
                                        index % 5 === 1 ? '#1e40af' :
                                            index % 5 === 2 ? '#172554' :
                                                index % 5 === 3 ? '#1e3a8a' : '#1e40af'} 0%, 
                  ${index % 5 === 0 ? '#3b82f6' :
                                        index % 5 === 1 ? '#60a5fa' :
                                            index % 5 === 2 ? '#2563eb' :
                                                index % 5 === 3 ? '#3b82f6' : '#60a5fa'} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Book Icon */}
                                <div style={{
                                    fontSize: '6rem',
                                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                                    transform: 'rotate(-5deg)'
                                }}>📖</div>

                                {/* Badge */}
                                {book.price && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        background: '#fbbf24',
                                        color: '#0f172a',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '12px',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        ${book.price}
                                    </div>
                                )}
                            </div>

                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontWeight: 600,
                                    marginBottom: '0.5rem'
                                }}>
                                    Best Seller
                                </div>

                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    marginBottom: '1rem',
                                    lineHeight: 1.3
                                }}>
                                    {book.title}
                                </h3>

                                <p style={{
                                    fontSize: '1rem',
                                    color: '#cbd5e1',
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
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.8rem',
                                            background: 'white',
                                            color: '#0f172a',
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            textDecoration: 'none',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                        }}
                                        className="buy-button"
                                    >
                                        <span>Purchase on Amazon</span>
                                        <span>→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .book-card-hover:hover {
            transform: translateY(-10px) !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
            border-color: rgba(59, 130, 246, 0.5) !important;
        }
        .buy-button:hover {
            transform: scale(1.02);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </main>
    );
}
