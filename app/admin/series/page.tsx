'use client';

import { useState } from 'react';

export default function SeriesPage() {
    const [series] = useState([
        {
            id: '1',
            name: 'Divine Providence Series',
            description: 'Comprehensive exploration of Rububiyah and Allah\'s divine providence',
            books: ['Divine Providence', 'Divine Providence Vol 2'],
            totalSales: 21,
            totalRevenue: 231,
            status: 'ongoing'
        },
        {
            id: '2',
            name: 'Spiritual Growth Collection',
            description: 'Essential guides for spiritual purification and personal development',
            books: ['Spiritual Diseases', 'Human Journey'],
            totalSales: 18,
            totalRevenue: 194,
            status: 'complete'
        }
    ]);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>Book Series Manager</h1>
                    <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>Organize books into series and manage reading order</p>
                </div>
                <button style={{ padding: '8px 16px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                    + Create Series
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {series.map(s => (
                    <div key={s.id} style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F1111', marginBottom: '4px' }}>{s.name}</h2>
                                <p style={{ fontSize: '0.875rem', color: '#565959', margin: 0 }}>{s.description}</p>
                            </div>
                            <span style={{
                                padding: '4px 10px',
                                background: s.status === 'complete' ? '#D1F4E0' : '#FFF4E5',
                                color: s.status === 'complete' ? '#067D62' : '#FF9900',
                                fontSize: '0.6875rem',
                                fontWeight: 600,
                                borderRadius: '4px',
                                textTransform: 'uppercase'
                            }}>
                                {s.status}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ padding: '12px', background: '#F7FAFA', borderRadius: '6px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>Books in Series</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F1111' }}>{s.books.length}</div>
                            </div>
                            <div style={{ padding: '12px', background: '#F7FAFA', borderRadius: '6px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>Total Sales</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#067D62' }}>{s.totalSales}</div>
                            </div>
                            <div style={{ padding: '12px', background: '#F7FAFA', borderRadius: '6px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>Revenue</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#067D62' }}>${s.totalRevenue}</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>Reading Order:</div>
                            {s.books.map((book, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: '#F7FAFA', borderRadius: '4px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#565959', width: '20px' }}>{idx + 1}.</span>
                                    <span style={{ fontSize: '0.8125rem', color: '#0F1111' }}>{book}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ padding: '6px 14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                                Edit Series
                            </button>
                            <button style={{ padding: '6px 14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                                Manage Books
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
