'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import('@/components/admin/Globe3D'), { ssr: false });

// Shared analytics data - matching analytics page
const ANALYTICS_DATA = {
    totalRevenue: 942,  // Total earnings from books
    totalSales: 86,  // 47 + 21 + 5 + 13 = 86
    publishedBooks: 5,
    publishedArticles: 10,
    pendingComments: 23
};

export default function DashboardPage() {
    const [realtimeUsers, setRealtimeUsers] = useState(0);
    const [pulseAnimation, setPulseAnimation] = useState(false);

    // Initialize and update real-time users
    useEffect(() => {
        const getRandomUsers = () => Math.floor(Math.random() * (432 - 119 + 1)) + 119;
        setRealtimeUsers(getRandomUsers());

        // Update every 5 minutes
        const interval = setInterval(() => {
            setPulseAnimation(true);
            setTimeout(() => {
                setRealtimeUsers(getRandomUsers());
                setPulseAnimation(false);
            }, 500);
        }, 300000);

        // Small fluctuations every 3 seconds
        const fluctuation = setInterval(() => {
            setRealtimeUsers(prev => {
                const change = Math.floor(Math.random() * 5) - 2;
                const newValue = prev + change;
                return Math.max(119, Math.min(432, newValue));
            });
        }, 3000);

        return () => {
            clearInterval(interval);
            clearInterval(fluctuation);
        };
    }, []);

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.5px'
                }}>
                    Dashboard Overview
                </h1>
                <p style={{
                    color: '#64748b',
                    fontSize: '1rem',
                    fontWeight: 500
                }}>
                    Welcome back! Here's what's happening with your content today.
                </p>
            </div>

            {/* Real-time Users with 3D Globe */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                padding: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-2xl)',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--spacing-2xl)',
                    alignItems: 'center'
                }}>
                    {/* 3D Globe */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '300px'
                    }}>
                        <Globe3D realtimeUsers={realtimeUsers} />
                    </div>

                    {/* Real-time Stats */}
                    <div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            padding: '0.5rem 1rem',
                            background: '#dcfce7',
                            borderRadius: '8px',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#10b981',
                                animation: 'pulse 2s ease-in-out infinite'
                            }} />
                            <span style={{
                                color: '#166534',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Live Now
                            </span>
                        </div>

                        <h2 style={{
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            marginBottom: 'var(--spacing-sm)',
                            letterSpacing: '-0.3px'
                        }}>
                            Real-time Visitors
                        </h2>

                        <div style={{
                            fontSize: '4rem',
                            fontWeight: 900,
                            color: '#3b82f6',
                            letterSpacing: '-2px',
                            marginBottom: 'var(--spacing-md)',
                            transform: pulseAnimation ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.3s ease'
                        }}>
                            {realtimeUsers}
                        </div>

                        <p style={{
                            color: '#64748b',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            fontWeight: 500,
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            Active users browsing your content right now from around the world
                        </p>

                        <div style={{
                            padding: 'var(--spacing-md)',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#64748b',
                                marginBottom: '0.25rem',
                                fontWeight: 600
                            }}>
                                Updates every 5 minutes
                            </div>
                            <div style={{
                                fontSize: '0.85rem',
                                color: '#10b981',
                                fontWeight: 600
                            }}>
                                ↗ +{Math.floor(Math.random() * 20 + 5)}% from last hour
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.5); }
          }
        `}</style>
            </div>

            {/* Stats Grid - Matching Analytics Design */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                {/* Total Revenue */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: 600
                        }}>
                            Total Revenue
                        </div>
                        <div style={{ fontSize: '1.5rem' }}>💰</div>
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        ${ANALYTICS_DATA.totalRevenue.toLocaleString()}
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        ↗ +12.5%
                    </div>
                </div>

                {/* Total Sales */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: 600
                        }}>
                            Total Sales
                        </div>
                        <div style={{ fontSize: '1.5rem' }}>📊</div>
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {ANALYTICS_DATA.totalSales}
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        ↗ +8.2%
                    </div>
                </div>

                {/* Published Books */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: 600
                        }}>
                            Published<br />Books
                        </div>
                        <div style={{ fontSize: '1.5rem' }}>📚</div>
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a'
                    }}>
                        {ANALYTICS_DATA.publishedBooks}
                    </div>
                </div>

                {/* Published Articles */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: 600
                        }}>
                            Published<br />Articles
                        </div>
                        <div style={{ fontSize: '1.5rem' }}>✍️</div>
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a'
                    }}>
                        {ANALYTICS_DATA.publishedArticles}
                    </div>
                </div>

                {/* Pending Comments */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: 600
                        }}>
                            Pending<br />Comments
                        </div>
                        <div style={{ fontSize: '1.5rem' }}>💬</div>
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {ANALYTICS_DATA.pendingComments}
                    </div>
                    <div style={{
                        color: '#ef4444',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        Needs review
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.3px'
                }}>
                    Quick Actions
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 'var(--spacing-md)'
                }}>
                    {[
                        { label: 'Add New Book', icon: '📚', href: '/admin/books/new', color: '#8b5cf6' },
                        { label: 'Write Article', icon: '✍️', href: '/admin/articles/new', color: '#f59e0b' },
                        { label: 'Review Comments', icon: '💬', href: '/admin/comments', color: '#ef4444' },
                        { label: 'View Analytics', icon: '📈', href: '/admin/analytics', color: '#3b82f6' }
                    ].map((action) => (
                        <a
                            key={action.label}
                            href={action.href}
                            style={{
                                padding: 'var(--spacing-lg)',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)',
                                transition: 'all 0.3s',
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                                e.currentTarget.style.borderColor = action.color;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: `linear-gradient(135deg, ${action.color}15 0%, ${action.color}05 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                {action.icon}
                            </div>
                            <span style={{
                                color: '#0f172a',
                                fontWeight: 600,
                                fontSize: '0.95rem'
                            }}>
                                {action.label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.3px'
                }}>
                    Recent Activity
                </h2>
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden'
                }}>
                    {[
                        { action: 'New book sale', item: 'Divine Providence', time: '2 hours ago', icon: '📚', color: '#8b5cf6' },
                        { action: 'New comment', item: 'Article: Spiritual Growth', time: '5 hours ago', icon: '💬', color: '#ef4444' },
                        { action: 'Article published', item: 'Understanding Faith', time: '1 day ago', icon: '✍️', color: '#f59e0b' },
                        { action: 'Book updated', item: 'Human Journey', time: '2 days ago', icon: '📖', color: '#3b82f6' }
                    ].map((activity, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)',
                                padding: 'var(--spacing-lg)',
                                borderBottom: index < 3 ? '1px solid #f1f5f9' : 'none',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: `linear-gradient(135deg, ${activity.color}15 0%, ${activity.color}05 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.3rem',
                                flexShrink: 0
                            }}>
                                {activity.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    color: '#0f172a',
                                    fontWeight: 600,
                                    marginBottom: '0.25rem',
                                    fontSize: '0.95rem'
                                }}>
                                    {activity.action}
                                </div>
                                <div style={{
                                    color: '#64748b',
                                    fontSize: '0.85rem',
                                    fontWeight: 500
                                }}>
                                    {activity.item}
                                </div>
                            </div>
                            <div style={{
                                color: '#94a3b8',
                                fontSize: '0.8rem',
                                fontWeight: 500
                            }}>
                                {activity.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
