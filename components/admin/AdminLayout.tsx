'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { href: '/admin/books', label: 'Books', icon: '📚' },
        { href: '/admin/articles', label: 'Articles', icon: '✍️' },
        { href: '/admin/comments', label: 'Comments', icon: '💬' },
        { href: '/admin/finance', label: 'Finance', icon: '💰' },
        { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
        { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#f8fafc'
        }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                borderRight: '1px solid #e2e8f0',
                padding: 0,
                position: 'fixed',
                height: '100vh',
                overflowY: 'auto',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
                zIndex: 100
            }}>
                {/* Logo */}
                <Link href="/admin/dashboard" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '2rem',
                    textDecoration: 'none',
                    borderBottom: '1px solid #e2e8f0',
                    background: 'white'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)'
                    }}>
                        📖
                    </div>
                    <div>
                        <div style={{
                            color: '#0f172a',
                            fontWeight: 800,
                            fontSize: '1.2rem',
                            letterSpacing: '-0.5px'
                        }}>
                            Dr. Salim
                        </div>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Admin Portal
                        </div>
                    </div>
                </Link>

                {/* Navigation */}
                <nav style={{ padding: '1.5rem' }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '1rem',
                        paddingLeft: '0.75rem'
                    }}>
                        Main Menu
                    </div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem 1.25rem',
                                    marginBottom: '0.5rem',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    color: isActive ? 'white' : '#64748b',
                                    background: isActive ? 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' : 'transparent',
                                    fontWeight: isActive ? 700 : 600,
                                    fontSize: '0.95rem',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: isActive ? '0 4px 12px rgba(251, 191, 36, 0.3)' : 'none',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = '#f1f5f9';
                                        e.currentTarget.style.color = '#0f172a';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#64748b';
                                    }
                                }}
                            >
                                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                                <span>{item.label}</span>
                                {isActive && (
                                    <div style={{
                                        position: 'absolute',
                                        right: '12px',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                                    }} />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    borderTop: '1px solid #e2e8f0',
                    background: 'white'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        borderRadius: '12px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            boxShadow: '0 2px 8px rgba(251, 191, 36, 0.2)'
                        }}>
                            👤
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                color: '#0f172a',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                marginBottom: '2px'
                            }}>
                                Admin User
                            </div>
                            <button style={{
                                background: 'none',
                                border: 'none',
                                color: '#64748b',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                padding: 0,
                                fontWeight: 600
                            }}>
                                Sign out →
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: '280px',
                flex: 1,
                padding: '2rem',
                background: '#f8fafc',
                minHeight: '100vh'
            }}>
                {/* Top Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    padding: '1.5rem 2rem',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            padding: '0.75rem 1.5rem',
                            background: '#f1f5f9',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            color: '#64748b',
                            fontWeight: 600
                        }}>
                            🔍 Search...
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '1.2rem'
                        }}>
                            🔔
                        </div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '1.2rem'
                        }}>
                            ⚙️
                        </div>
                    </div>
                </div>

                {children}
            </main>
        </div>
    );
}
