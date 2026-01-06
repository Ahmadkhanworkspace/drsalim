'use client';

import { useState } from 'react';
import { Testimonial } from '@/data/testimonials';

interface TestimonialsSliderProps {
    testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="section" style={{
            background: 'var(--color-bg-secondary)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(0, 212, 255, 0.1)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        marginBottom: 'var(--spacing-md)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        border: '1px solid rgba(0, 212, 255, 0.3)'
                    }}>
                        Testimonials
                    </div>

                    <h2 style={{
                        marginBottom: 'var(--spacing-sm)',
                        background: 'linear-gradient(135deg, #00d4ff 0%, #5a9bd4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: 'clamp(2rem, 4vw, 3rem)'
                    }}>
                        What Readers Are Saying
                    </h2>

                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {testimonials.length} reviews from satisfied readers worldwide
                    </p>
                </div>

                {/* Slider Container */}
                <div style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    {/* Main Card */}
                    <div className="modern-card" style={{
                        padding: 'var(--spacing-2xl)',
                        minHeight: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        background: 'var(--color-bg-card)',
                        position: 'relative'
                    }}>
                        {/* Stars */}
                        <div style={{
                            display: 'flex',
                            gap: '0.3rem',
                            marginBottom: 'var(--spacing-lg)',
                            justifyContent: 'center'
                        }}>
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                                <span key={i} style={{
                                    color: 'var(--color-accent)',
                                    fontSize: '1.5rem',
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 212, 255, 0.3))'
                                }}>
                                    ⭐
                                </span>
                            ))}
                        </div>

                        {/* Quote */}
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '1.15rem',
                            lineHeight: 1.9,
                            marginBottom: 'var(--spacing-xl)',
                            textAlign: 'center',
                            fontStyle: 'italic',
                            maxWidth: '750px',
                            margin: '0 auto var(--spacing-xl)'
                        }}>
                            "{currentTestimonial.content}"
                        </p>

                        {/* Author */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--spacing-md)',
                            paddingTop: 'var(--spacing-lg)',
                            borderTop: '2px solid rgba(0, 212, 255, 0.2)'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.8rem',
                                border: '3px solid var(--color-accent)',
                                flexShrink: 0
                            }}>
                                👤
                            </div>

                            <div>
                                <h4 style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1.2rem',
                                    fontWeight: 800,
                                    marginBottom: '0.25rem'
                                }}>
                                    {currentTestimonial.name}
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: '0.95rem',
                                    marginBottom: '0.25rem'
                                }}>
                                    {currentTestimonial.role}
                                </p>
                                <p style={{
                                    color: 'var(--color-accent)',
                                    fontSize: '0.85rem',
                                    fontWeight: 700
                                }}>
                                    {currentTestimonial.date}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="carousel-button prev"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-60px',
                            transform: 'translateY(-50%)'
                        }}
                    >
                        ←
                    </button>

                    <button
                        onClick={nextSlide}
                        className="carousel-button next"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '-60px',
                            transform: 'translateY(-50%)'
                        }}
                    >
                        →
                    </button>

                    {/* Indicators */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        marginTop: 'var(--spacing-xl)'
                    }}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: currentIndex === index ? '30px' : '10px',
                                    height: '10px',
                                    borderRadius: '5px',
                                    background: currentIndex === index ? 'var(--color-accent)' : 'rgba(90, 155, 212, 0.3)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-normal)',
                                    boxShadow: currentIndex === index ? '0 0 15px rgba(0, 212, 255, 0.5)' : 'none'
                                }}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <div style={{
                        textAlign: 'center',
                        marginTop: 'var(--spacing-md)',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}>
                        {currentIndex + 1} / {testimonials.length}
                    </div>
                </div>

                {/* CTA */}
                <div style={{
                    textAlign: 'center',
                    marginTop: 'var(--spacing-2xl)',
                    padding: 'var(--spacing-xl)',
                    background: 'rgba(0, 212, 255, 0.05)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(0, 212, 255, 0.2)'
                }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-sm)',
                        fontSize: '1.6rem'
                    }}>
                        Join Our Community
                    </h3>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--spacing-lg)',
                        fontSize: '1.05rem'
                    }}>
                        Subscribe to receive the latest insights
                    </p>
                    <a href="#newsletter" className="btn btn-primary">
                        Subscribe Now →
                    </a>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 1200px) {
          .carousel-button {
            display: none !important;
          }
        }
      `}</style>
        </section>
    );
}
