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
            background: scrolled ? 'rgba(23, 37, 84, 0.95)' : 'rgba(23, 37, 84, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: scrolled ? '1px solid rgba(251, 191, 36, 0.2)' : '1px solid rgba(251, 191, 36, 0.1)',
            transition: 'all 0.3s ease',
            boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0'
                }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <h3 style={{
                            margin: 0,
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: 'var(--color-gold)',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            Dr. Muhammad Salim
                        </h3>
                    </Link>

                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center'
                    }} className="desktop-menu">
                        {[
                            { label: 'Store', href: '/store' },
                            { label: 'About', href: '/about' },
                            { label: 'Books', href: '#books' },
                            { label: 'Articles', href: '#articles' },
                            { label: 'Contact', href: '/contact' },
                            { label: 'Suggestions', href: '/suggestions' }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    transition: 'color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link href="#newsletter" className="btn btn-primary" style={{
                            fontSize: '0.9rem',
                            padding: '0.7rem 1.8rem'
                        }}>
                            Subscribe
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mobile-menu-btn"
                        style={{
                            display: 'none',
                            background: 'var(--color-gold)',
                            border: 'none',
                            color: 'var(--color-text-navy)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            width: '45px',
                            height: '45px',
                            borderRadius: '4px'
                        }}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>

                {isOpen && (
                    <div className="mobile-menu" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        {[
                            { label: 'Store', href: '/store' },
                            { label: 'About', href: '/about' },
                            { label: 'Books', href: '#books' },
                            { label: 'Articles', href: '#articles' },
                            { label: 'Contact', href: '/contact' },
                            { label: 'Suggestions', href: '/suggestions' }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    padding: '0.75rem',
                                    fontWeight: 600
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
          @media (max-width: 768px) {
            .desktop-menu {
              display: none !important;
            }
            .mobile-menu-btn {
              display: flex !important;
              align-items: center;
              justify-content: center;
            }
          }
        `
            }} />
        </nav>
    );
}
