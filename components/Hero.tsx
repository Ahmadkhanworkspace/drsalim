'use client';

import { useState, useEffect } from 'react';

const slides = [
    {
        title: "Wisdom for the Modern Soul",
        subtitle: "Dr. Muhammad Salim",
        description: "Exploring the intersection of Islamic spirituality, classic philosophy, and contemporary thought.",
        label: "Featured Author"
    },
    {
        title: "A Legacy of Scholarship",
        subtitle: "40+ Years of Excellence",
        description: "Discover a lifetime of research, teaching, and profound literary contributions.",
        label: "Academic Excellence"
    },
    {
        title: "The Path to Enlightenment",
        subtitle: "New Publications",
        description: "Begin your journey of discovery with the latest published works and articles.",
        label: "Latest Works"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section style={{
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--gradient-navy)',
            position: 'relative',
            overflow: 'hidden',
            color: 'white',
            paddingTop: '80px'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '4rem',
                    alignItems: 'center'
                }} className="hero-layout">

                    {/* Left Column */}
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                style={{
                                    display: currentSlide === index ? 'block' : 'none'
                                }}
                            >
                                {/* Gold Label */}
                                <div style={{
                                    fontFamily: 'var(--font-body)',
                                    color: 'var(--color-gold)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <span style={{ width: '40px', height: '2px', background: 'var(--color-gold)' }}></span>
                                    {slide.label}
                                </div>

                                {/* Main Title */}
                                <h1 style={{
                                    color: 'white',
                                    marginBottom: '1.5rem',
                                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                                    lineHeight: '1.1',
                                    textShadow: 'var(--shadow-text)',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700
                                }}>
                                    {slide.title}
                                </h1>

                                {/* Subtitle */}
                                <div style={{
                                    fontSize: '1.8rem',
                                    color: 'var(--color-gold)',
                                    marginBottom: '2rem',
                                    fontFamily: 'var(--font-heading)',
                                    fontStyle: 'italic',
                                    fontWeight: 400
                                }}>
                                    {slide.subtitle}
                                </div>

                                <p style={{
                                    fontSize: '1.2rem',
                                    color: 'rgba(255,255,255,0.8)',
                                    marginBottom: '3rem',
                                    maxWidth: '550px',
                                    lineHeight: 1.8
                                }}>
                                    {slide.description}
                                </p>

                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <a href="#books" className="btn btn-primary">
                                        View Books
                                    </a>
                                    <a href="#articles" className="btn btn-outline">
                                        Read Articles
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Visual */}
                    <div style={{
                        position: 'relative',
                        height: '500px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} className="hero-visual">
                        <div style={{
                            width: '350px',
                            height: '500px',
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            position: 'relative',
                            transform: 'rotateY(-10deg) rotateX(5deg)',
                            transformStyle: 'preserve-3d'
                        }}>
                            <div style={{
                                textAlign: 'center',
                                color: 'var(--color-gold)',
                                fontSize: '5rem'
                            }}>
                                📖
                            </div>
                            <div style={{
                                position: 'absolute',
                                left: 0, top: 0, bottom: 0,
                                width: '20px',
                                background: 'var(--color-gold)'
                            }} />
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '1rem'
                }}>
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: currentSlide === idx ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 968px) {
                    .hero-layout {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                    }
                    .hero-visual { display: none !important; }
                    h1 { font-size: 3rem !important; }
                }
            `}</style>
        </section>
    );
}
