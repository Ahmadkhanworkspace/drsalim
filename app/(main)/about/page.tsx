'use client';

export default function AboutPage() {
    return (
        <main style={{ background: 'var(--color-bg-sand)', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                background: 'var(--gradient-navy)',
                padding: '8rem 2rem 6rem',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <span style={{
                        color: 'var(--color-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: '1.5rem'
                    }}>
                        About the Author
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-heading)',
                        textShadow: 'var(--shadow-text)'
                    }}>
                        Dr. Muhammad Salim
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '650px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        A lifetime dedicated to scholarly research, spiritual enlightenment, and sharing profound insights with the world.
                    </p>
                </div>
            </section>

            {/* Biography Section */}
            <section className="section" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr',
                        gap: '4rem',
                        alignItems: 'start'
                    }} className="about-grid">
                        {/* Profile Image Placeholder */}
                        <div style={{
                            width: '100%',
                            aspectRatio: '3/4',
                            background: 'var(--gradient-navy)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '6rem',
                            boxShadow: 'var(--shadow-card)',
                            border: '4px solid var(--color-gold)'
                        }}>
                            👨‍🏫
                        </div>

                        {/* Bio Content */}
                        <div>
                            <h2 style={{
                                color: 'var(--color-text-navy)',
                                marginBottom: '1.5rem',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '2.5rem'
                            }}>
                                Scholar, Author, Teacher
                            </h2>

                            <div style={{ color: 'var(--color-text-body)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Dr. Muhammad Salim has devoted over 40 years to the study and teaching of Islamic theology, philosophy, and spirituality. His work bridges classical Islamic scholarship with contemporary thought, making profound spiritual concepts accessible to modern readers.
                                </p>

                                <p style={{ marginBottom: '1.5rem' }}>
                                    With more than 200 publications and 20 books to his name, Dr. Salim has become a respected voice in Islamic studies. His writings explore the depths of human spirituality, the intersection of faith and reason, and the timeless wisdom found in classical Islamic texts.
                                </p>

                                <p style={{ marginBottom: '1.5rem' }}>
                                    Throughout his career, he has received numerous accolades for his contributions to scholarship and education. His work continues to inspire students, researchers, and seekers of knowledge around the world.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="section" style={{ background: 'var(--color-bg-sand)' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <h2 style={{
                        textAlign: 'center',
                        color: 'var(--color-text-navy)',
                        marginBottom: '3rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2.5rem'
                    }}>
                        Notable Achievements
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { icon: '🎓', title: 'Academic Excellence', desc: 'PhD in Islamic Studies with distinction' },
                            { icon: '📚', title: '20+ Books Published', desc: 'Comprehensive works on theology and philosophy' },
                            { icon: '✍️', title: '200+ Publications', desc: 'Articles in leading academic journals' },
                            { icon: '🏆', title: 'Global Recognition', desc: '20+ international awards and honors' },
                            { icon: '👨‍🏫', title: '40 Years Teaching', desc: 'Mentoring thousands of students worldwide' },
                            { icon: '🌍', title: 'International Impact', desc: 'Works translated into multiple languages' }
                        ].map((item, index) => (
                            <div key={index} className="modern-card" style={{
                                padding: '2rem',
                                textAlign: 'center',
                                background: 'white'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                                <h3 style={{
                                    color: 'var(--color-text-navy)',
                                    fontSize: '1.3rem',
                                    marginBottom: '0.75rem',
                                    fontFamily: 'var(--font-heading)'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-body)', fontSize: '1rem', lineHeight: 1.6 }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
                @media (max-width: 968px) {
                    .about-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </main>
    );
}
