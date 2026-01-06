'use client';

export default function AboutUs() {
    return (
        <section id="about" className="section" style={{
            background: 'var(--color-bg-secondary)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decoration */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
                borderRadius: '50%'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--spacing-3xl)',
                    alignItems: 'center'
                }} className="about-grid">
                    {/* Left Side - Image/Visual */}
                    <div style={{
                        position: 'relative'
                    }}>
                        <div className="modern-card" style={{
                            padding: 0,
                            overflow: 'hidden',
                            height: '500px',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Profile Icon */}
                            <div style={{
                                fontSize: '12rem',
                                filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5))'
                            }}>
                                👤
                            </div>

                            {/* Decorative Elements */}
                            <div style={{
                                position: 'absolute',
                                top: '10%',
                                left: '10%',
                                width: '150px',
                                height: '150px',
                                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                                borderRadius: '50%',
                                animation: 'float 6s ease-in-out infinite'
                            }} />

                            <div style={{
                                position: 'absolute',
                                bottom: '15%',
                                right: '15%',
                                width: '200px',
                                height: '200px',
                                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
                                borderRadius: '50%',
                                animation: 'float 8s ease-in-out infinite',
                                animationDelay: '2s'
                            }} />
                        </div>

                        {/* Stats Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-30px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            width: '90%'
                        }}>
                            {[
                                { number: '40+', label: 'Years' },
                                { number: '20+', label: 'Books' },
                                { number: '200+', label: 'Articles' }
                            ].map((stat, index) => (
                                <div key={index} className="modern-card" style={{
                                    flex: 1,
                                    padding: 'var(--spacing-md)',
                                    textAlign: 'center',
                                    background: 'var(--color-bg-card)',
                                    border: '2px solid var(--color-accent)'
                                }}>
                                    <div className="gradient-text" style={{
                                        fontSize: '1.8rem',
                                        fontWeight: 900,
                                        marginBottom: '0.25rem'
                                    }}>
                                        {stat.number}
                                    </div>
                                    <div style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--color-text-muted)',
                                        fontWeight: 600
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            background: 'rgba(0, 212, 255, 0.1)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--color-accent)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            marginBottom: 'var(--spacing-md)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            border: '1px solid rgba(0, 212, 255, 0.3)'
                        }}>
                            About Dr. Muhammad Salim
                        </div>

                        <h2 style={{
                            marginBottom: 'var(--spacing-lg)',
                            background: 'var(--gradient-accent)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: 'clamp(2rem, 4vw, 3rem)'
                        }}>
                            A Lifetime Dedicated to Knowledge & Wisdom
                        </h2>

                        <div style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '1.1rem',
                            lineHeight: 1.9,
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            <p style={{ marginBottom: 'var(--spacing-md)' }}>
                                Dr. Muhammad Salim is a distinguished scholar, author, and researcher with over <strong style={{ color: 'var(--color-accent)' }}>40 years of experience</strong> in Islamic studies, philosophy, and spirituality. His profound insights and scholarly approach have touched the lives of thousands of readers worldwide.
                            </p>

                            <p style={{ marginBottom: 'var(--spacing-md)' }}>
                                With <strong style={{ color: 'var(--color-accent)' }}>20+ published books</strong> and <strong style={{ color: 'var(--color-accent)' }}>200+ research articles</strong>, Dr. Salim has established himself as a leading voice in contemporary Islamic scholarship. His work bridges classical wisdom with modern understanding, making complex spiritual concepts accessible to all seekers of knowledge.
                            </p>

                            <p>
                                His areas of expertise include Divine Providence, spiritual psychology, Islamic philosophy, and the journey of the human soul. Through his writings, Dr. Salim continues to inspire and guide readers on their path to spiritual enlightenment and deeper understanding.
                            </p>
                        </div>

                        {/* Key Highlights */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 'var(--spacing-md)',
                            marginTop: 'var(--spacing-xl)'
                        }}>
                            {[
                                { icon: '🎓', text: 'Ph.D. in Islamic Studies' },
                                { icon: '📚', text: '20+ Books Published' },
                                { icon: '✍️', text: '200+ Research Articles' },
                                { icon: '🏆', text: '20+ Academic Awards' }
                            ].map((item, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    padding: 'var(--spacing-sm)',
                                    background: 'rgba(0, 212, 255, 0.05)',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid rgba(0, 212, 255, 0.1)'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                    <span style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.95rem',
                                        fontWeight: 600
                                    }}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-2xl) !important;
          }
        }
      `}</style>
        </section>
    );
}
