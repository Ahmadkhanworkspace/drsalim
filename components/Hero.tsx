'use client';

import { useState, useEffect } from 'react';

const slides = [
    {
        title: "Welcome to Our Website",
        subtitle: "Join Thousands on a Journey of Knowledge",
        description: "Delve into the knowledge and insights of Dr. Muhammad Salim",
        highlight: "40+ Years of Scholarly Excellence"
    },
    {
        title: "Scholarly Excellence",
        subtitle: "40+ Years of Research & Writing",
        description: "Discover profound insights on spirituality, philosophy, and Islamic studies",
        highlight: "200+ Publications"
    },
    {
        title: "Published Works",
        subtitle: "20+ Books on Amazon",
        description: "Begin your journey of discovery with Dr. Muhammad Salim's published works",
        highlight: "20+ Awards"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section style={{
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--gradient-hero)', // Light Pale Blue
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '80px'
        }}>
            {/* Animated Grid Background - Minimal/Subtle */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
          linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)
        `,
                backgroundSize: '50px 50px',
                opacity: 0.6
            }} />

            {/* Floating Orbs - Soft Blue */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite',
                filter: 'blur(40px)'
            }} />

            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 12s ease-in-out infinite',
                animationDelay: '1s',
                filter: 'blur(60px)'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.3fr 1fr',
                    gap: 'var(--spacing-2xl)',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }} className="hero-grid">
                    {/* Left Side - Content */}
                    <div>
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                style={{
                                    display: currentSlide === index ? 'block' : 'none',
                                    animation: currentSlide === index ? 'fadeInUp 0.8s ease-out' : 'none'
                                }}
                            >
                                {/* Badge */}
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1.2rem',
                                    background: 'rgba(37, 99, 235, 0.1)',
                                    border: '1px solid var(--color-primary)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--color-primary)',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    marginBottom: 'var(--spacing-md)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    boxShadow: '0 0 15px rgba(37, 99, 235, 0.1)'
                                }}>
                                    {slide.highlight}
                                </div>

                                <h1 style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    marginBottom: 'var(--spacing-sm)',
                                    color: 'var(--color-navy)',
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                    letterSpacing: '-1px'
                                }}>
                                    {slide.title}
                                </h1>

                                <h2 style={{
                                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                    marginBottom: 'var(--spacing-md)',
                                    fontWeight: 700,
                                    color: 'var(--color-primary)'
                                }}>
                                    {slide.subtitle}
                                </h2>

                                <p style={{
                                    fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                                    marginBottom: 'var(--spacing-xl)',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.7,
                                    maxWidth: '550px'
                                }}>
                                    {slide.description}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-md)',
                                    flexWrap: 'wrap'
                                }}>
                                    <a href="#books" className="btn btn-primary">
                                        <span>Explore Books</span>
                                        <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}>→</span>
                                    </a>

                                    <a href="#articles" className="btn btn-outline">
                                        <span>Read Articles</span>
                                    </a>
                                </div>
                            </div>
                        ))}

                        {/* Slider Indicators */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-sm)',
                            marginTop: 'var(--spacing-xl)'
                        }}>
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    style={{
                                        width: currentSlide === index ? '40px' : '12px',
                                        height: '12px',
                                        borderRadius: '6px',
                                        background: currentSlide === index
                                            ? 'var(--color-primary)'
                                            : 'rgba(37, 99, 235, 0.2)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-normal)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Stats Grid (Clean White Cards) */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'var(--spacing-md)'
                    }}>
                        {[
                            { num: '40+', label: 'Years', icon: '📅' },
                            { num: '20+', label: 'Books', icon: '📖' },
                            { num: '200+', label: 'Articles', icon: '✍️' },
                            { num: '20+', label: 'Awards', icon: '🏆' }
                        ].map((stat, idx) => (
                            <div key={idx} className="modern-card" style={{
                                textAlign: 'center',
                                padding: 'var(--spacing-lg)',
                                background: 'white',
                                boxShadow: 'var(--shadow-lg)'
                            }}>
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    {stat.icon}
                                </div>
                                <div style={{
                                    fontSize: '2.2rem',
                                    fontWeight: 900,
                                    color: 'var(--color-primary)',
                                    marginBottom: '0.25rem'
                                }}>
                                    {stat.num}
                                </div>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--color-text-secondary)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 968px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-lg) !important;
          }
        }
      `}</style>
        </section>
    );
}
