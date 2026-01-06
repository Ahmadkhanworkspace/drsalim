'use client';

import { useState, useRef, useEffect } from 'react';
import { Book } from '@/data/books';

interface PremiumBookShowcaseProps {
    books: Book[];
}

export default function PremiumBookShowcase({ books }: PremiumBookShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const booksPerView = 3; // Show 3 books at a time on desktop
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

    const goToBook = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentIndex(Math.min(index, maxIndex));
    };

    return (
        <div style={{
            position: 'relative',
            padding: 'var(--spacing-2xl) 0',
            overflow: 'hidden'
        }}>
            {/* Main Carousel Container */}
            <div
                ref={scrollContainerRef}
                style={{
                    display: 'flex',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: `translateX(-${currentIndex * (100 / booksPerView)}%)`,
                    gap: 'var(--spacing-xl)',
                    padding: '0 var(--spacing-md)'
                }}
            >
                {books.map((book, index) => (
                    <div
                        key={book.id}
                        style={{
                            minWidth: `calc(${100 / booksPerView}% - var(--spacing-xl))`,
                            flex: `0 0 calc(${100 / booksPerView}% - var(--spacing-xl))`
                        }}
                    >
                        <div
                            className="modern-card"
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 0,
                                overflow: 'hidden',
                                background: 'var(--color-bg-card)',
                                transition: 'all var(--transition-normal)'
                            }}
                        >
                            {/* Book Cover */}
                            <div style={{
                                position: 'relative',
                                height: '400px',
                                background: `linear-gradient(135deg, 
                  ${index % 5 === 0 ? '#2d5f8d' :
                                        index % 5 === 1 ? '#5a9bd4' :
                                            index % 5 === 2 ? '#1a2332' :
                                                index % 5 === 3 ? '#2d5f8d' : '#5a9bd4'} 0%, 
                  ${index % 5 === 0 ? '#5a9bd4' :
                                        index % 5 === 1 ? '#a8d8f0' :
                                            index % 5 === 2 ? '#2d5f8d' :
                                                index % 5 === 3 ? '#5a9bd4' : '#a8d8f0'} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                {/* Book Icon */}
                                <div style={{
                                    fontSize: '8rem',
                                    filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5))',
                                    transition: 'transform var(--transition-normal)'
                                }} className="book-icon">
                                    📚
                                </div>

                                {/* Decorative Elements */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-50px',
                                    right: '-50px',
                                    width: '200px',
                                    height: '200px',
                                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                                    borderRadius: '50%'
                                }} />

                                {/* Book Number Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: 'var(--spacing-md)',
                                    left: 'var(--spacing-md)',
                                    width: '50px',
                                    height: '50px',
                                    background: 'var(--gradient-accent)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 900,
                                    fontSize: '1.5rem',
                                    color: 'var(--color-navy)',
                                    boxShadow: 'var(--shadow-glow)'
                                }}>
                                    {index + 1}
                                </div>
                            </div>

                            {/* Book Info */}
                            <div style={{
                                padding: 'var(--spacing-lg)',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    marginBottom: 'var(--spacing-md)',
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 800,
                                    lineHeight: 1.3,
                                    minHeight: '3.6em',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {book.title}
                                </h3>

                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    marginBottom: 'var(--spacing-lg)',
                                    lineHeight: 1.7,
                                    fontSize: '0.95rem',
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
                                        gap: 'var(--spacing-sm)',
                                        padding: 'var(--spacing-md)'
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
                className="carousel-button prev"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-25px',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                }}
                aria-label="Previous books"
            >
                ←
            </button>

            <button
                onClick={nextSlide}
                className="carousel-button next"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-25px',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                }}
                aria-label="Next books"
            >
                →
            </button>

            {/* Indicators */}
            <div style={{
                display: 'flex',
                gap: 'var(--spacing-sm)',
                justifyContent: 'center',
                marginTop: 'var(--spacing-xl)',
                flexWrap: 'wrap'
            }}>
                {books.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToBook(index)}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: index >= currentIndex && index < currentIndex + booksPerView
                                ? 'var(--color-accent)'
                                : 'rgba(90, 155, 212, 0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all var(--transition-normal)',
                            boxShadow: index >= currentIndex && index < currentIndex + booksPerView
                                ? 'var(--shadow-glow)'
                                : 'none',
                            transform: index >= currentIndex && index < currentIndex + booksPerView
                                ? 'scale(1.3)'
                                : 'scale(1)'
                        }}
                        aria-label={`Go to book ${index + 1}`}
                    />
                ))}
            </div>

            {/* Auto-play indicator */}
            <div style={{
                textAlign: 'center',
                marginTop: 'var(--spacing-md)',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem'
            }}>
                {isAutoPlaying ? '⏸️ Auto-playing' : '▶️ Paused'} • {books.length} Books Available
            </div>

            <style jsx>{`
        .modern-card:hover .book-icon {
          transform: scale(1.1) rotate(5deg);
        }

        @media (max-width: 1200px) {
          .carousel-button {
            display: none !important;
          }
        }

        @media (max-width: 968px) {
          div[style*="minWidth"] {
            min-width: calc(50% - var(--spacing-xl)) !important;
            flex: 0 0 calc(50% - var(--spacing-xl)) !important;
          }
        }

        @media (max-width: 640px) {
          div[style*="minWidth"] {
            min-width: calc(100% - var(--spacing-xl)) !important;
            flex: 0 0 calc(100% - var(--spacing-xl)) !important;
          }
        }
      `}</style>
        </div>
    );
}
