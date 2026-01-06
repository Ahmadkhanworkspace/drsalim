'use client';

import { useState, useRef, useEffect } from 'react';
import { Book } from '@/data/books';

interface PremiumBookShowcaseProps {
    books: Book[];
}

export default function PremiumBookShowcase({ books }: PremiumBookShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const booksPerView = 3;
    const maxIndex = Math.max(0, books.length - booksPerView);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, maxIndex]);

    const nextSlide = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <div style={{
            position: 'relative',
            padding: '4rem 0',
            overflow: 'hidden'
        }}>
            {/* Carousel Container */}
            <div style={{
                display: 'flex',
                transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(-${currentIndex * (100 / booksPerView)}%)`,
                gap: '2rem',
                padding: '0 1rem'
            }}>
                {books.map((book, index) => (
                    <div
                        key={book.id}
                        style={{
                            minWidth: `calc(${100 / booksPerView}% - 1.5rem)`,
                            flex: `0 0 calc(${100 / booksPerView}% - 1.5rem)`
                        }}
                        className="book-item"
                    >
                        {/* Premium Book Card */}
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative'
                        }}
                            className="premium-book-card">
                            {/* 3D Book Cover */}
                            <div style={{
                                position: 'relative',
                                height: '400px',
                                background: `linear-gradient(135deg, 
                                    ${index % 4 === 0 ? '#172554' :
                                        index % 4 === 1 ? '#1e3a8a' :
                                            index % 4 === 2 ? '#1e40af' : '#0f172a'} 0%, 
                                    ${index % 4 === 0 ? '#1e3a8a' :
                                        index % 4 === 1 ? '#2563eb' :
                                            index % 4 === 2 ? '#3b82f6' : '#172554'} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                perspective: '1000px'
                            }}>
                                {/* Book Spine Effect */}
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: '30px',
                                    background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
                                    zIndex: 2
                                }} />

                                {/* Gold Accent Stripe */}
                                <div style={{
                                    position: 'absolute',
                                    left: '30px',
                                    top: 0,
                                    bottom: 0,
                                    width: '4px',
                                    background: 'var(--color-gold)',
                                    zIndex: 3
                                }} />

                                {/* Book Icon with 3D effect */}
                                <div style={{
                                    fontSize: '7rem',
                                    filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.4))',
                                    transform: 'rotateY(-5deg)',
                                    transition: 'transform 0.4s ease',
                                    zIndex: 1
                                }} className="book-icon-3d">
                                    📖
                                </div>

                                {/* Decorative Corner */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: '100px',
                                    height: '100px',
                                    background: 'radial-gradient(circle at top right, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
                                }} />

                                {/* Book Number Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    width: '50px',
                                    height: '50px',
                                    background: 'var(--color-gold)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 900,
                                    fontSize: '1.3rem',
                                    color: 'white',
                                    boxShadow: '0 8px 20px rgba(251, 191, 36, 0.4)',
                                    fontFamily: 'var(--font-heading)',
                                    zIndex: 4
                                }}>
                                    {index + 1}
                                </div>
                            </div>

                            {/* Book Info */}
                            <div style={{
                                padding: '2rem',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                background: 'white'
                            }}>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '1rem',
                                    color: 'var(--color-text-navy)',
                                    fontWeight: 700,
                                    lineHeight: 1.3,
                                    fontFamily: 'var(--font-heading)',
                                    minHeight: '3.9em',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {book.title}
                                </h3>

                                <p style={{
                                    color: 'var(--color-text-body)',
                                    marginBottom: '2rem',
                                    lineHeight: 1.7,
                                    fontSize: '1rem',
                                    flex: 1,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {book.description}
                                </p>

                                <a
                                    href={book.amazonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        padding: '1rem 2rem',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    <span>Get on Amazon</span>
                                    <span style={{ fontSize: '1.2rem' }}>→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-60px',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'var(--color-text-navy)',
                    transition: 'all 0.3s ease',
                    zIndex: 10
                }}
                className="nav-button"
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-gold)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = 'var(--color-text-navy)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                ←
            </button>

            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-60px',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'var(--color-text-navy)',
                    transition: 'all 0.3s ease',
                    zIndex: 10
                }}
                className="nav-button"
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-gold)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = 'var(--color-text-navy)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                →
            </button>

            {/* Indicators */}
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                marginTop: '3rem'
            }}>
                {books.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setIsAutoPlaying(false);
                            setCurrentIndex(Math.min(index, maxIndex));
                        }}
                        style={{
                            width: index >= currentIndex && index < currentIndex + booksPerView ? '40px' : '10px',
                            height: '10px',
                            borderRadius: '5px',
                            background: index >= currentIndex && index < currentIndex + booksPerView
                                ? 'var(--color-gold)'
                                : 'rgba(100, 116, 139, 0.2)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: index >= currentIndex && index < currentIndex + booksPerView
                                ? '0 4px 12px rgba(251, 191, 36, 0.4)'
                                : 'none'
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
                .premium-book-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.25);
                }

                .premium-book-card:hover .book-icon-3d {
                    transform: rotateY(0deg) scale(1.05);
                }

                @media (max-width: 1200px) {
                    .nav-button {
                        display: none !important;
                    }
                }

                @media (max-width: 968px) {
                    .book-item {
                        min-width: calc(50% - 1rem) !important;
                        flex: 0 0 calc(50% - 1rem) !important;
                    }
                }

                @media (max-width: 640px) {
                    .book-item {
                        min-width: calc(100% - 1rem) !important;
                        flex: 0 0 calc(100% - 1rem) !important;
                    }
                }
            `}</style>
        </div>
    );
}
