'use client';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--color-bg-navy)',
            borderTop: '1px solid rgba(251, 191, 36, 0.2)',
            padding: '3rem 0 1.5rem',
            position: 'relative'
        }}>
            {/* Top Accent Line */}
            <div style={{
                height: '2px',
                background: 'var(--color-gold)',
                marginBottom: '2rem'
            }} />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    {/* About */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: '35px',
                                height: '35px',
                                background: 'var(--color-gold)',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem'
                            }}>
                                📚
                            </div>
                            <h3 style={{
                                fontSize: '1.3rem',
                                margin: 0,
                                fontWeight: 700,
                                color: 'var(--color-gold)',
                                fontFamily: 'var(--font-heading)'
                            }}>
                                Dr. M. Salim
                            </h3>
                        </div>
                        <p style={{
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: 1.6,
                            fontSize: '0.95rem',
                            margin: 0
                        }}>
                            A lifetime dedicated to scholarly research, writing, and sharing profound insights on spirituality, philosophy, and Islamic studies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            color: 'white',
                            marginBottom: '1rem',
                            fontSize: '1.1rem',
                            fontWeight: 700
                        }}>
                            Quick Links
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Books', 'Articles', 'Achievements', 'Newsletter'].map((item) => (
                                <li key={item} style={{ marginBottom: '0.5rem' }}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-block',
                                            fontSize: '0.95rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = 'var(--color-gold)';
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        → {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 style={{
                            color: 'white',
                            marginBottom: '1rem',
                            fontSize: '1.1rem',
                            fontWeight: 700
                        }}>
                            Connect
                        </h4>
                        <p style={{
                            color: 'rgba(255,255,255,0.7)',
                            marginBottom: '1rem',
                            fontSize: '0.95rem'
                        }}>
                            Stay connected for the latest updates.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['📧', '🐦', '📘', '📱'].map((icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        fontSize: '1.2rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--color-gold)';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    textAlign: 'center',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.9rem'
                }}>
                    <p style={{ margin: 0 }}>
                        © {new Date().getFullYear()} Dr. Muhammad Salim. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
