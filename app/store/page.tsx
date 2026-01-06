import { books } from "@/data/books";
import Image from "next/image";
import Link from "next/link";

export default function StorePage() {
    return (
        <main style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                padding: '6rem 2rem 4rem',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #60a5fa, #34d399)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Official Book Store
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#94a3b8',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: 1.6
                    }}>
                        Explore the complete collection of Dr. Muhammad Salim's scholarly works.
                        Deepen your understanding with these carefully curated publications.
                    </p>
                </div>
            </div>

            {/* Book Grid */}
            <div className="container" style={{
                maxWidth: '1200px',
                margin: '-2rem auto 0',
                padding: '0 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {books.map((book) => (
                    <div key={book.id} style={{
                        background: 'white',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        border: '1px solid #e2e8f0'
                    }}>
                        {/* Book Cover Placeholder */}
                        <div style={{
                            height: '280px',
                            background: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Fallback pattern since we might not have real images yet */}
                            <div style={{
                                fontSize: '4rem',
                                opacity: 0.1,
                                transform: 'rotate(-15deg)'
                            }}>📖</div>
                            <div style={{
                                position: 'absolute',
                                bottom: '1rem',
                                left: '1rem',
                                right: '1rem',
                                background: 'rgba(255,255,255,0.9)',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontSize: '0.8rem',
                                color: '#64748b',
                                fontWeight: 600
                            }}>
                                {book.title}
                            </div>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#1e293b',
                                marginBottom: '0.5rem',
                                lineHeight: 1.3
                            }}>
                                {book.title}
                            </h3>

                            <p style={{
                                fontSize: '0.95rem',
                                color: '#64748b',
                                lineHeight: 1.6,
                                marginBottom: '1.5rem',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {book.description}
                            </p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 'auto'
                            }}>
                                <span style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 800,
                                    color: '#0f172a'
                                }}>
                                    $19.99
                                </span>

                                <a href={book.amazonLink} target="_blank" rel="noopener noreferrer" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: '#0f172a',
                                    color: 'white',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    transition: 'background 0.2s'
                                }}>
                                    Buy on Amazon →
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
