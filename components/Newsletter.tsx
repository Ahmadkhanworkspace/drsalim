'use client';

import { useState } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setMessage('Thank you for subscribing! 🎉');
            setEmail('');
            setIsSubmitting(false);

            setTimeout(() => setMessage(''), 3000);
        }, 1000);
    };

    return (
        <section id="newsletter" className="section" style={{
            background: 'var(--gradient-hero)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite'
            }} />

            <div style={{
                position: 'absolute',
                bottom: '-100px',
                left: '-100px',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(168, 216, 240, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 10s ease-in-out infinite',
                animationDelay: '2s'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        marginBottom: 'var(--spacing-md)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        Newsletter
                    </div>

                    <h2 style={{
                        color: 'white',
                        marginBottom: 'var(--spacing-md)',
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 900
                    }}>
                        Stay Informed with the Latest Insights
                    </h2>

                    <p style={{
                        color: 'var(--color-light-blue)',
                        fontSize: '1.2rem',
                        marginBottom: 'var(--spacing-2xl)',
                        lineHeight: 1.8
                    }}>
                        Subscribe now to receive updates on Dr. Muhammad Salim&apos;s latest articles, reflections, and publications directly to your inbox!
                    </p>

                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        maxWidth: '650px',
                        margin: '0 auto',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            style={{
                                flex: 1,
                                minWidth: '280px',
                                padding: 'var(--spacing-md) var(--spacing-lg)',
                                borderRadius: 'var(--radius-md)',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                fontSize: '1.05rem',
                                outline: 'none',
                                transition: 'all var(--transition-normal)',
                                backdropFilter: 'blur(10px)'
                            }}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                e.target.style.borderColor = 'var(--color-accent)';
                                e.target.style.boxShadow = 'var(--shadow-glow)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                            style={{
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                minWidth: '180px'
                            }}
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                        </button>
                    </form>

                    {message && (
                        <div style={{
                            marginTop: 'var(--spacing-lg)',
                            padding: 'var(--spacing-md) var(--spacing-lg)',
                            background: 'rgba(0, 212, 255, 0.2)',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            animation: 'fadeIn 0.3s ease-out',
                            border: '1px solid rgba(0, 212, 255, 0.4)'
                        }}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
