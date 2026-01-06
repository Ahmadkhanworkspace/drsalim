'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitMessage('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);

            setTimeout(() => setSubmitMessage(''), 5000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <main style={{ background: 'var(--color-bg-sand)', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                background: 'var(--gradient-navy)',
                padding: '8rem 2rem 6rem',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <span style={{
                        color: 'var(--color-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: '1.5rem'
                    }}>
                        Get in Touch
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-heading)',
                        textShadow: 'var(--shadow-text)'
                    }}>
                        Contact Us
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '650px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        Have a question or want to connect? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="section" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.5fr',
                        gap: '4rem',
                        alignItems: 'start'
                    }} className="contact-grid">
                        {/* Contact Info */}
                        <div>
                            <h2 style={{
                                color: 'var(--color-text-navy)',
                                marginBottom: '1.5rem',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '2rem'
                            }}>
                                Contact Information
                            </h2>

                            <div style={{ marginBottom: '2rem' }}>
                                {[
                                    { icon: '📧', label: 'Email', value: 'contact@drsalim.com' },
                                    { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567' },
                                    { icon: '📍', label: 'Location', value: 'Academic Center, City' }
                                ].map((item, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        gap: '1rem',
                                        marginBottom: '1.5rem',
                                        padding: '1rem',
                                        background: 'var(--color-bg-sand)',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                                        <div>
                                            <div style={{
                                                color: 'var(--color-text-muted)',
                                                fontSize: '0.85rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {item.label}
                                            </div>
                                            <div style={{
                                                color: 'var(--color-text-navy)',
                                                fontWeight: 600,
                                                fontSize: '1rem'
                                            }}>
                                                {item.value}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                padding: '1.5rem',
                                background: 'var(--gradient-gold)',
                                borderRadius: '12px',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
                                <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Office Hours</div>
                                <div style={{ fontSize: '0.9rem', color: '#1c1917' }}>
                                    Monday - Friday<br />
                                    9:00 AM - 5:00 PM
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <form onSubmit={handleSubmit} style={{
                                background: 'var(--color-bg-sand)',
                                padding: '2.5rem',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow-card)'
                            }}>
                                <h3 style={{
                                    color: 'var(--color-text-navy)',
                                    marginBottom: '2rem',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.8rem'
                                }}>
                                    Send us a Message
                                </h3>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        color: 'var(--color-text-navy)',
                                        fontWeight: 600,
                                        marginBottom: '0.5rem',
                                        fontSize: '0.95rem'
                                    }}>
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            border: '2px solid rgba(15, 23, 42, 0.1)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(15, 23, 42, 0.1)'}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        color: 'var(--color-text-navy)',
                                        fontWeight: 600,
                                        marginBottom: '0.5rem',
                                        fontSize: '0.95rem'
                                    }}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            border: '2px solid rgba(15, 23, 42, 0.1)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(15, 23, 42, 0.1)'}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        color: 'var(--color-text-navy)',
                                        fontWeight: 600,
                                        marginBottom: '0.5rem',
                                        fontSize: '0.95rem'
                                    }}>
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            border: '2px solid rgba(15, 23, 42, 0.1)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(15, 23, 42, 0.1)'}
                                    />
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{
                                        display: 'block',
                                        color: 'var(--color-text-navy)',
                                        fontWeight: 600,
                                        marginBottom: '0.5rem',
                                        fontSize: '0.95rem'
                                    }}>
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            border: '2px solid rgba(15, 23, 42, 0.1)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(15, 23, 42, 0.1)'}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem',
                                        fontSize: '1rem',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {submitMessage && (
                                    <div style={{
                                        marginTop: '1.5rem',
                                        padding: '1rem',
                                        background: 'rgba(251, 191, 36, 0.2)',
                                        borderRadius: '8px',
                                        color: 'var(--color-text-navy)',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        border: '1px solid var(--color-gold)'
                                    }}>
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @media (max-width: 968px) {
                    .contact-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </main>
    );
}
