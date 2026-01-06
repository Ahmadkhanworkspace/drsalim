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
            background: 'var(--color-bg-navy)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <span style={{
                        color: 'var(--color-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        Newsletter
                    </span>

                    <h2 style={{
                        color: 'white',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)'
                    }}>
                        Stay Informed with the Latest Insights
                    </h2>

                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '1.1rem',
                        marginBottom: '3rem',
                        lineHeight: 1.7
                    }}>
                        Subscribe now to receive updates on Dr. Muhammad Salim's latest articles, reflections, and publications directly to your inbox!
                    </p>

                    {/* Form - Properly grouped input and button */}
                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
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
                                flex: '1 1 300px',
                                minWidth: '250px',
                                padding: '1rem 1.5rem',
                                borderRadius: '8px',
                                background: 'white',
                                color: 'var(--color-text-navy)',
                                fontSize: '1rem',
                                border: 'none',
                                outline: 'none'
                            }}
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                padding: '1rem 2.5rem',
                                background: 'var(--color-gold)',
                                color: 'var(--color-text-navy)',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontSize: '0.9rem',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                boxShadow: '0 4px 20px rgba(201, 164, 76, 0.3)',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.currentTarget.style.background = '#fcd34d';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 164, 76, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--color-gold)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201, 164, 76, 0.3)';
                            }}
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                        </button>
                    </form>

                    {message && (
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1rem 1.5rem',
                            background: 'rgba(251, 191, 36, 0.2)',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 600,
                            border: '1px solid rgba(251, 191, 36, 0.4)'
                        }}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
