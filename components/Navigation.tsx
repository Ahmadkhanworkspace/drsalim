'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: scrolled
                ? 'rgba(26, 35, 50, 0.95)'
                : 'rgba(26, 35, 50, 0.7)',
            backdropFilter: 'blur(20px)',
            borderBottom: scrolled
                ? '1px solid rgba(0, 212, 255, 0.3)'
                : '1px solid rgba(90, 155, 212, 0.1)',
            transition: 'all var(--transition-normal)',
            boxShadow: scrolled ? 'var(--shadow-md)' : 'none'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--spacing-md) 0',
                    transition: 'padding var(--transition-normal)'
                }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)'
                        }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                background: 'var(--gradient-accent)',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                boxShadow: 'var(--shadow-glow)',
                                transition: 'transform var(--transition-normal)'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(5deg) scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}>
                                📚
                            </div>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.3rem',
                                    fontWeight: 800,
                                    background: 'var(--gradient-accent)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    Dr. M. Salim
                                </h3>
                                <p style={{
                                    margin: 0,
                                    fontSize: '0.7rem',
                                    color: 'var(--color-text-muted)',
                                    fontWeight: 500,
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase'
                                }}>
                                    Scholar & Author
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-xl)',
                        alignItems: 'center'
                    }} className="desktop-menu">
                        {['Books', 'Articles', 'Achievements'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    position: 'relative',
                                    transition: 'color var(--transition-fast)',
                                    padding: '0.5rem 0'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--color-accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                }}
                            >
                                {item}
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '0%',
                                    height: '2px',
                                    background: 'var(--gradient-accent)',
                                    transition: 'width var(--transition-normal)'
                                }} className="nav-underline" />
                            </Link>
                        ))}

                        <Link
                            href="#newsletter"
                            className="btn btn-primary"
                            style={{
                                fontSize: '0.95rem',
                                padding: '0.7rem 1.8rem'
                            }}
                        >
                            Subscribe
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mobile-menu-btn"
                        style={{
                            display: 'none',
                            background: 'var(--gradient-accent)',
                            border: 'none',
                            color: 'var(--color-navy)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            width: '45px',
                            height: '45px',
                            borderRadius: 'var(--radius-sm)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'var(--shadow-md)',
                            transition: 'transform var(--transition-normal)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mobile-menu" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-lg)',
                        background: 'rgba(30, 41, 54, 0.95)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: 'var(--spacing-md)',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        animation: 'fadeInUp 0.3s ease-out'
                    }}>
                        {['Books', 'About', 'Articles', 'Testimonials', 'Achievements', 'Newsletter'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    padding: 'var(--spacing-sm)',
                                    borderRadius: 'var(--radius-sm)',
                                    transition: 'all var(--transition-fast)',
                                    fontWeight: 600
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                                    e.currentTarget.style.color = 'var(--color-accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                }}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
          .desktop-menu a:hover .nav-underline {
            width: 100%;
          }
          
          @media (max-width: 768px) {
            .desktop-menu {
              display: none !important;
            }
            .mobile-menu-btn {
              display: flex !important;
            }
          }
        `
            }} />
        </nav>
    );
}
