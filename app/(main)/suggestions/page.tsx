'use client';

import { useState } from 'react';

export default function SuggestionsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'general',
        suggestion: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitMessage('Thank you for your valuable suggestion! We appreciate your feedback.');
            setFormData({ name: '', email: '', category: 'general', suggestion: '' });
            setIsSubmitting(false);

            setTimeout(() => setSubmitMessage(''), 5000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                        We Value Your Input
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-heading)',
                        textShadow: 'var(--shadow-text)'
                    }}>
                        Suggestion Box
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '650px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        Your feedback helps us improve. Share your ideas, suggestions, or recommendations with us.
                    </p>
                </div>
            </section>

            {/* Suggestion Form Section */}
            <section className="section" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
                    {/* Info Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {[
                            { icon: '💡', title: 'Ideas', desc: 'Share your creative ideas' },
                            { icon: '📝', title: 'Feedback', desc: 'Tell us what you think' },
                            { icon: '🎯', title: 'Improvements', desc: 'Suggest enhancements' }
                        ].map((item, index) => (
                            <div key={index} style={{
                                padding: '1.5rem',
                                background: 'var(--color-bg-sand)',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: '2px solid rgba(251, 191, 36, 0.2)'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                                <h3 style={{
                                    color: 'var(--color-text-navy)',
                                    fontSize: '1.2rem',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'var(--font-heading)'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-body)', fontSize: '0.95rem' }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{
                        background: 'var(--color-bg-sand)',
                        padding: '3rem',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-card)'
                    }}>
                        <h2 style={{
                            color: 'var(--color-text-navy)',
                            marginBottom: '2rem',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2rem',
                            textAlign: 'center'
                        }}>
                            Submit Your Suggestion
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.5rem',
                            marginBottom: '1.5rem'
                        }} className="form-row">
                            <div>
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

                            <div>
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
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                color: 'var(--color-text-navy)',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                                fontSize: '0.95rem'
                            }}>
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: '2px solid rgba(15, 23, 42, 0.1)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    background: 'white',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(15, 23, 42, 0.1)'}
                            >
                                <option value="general">General Feedback</option>
                                <option value="website">Website Improvement</option>
                                <option value="content">Content Suggestion</option>
                                <option value="feature">Feature Request</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                color: 'var(--color-text-navy)',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                                fontSize: '0.95rem'
                            }}>
                                Your Suggestion *
                            </label>
                            <textarea
                                name="suggestion"
                                value={formData.suggestion}
                                onChange={handleChange}
                                required
                                rows={8}
                                placeholder="Please share your thoughts, ideas, or suggestions in detail..."
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
                            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
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
                                border: '1px solid var(--color-gold)',
                                textAlign: 'center'
                            }}>
                                {submitMessage}
                            </div>
                        )}
                    </form>
                </div>
            </section>

            <style jsx>{`
                @media (max-width: 640px) {
                    .form-row {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
}
