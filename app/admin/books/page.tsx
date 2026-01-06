'use client';

import { useState } from 'react';

interface Book {
    id: string;
    title: string;
    sales: number;
    revenue: number;
    price: number;
    amazonLink: string;
}

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([
        { id: '1', title: 'Brotherhood', sales: 47, revenue: 564, price: 12, amazonLink: '#' },
        { id: '2', title: 'Divine Providence', sales: 21, revenue: 210, price: 10, amazonLink: '#' },
        { id: '3', title: 'Human Journey', sales: 5, revenue: 50, price: 10, amazonLink: '#' },
        { id: '4', title: 'Divine Providence Vol 2', sales: 0, revenue: 0, price: 15, amazonLink: '#' },
        { id: '5', title: 'Spiritual Diseases', sales: 13, revenue: 118, price: 9, amazonLink: '#' },
    ]);

    const totalRevenue = 942;
    const totalSales = 86;
    const payoutThreshold = 1000;
    const payoutProgress = (totalRevenue / payoutThreshold) * 100;

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.5px'
                    }}>
                        Books Management
                    </h1>
                    <p style={{
                        color: '#64748b',
                        fontSize: '1rem',
                        fontWeight: 500
                    }}>
                        Manage your published books, track sales and revenue
                    </p>
                </div>
                <button
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 212, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)';
                    }}
                >
                    ➕ Add New Book
                </button>
            </div>

            {/* Revenue Overview */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                {/* Total Revenue */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '2px solid #10b981',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Total Revenue
                    </div>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#10b981',
                        marginBottom: 'var(--spacing-sm)',
                        letterSpacing: '-1px'
                    }}>
                        ${totalRevenue.toLocaleString()}
                    </div>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.9rem',
                        fontWeight: 500
                    }}>
                        From {totalSales} total sales
                    </div>
                </div>

                {/* Payout Threshold */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Payout Threshold
                    </div>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: 'var(--spacing-md)',
                        letterSpacing: '-0.5px'
                    }}>
                        ${payoutThreshold.toLocaleString()}
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                        background: '#f1f5f9',
                        borderRadius: '8px',
                        height: '12px',
                        overflow: 'hidden',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        <div style={{
                            width: `${Math.min(payoutProgress, 100)}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                            transition: 'width 0.5s ease',
                            boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)'
                        }} />
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        color: '#64748b',
                        fontWeight: 600
                    }}>
                        <span>{payoutProgress.toFixed(1)}% reached</span>
                        <span>${(payoutThreshold - totalRevenue).toLocaleString()} remaining</span>
                    </div>
                </div>
            </div>

            {/* Books Table */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden'
            }}>
                <div style={{
                    overflowX: 'auto'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse'
                    }}>
                        <thead>
                            <tr style={{
                                background: '#f8fafc',
                                borderBottom: '1px solid #e2e8f0'
                            }}>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'left',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Book Title
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Price
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Sales
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Revenue
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'right',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr
                                    key={book.id}
                                    style={{
                                        borderBottom: index < books.length - 1 ? '1px solid #f1f5f9' : 'none',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#f8fafc';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'white';
                                    }}
                                >
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        color: '#0f172a',
                                        fontWeight: 600,
                                        fontSize: '0.95rem'
                                    }}>
                                        {book.title}
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'center',
                                        color: '#475569',
                                        fontWeight: 600,
                                        fontSize: '0.95rem'
                                    }}>
                                        ${book.price}
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'center',
                                        color: '#475569',
                                        fontWeight: 700,
                                        fontSize: '1rem'
                                    }}>
                                        {book.sales}
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'center',
                                        color: '#10b981',
                                        fontWeight: 800,
                                        fontSize: '1.1rem'
                                    }}>
                                        ${book.revenue.toLocaleString()}
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'right'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            gap: 'var(--spacing-sm)',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <button
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: '#f1f5f9',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: '#475569',
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#00d4ff';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#f1f5f9';
                                                    e.currentTarget.style.color = '#475569';
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: '#fef2f2',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#ef4444';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#fef2f2';
                                                    e.currentTarget.style.color = '#ef4444';
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
