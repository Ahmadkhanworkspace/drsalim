'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import('@/components/admin/Globe3D'), { ssr: false });

// Shared analytics data
const ANALYTICS_DATA = {
    totalRevenue: 942,
    totalSales: 86,
    publishedBooks: 5,
    publishedArticles: 10,
    pendingComments: 23
};

export default function DashboardPage() {
    const [realtimeUsers, setRealtimeUsers] = useState(0);

    useEffect(() => {
        const getRandomUsers = () => Math.floor(Math.random() * (432 - 119 + 1)) + 119;
        setRealtimeUsers(getRandomUsers());

        const interval = setInterval(() => {
            setRealtimeUsers(getRandomUsers());
        }, 300000);

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
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#0F1111',
                    marginBottom: '4px'
                }}>
                    Dashboard
                </h1>
                <p style={{
                    color: '#565959',
                    fontSize: '0.875rem',
                    margin: 0
                }}>
                    Overview of your content and activity
                </p>
            </div>

            {/* Real-time Users with Globe */}
            <div style={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #D5D9D9',
                padding: '16px',
                marginBottom: '20px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        minHeight: '250px'
                    }}>
                        <Globe3D realtimeUsers={realtimeUsers} />
                    </div>

                    <div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 10px',
                            background: '#D1F4E0',
                            borderRadius: '4px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#067D62'
                            }} />
                            <span style={{
                                color: '#067D62',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'uppercase'
                            }}>
                                Live
                            </span>
                        </div>

                        <h2 style={{
                            fontSize: '1.125rem',
                            fontWeight: 400,
                            color: '#0F1111',
                            marginBottom: '8px'
                        }}>
                            Real-time visitors
                        </h2>

                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            color: '#067D62',
                            marginBottom: '12px'
                        }}>
                            {realtimeUsers}
                        </div>

                        <p style={{
                            color: '#565959',
                            fontSize: '0.8125rem',
                            lineHeight: 1.5,
                            marginBottom: '12px'
                        }}>
                            Active users browsing your content from around the world
                        </p>

                        <div style={{
                            padding: '10px',
                            background: '#F7FAFA',
                            borderRadius: '4px',
                            border: '1px solid #D5D9D9'
                        }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#565959',
                                marginBottom: '2px'
                            }}>
                                Updates every 5 minutes
                            </div>
                            <div style={{
                                fontSize: '0.8125rem',
                                color: '#067D62',
                                fontWeight: 600
                            }}>
                                ↗ +12% from last hour
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
            }}>
                {[
                    { label: 'Total Revenue', value: `$${ANALYTICS_DATA.totalRevenue.toLocaleString()}`, icon: '💰', change: '+12.5%', positive: true },
                    { label: 'Total Sales', value: ANALYTICS_DATA.totalSales, icon: '📊', change: '+8.2%', positive: true },
                    { label: 'Published Books', value: ANALYTICS_DATA.publishedBooks, icon: '📚', change: null },
                    { label: 'Published Articles', value: ANALYTICS_DATA.publishedArticles, icon: '✍️', change: null },
                    { label: 'Pending Comments', value: ANALYTICS_DATA.pendingComments, icon: '💬', change: 'Needs review', positive: false }
                ].map((stat, index) => (
                    <div key={index} style={{
                        padding: '14px',
                        background: '#fff',
                        border: '1px solid #D5D9D9',
                        borderRadius: '8px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '8px'
                        }}>
                            <div style={{
                                color: '#565959',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px'
                            }}>
                                {stat.label}
                            </div>
                            <div style={{ fontSize: '1.125rem' }}>{stat.icon}</div>
                        </div>
                        <div style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#0F1111',
                            marginBottom: '4px'
                        }}>
                            {stat.value}
                        </div>
                        {stat.change && (
                            <div style={{
                                color: stat.positive ? '#067D62' : '#C7511F',
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}>
                                {stat.change}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: '#0F1111',
                    marginBottom: '12px'
                }}>
                    Quick actions
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px'
                }}>
                    {[
                        { label: 'Add new book', icon: '📚', href: '/admin/books/new' },
                        { label: 'Write article', icon: '✍️', href: '/admin/articles/new' },
                        { label: 'Review comments', icon: '💬', href: '/admin/comments' },
                        { label: 'View analytics', icon: '📈', href: '/admin/analytics' }
                    ].map((action) => (
                        <a
                            key={action.label}
                            href={action.href}
                            style={{
                                padding: '12px',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: '#fff',
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#008296';
                                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#D5D9D9';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: '#F7FAFA',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.125rem',
                                flexShrink: 0
                            }}>
                                {action.icon}
                            </div>
                            <span style={{
                                color: '#0F1111',
                                fontWeight: 400,
                                fontSize: '0.875rem'
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
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: '#0F1111',
                    marginBottom: '12px'
                }}>
                    Recent activity
                </h2>
                <div style={{
                    background: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #D5D9D9',
                    overflow: 'hidden'
                }}>
                    {[
                        { action: 'New book sale', item: 'Divine Providence', time: '2 hours ago', icon: '📚' },
                        { action: 'New comment', item: 'Article: Spiritual Growth', time: '5 hours ago', icon: '💬' },
                        { action: 'Article published', item: 'Understanding Faith', time: '1 day ago', icon: '✍️' },
                        { action: 'Book updated', item: 'Human Journey', time: '2 days ago', icon: '📖' }
                    ].map((activity, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 14px',
                                borderBottom: index < 3 ? '1px solid #E3E6E6' : 'none'
                            }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: '#F7FAFA',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1rem',
                                flexShrink: 0
                            }}>
                                {activity.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    color: '#0F1111',
                                    fontWeight: 600,
                                    marginBottom: '2px',
                                    fontSize: '0.875rem'
                                }}>
                                    {activity.action}
                                </div>
                                <div style={{
                                    color: '#565959',
                                    fontSize: '0.8125rem'
                                }}>
                                    {activity.item}
                                </div>
                            </div>
                            <div style={{
                                color: '#6F7373',
                                fontSize: '0.75rem'
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
