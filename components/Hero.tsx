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
            background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #2d5f8d 100%)',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '80px'
        }}>
            {/* Animated Grid Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
          linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
        `,
                backgroundSize: '50px 50px',
                opacity: 0.5
            }} />

            {/* Floating Orbs */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '10%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite',
                filter: 'blur(40px)'
            }} />

            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '15%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(90, 155, 212, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 10s ease-in-out infinite',
                animationDelay: '2s',
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
                                    background: 'rgba(0, 212, 255, 0.15)',
                                    border: '2px solid var(--color-accent)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--color-accent)',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    marginBottom: 'var(--spacing-md)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)'
                                }}>
                                    {slide.highlight}
                                </div>

                                <h1 style={{
                                    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                                    marginBottom: 'var(--spacing-sm)',
                                    color: 'white',
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                                }}>
                                    {slide.title}
                                </h1>

                                <h2 style={{
                                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                    marginBottom: 'var(--spacing-md)',
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #00d4ff 0%, #5a9bd4 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    {slide.subtitle}
                                </h2>

                                <p style={{
                                    fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                                    marginBottom: 'var(--spacing-xl)',
                                    color: 'var(--color-light-blue)',
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
                                    <a href="#books" style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-sm)',
                                        padding: '0.9rem 2rem',
                                        background: 'var(--color-accent)',
                                        color: 'var(--color-navy)',
                                        textDecoration: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 800,
                                        fontSize: '1rem',
                                        transition: 'all var(--transition-normal)',
                                        boxShadow: '0 6px 20px rgba(0, 212, 255, 0.4)',
                                        border: 'none'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.6)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.4)';
                                        }}>
                                        <span>Explore Books</span>
                                        <span style={{ fontSize: '1.2rem' }}>→</span>
                                    </a>

                                    <a href="#articles" style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-sm)',
                                        padding: '0.9rem 2rem',
                                        background: 'transparent',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        transition: 'all var(--transition-normal)',
                                        border: '2px solid var(--color-accent)'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}>
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
                                            ? 'var(--color-accent)'
                                            : 'rgba(255, 255, 255, 0.3)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-normal)',
                                        boxShadow: currentSlide === index ? '0 0 15px rgba(0, 212, 255, 0.6)' : 'none'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Stats Grid (NO ICON) */}
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
                                background: 'rgba(26, 35, 50, 0.6)',
                                backdropFilter: 'blur(10px)'
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
                                    background: 'linear-gradient(135deg, #00d4ff 0%, #5a9bd4 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
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

            {/* Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: 'var(--spacing-lg)',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'float 2s ease-in-out infinite',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <span style={{
                    color: 'var(--color-accent)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    Scroll Down
                </span>
                <div style={{
                    width: '24px',
                    height: '40px',
                    border: '2px solid var(--color-accent)',
                    borderRadius: '15px',
                    position: 'relative',
                    boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)'
                }}>
                    <div style={{
                        width: '4px',
                        height: '8px',
                        background: 'var(--color-accent)',
                        borderRadius: '2px',
                        position: 'absolute',
                        top: '6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        animation: 'float 1.5s ease-in-out infinite'
                    }} />
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
