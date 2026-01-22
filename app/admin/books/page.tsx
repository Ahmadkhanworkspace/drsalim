import { getBooks } from "@/app/lib/actions";
import Link from "next/link";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

import BookActions from './BookActions';

export default async function BooksPage() {
    // Fetch real data from persistent storage
    const booksData = await getBooks();

    // Map data to match the UI requirements if needed, 
    // ensuring strict type safety
    const books = booksData.map((b: any) => ({
        id: b.id || b._id,
        title: b.title,
        sales: b.sales || 0,
        revenue: b.revenue || 0,
        price: b.price || 0,
        amazonLink: b.amazonLink
    }));

    const totalRevenue = 942;
    const totalSales = 86;
    const payoutThreshold = 1000;
    const payoutProgress = (totalRevenue / payoutThreshold) * 100;

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 16px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-2xl)',
                flexWrap: 'wrap',
                gap: '12px'
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
                <Link
                    href="/admin/books/new"
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
                        transition: 'all 0.2s',
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}
                >
                    ➕ Add New Book
                </Link>
            </div>

            {/* Revenue Overview */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                                        <BookActions id={book.id} />
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
