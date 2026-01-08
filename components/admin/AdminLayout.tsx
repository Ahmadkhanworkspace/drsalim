'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [booksExpanded, setBooksExpanded] = useState(true);

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        {
            href: '/admin/books',
            label: 'Books',
            icon: '📚',
            submenu: [
                { href: '/admin/books', label: 'All Books', icon: '📖' },
                { href: '/admin/series', label: 'Series', icon: '📚' },
                { href: '/admin/bundles', label: 'Bundles', icon: '📦' },
                { href: '/admin/isbn', label: 'ISBN Info', icon: '📘' },
                { href: '/admin/covers', label: 'Cover Versions', icon: '🎨' },
            ]
        },
        { href: '/admin/reviews', label: 'Reviews & Ratings', icon: '⭐' },
        { href: '/admin/promotions', label: 'Promotions', icon: '🎯' },
        { href: '/admin/previews', label: 'Preview Chapters', icon: '📄' },
        { href: '/admin/reading-stats', label: 'Reading Stats', icon: '📊' },
        { href: '/admin/awards', label: 'Awards', icon: '🏆' },
        { href: '/admin/articles', label: 'Articles', icon: '✍️' },
        { href: '/admin/comments', label: 'Comments', icon: '💬' },
        { href: '/admin/finance', label: 'Finance', icon: '💰' },
        { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
    ];

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#EAEDED'
        }}>
            {/* Sidebar */}
            <aside style={{
                width: '220px',
                background: '#232F3E',
                position: 'fixed',
                height: '100vh',
                overflowY: 'auto',
                zIndex: 100
            }}>
                {/* Logo */}
                <Link href="/admin/dashboard" style={{
                    display: 'block',
                    padding: '16px 20px',
                    textDecoration: 'none',
                    borderBottom: '1px solid #37475A'
                }}>
                    <div style={{
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        letterSpacing: '-0.3px'
                    }}>
                        Dr. Salim Admin
                    </div>
                    <div style={{
                        color: '#AAB7B8',
                        fontSize: '0.6875rem',
                        marginTop: '2px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Content Management
                    </div>
                </Link>

                {/* Navigation */}
                <nav style={{ padding: '12px 8px' }}>
                    {navItems.map((item: any) => {
                        const isActive = pathname === item.href || (item.submenu && item.submenu.some((sub: any) => pathname === sub.href));
                        const hasSubmenu = item.submenu && item.submenu.length > 0;

                        return (
                            <div key={item.href}>
                                {hasSubmenu ? (
                                    <>
                                        <button
                                            onClick={() => setBooksExpanded(!booksExpanded)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '10px',
                                                padding: '8px 12px',
                                                marginBottom: '2px',
                                                borderRadius: '4px',
                                                background: isActive ? '#37475A' : 'transparent',
                                                border: 'none',
                                                borderLeft: isActive ? '3px solid #FF9900' : '3px solid transparent',
                                                color: isActive ? '#FFFFFF' : '#AAB7B8',
                                                fontSize: '0.875rem',
                                                fontWeight: 400,
                                                cursor: 'pointer',
                                                transition: 'all 0.15s',
                                                textAlign: 'left'
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                                                <span>{item.label}</span>
                                            </span>
                                            <span style={{ fontSize: '0.75rem' }}>
                                                {booksExpanded ? '▼' : '▶'}
                                            </span>
                                        </button>
                                        {booksExpanded && (
                                            <div style={{ paddingLeft: '12px', marginBottom: '4px' }}>
                                                {item.submenu.map((subItem: any) => {
                                                    const isSubActive = pathname === subItem.href;
                                                    return (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px',
                                                                padding: '6px 12px',
                                                                marginBottom: '2px',
                                                                borderRadius: '4px',
                                                                textDecoration: 'none',
                                                                color: isSubActive ? '#FFFFFF' : '#AAB7B8',
                                                                background: isSubActive ? '#37475A' : 'transparent',
                                                                fontWeight: 400,
                                                                fontSize: '0.8125rem',
                                                                transition: 'all 0.15s',
                                                                borderLeft: isSubActive ? '3px solid #FF9900' : '3px solid transparent'
                                                            }}
                                                        >
                                                            <span style={{ fontSize: '0.875rem' }}>{subItem.icon}</span>
                                                            <span>{subItem.label}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '8px 12px',
                                            marginBottom: '2px',
                                            borderRadius: '4px',
                                            textDecoration: 'none',
                                            color: isActive ? '#FFFFFF' : '#AAB7B8',
                                            background: isActive ? '#37475A' : 'transparent',
                                            fontWeight: 400,
                                            fontSize: '0.875rem',
                                            transition: 'all 0.15s',
                                            borderLeft: isActive ? '3px solid #FF9900' : '3px solid transparent'
                                        }}
                                    >
                                        <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* User Info */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px',
                    borderTop: '1px solid #37475A',
                    background: '#232F3E'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px',
                        borderRadius: '4px',
                        background: '#37475A'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#FF9900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            flexShrink: 0
                        }}>
                            👤
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                color: '#FFFFFF',
                                fontWeight: 600,
                                fontSize: '0.8125rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                Admin
                            </div>
                            <button style={{
                                background: 'none',
                                border: 'none',
                                color: '#AAB7B8',
                                fontSize: '0.6875rem',
                                cursor: 'pointer',
                                padding: 0,
                                fontWeight: 400
                            }}>
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: '220px',
                flex: 1,
                background: '#EAEDED',
                minHeight: '100vh'
            }}>
                {/* Top Bar */}
                <div style={{
                    padding: '12px 20px',
                    background: '#232F3E',
                    borderBottom: '1px solid #37475A',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{
                                padding: '6px 12px',
                                background: '#37475A',
                                border: '1px solid #4A5F7F',
                                borderRadius: '4px',
                                fontSize: '0.8125rem',
                                color: '#FFFFFF',
                                width: '250px',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '4px',
                            background: '#37475A',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: '#AAB7B8'
                        }}>
                            🔔
                        </div>
                        <Link href="/" style={{
                            padding: '6px 12px',
                            background: 'transparent',
                            border: '1px solid #D5D9D9',
                            borderRadius: '4px',
                            color: '#FFFFFF',
                            fontSize: '0.8125rem',
                            textDecoration: 'none',
                            fontWeight: 400
                        }}>
                            View Site
                        </Link>
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ padding: '20px' }}>
                    {children}
                </div>
            </main>

            {/* Mobile Styles */}
            <style jsx>{`
                @media (max-width: 768px) {
                    aside {
                        transform: ${isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
                        transition: transform 0.3s;
                    }
                    main {
                        margin-left: 0;
                    }
                }
            `}</style>
        </div>
    );
}
