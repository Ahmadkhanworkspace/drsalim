'use client';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--color-bg-secondary)',
            borderTop: '1px solid rgba(0, 212, 255, 0.2)',
            padding: 'var(--spacing-2xl) 0 var(--spacing-lg)',
            position: 'relative'
        }}>
            {/* Top Accent Line */}
            <div style={{
                height: '3px',
                background: 'var(--gradient-accent)',
                marginBottom: 'var(--spacing-2xl)'
            }} />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'var(--spacing-2xl)',
                    marginBottom: 'var(--spacing-2xl)'
                }}>
                    {/* About */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--gradient-accent)',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.3rem'
                            }}>
                                📚
                            </div>
                            <h3 className="gradient-text" style={{
                                fontSize: '1.4rem',
                                margin: 0,
                                fontWeight: 800
                            }}>
                                Dr. M. Salim
                            </h3>
                        </div>
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.8,
                            fontSize: '1rem'
                        }}>
                            A lifetime dedicated to scholarly research, writing, and sharing profound insights on spirituality, philosophy, and Islamic studies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-md)',
                            fontSize: '1.2rem',
                            fontWeight: 700
                        }}>
                            Quick Links
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {['Books', 'Articles', 'Achievements', 'Newsletter'].map((item) => (
                                <li key={item} style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        style={{
                                            color: 'var(--color-text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'all var(--transition-fast)',
                                            display: 'inline-block',
                                            fontSize: '1rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = 'var(--color-accent)';
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'var(--color-text-secondary)';
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
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-md)',
                            fontSize: '1.2rem',
                            fontWeight: 700
                        }}>
                            Connect
                        </h4>
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-md)',
                            fontSize: '1rem'
                        }}>
                            Stay connected for the latest updates and insights.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            {['📧', '🐦', '📘', '📱'].map((icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="modern-card"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        fontSize: '1.4rem',
                                        padding: '0',
                                        transition: 'all var(--transition-normal)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
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
                    paddingTop: 'var(--spacing-lg)',
                    borderTop: '1px solid rgba(90, 155, 212, 0.2)',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.95rem'
                }}>
                    <p style={{ margin: 0 }}>
                        © {new Date().getFullYear()} Dr. Muhammad Salim. All rights reserved.
                    </p>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem' }}>
                        Designed with ❤️ for knowledge seekers worldwide
                    </p>
                </div>
            </div>
        </footer>
    );
}
