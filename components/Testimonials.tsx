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
            background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.5) 0%, rgba(219, 234, 254, 0.3) 100%)',
            position: 'relative'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        color: 'var(--color-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        Testimonials
                    </span>
                    <h2 style={{
                        color: 'var(--color-text-navy)',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)'
                    }}>
                        What Readers Are Saying
                    </h2>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontSize: '1.1rem'
                    }}>
                        {testimonials.length} reviews from satisfied readers worldwide
                    </p>
                </div>

                {/* Slider Container */}
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                    {/* Main Card - Properly grouped testimonial */}
                    <div style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '3rem 2.5rem',
                        boxShadow: 'var(--shadow-card)',
                        minHeight: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        {/* Gold Quotation Icon */}
                        <div style={{
                            color: 'var(--color-gold)',
                            fontSize: '4rem',
                            marginBottom: '1.5rem',
                            opacity: 0.5,
                            lineHeight: 1
                        }}>"</div>

                        {/* Quote */}
                        <p style={{
                            color: 'var(--color-text-body)',
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                            lineHeight: 1.7,
                            marginBottom: '2rem',
                            fontStyle: 'italic'
                        }}>
                            {currentTestimonial.content}
                        </p>

                        {/* Author Info - Grouped together */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid rgba(201, 164, 76, 0.2)'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'var(--gradient-navy)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.8rem',
                                border: '2px solid var(--color-gold)',
                                flexShrink: 0
                            }}>
                                👤
                            </div>

                            <div>
                                <h4 style={{
                                    color: 'var(--color-text-navy)',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    fontSize: '1.2rem',
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
                                    color: 'var(--color-gold)',
                                    fontSize: '0.9rem',
                                    fontWeight: 600
                                }}>
                                    {currentTestimonial.date}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-60px',
                            transform: 'translateY(-50%)',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'white',
                            boxShadow: 'var(--shadow-card)',
                            border: '1px solid rgba(15, 23, 42, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--color-text-navy)',
                            fontSize: '1.5rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--color-gold)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-navy)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
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
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'white',
                            boxShadow: 'var(--shadow-card)',
                            border: '1px solid rgba(15, 23, 42, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--color-text-navy)',
                            fontSize: '1.5rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--color-gold)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-navy)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                        }}
                    >
                        →
                    </button>

                    {/* Indicators */}
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        justifyContent: 'center',
                        marginTop: '2.5rem'
                    }}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    height: '8px',
                                    borderRadius: '4px',
                                    width: currentIndex === index ? '48px' : '8px',
                                    background: currentIndex === index ? 'var(--color-gold)' : 'rgba(100, 116, 139, 0.2)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
