'use client';

export default function CoversPage() {
    const books = [
        {
            id: 1,
            title: 'Brotherhood',
            covers: [
                { id: 'c1', name: 'Original Cover', active: true, performance: 94, clicks: 1247, conversions: 47 },
                { id: 'c2', name: 'Minimalist Design', active: false, performance: 78, clicks: 892, conversions: 32 },
                { id: 'c3', name: 'Gold Edition', active: false, performance: 85, clicks: 1054, conversions: 41 }
            ]
        },
        {
            id: 2,
            title: 'Divine Providence',
            covers: [
                { id: 'c4', name: 'Classic Cover', active: true, performance: 88, clicks: 756, conversions: 21 },
                { id: 'c5', name: 'Modern Redesign', active: false, performance: 72, clicks: 543, conversions: 15 }
            ]
        },
        {
            id: 3,
            title: 'Spiritual Diseases',
            covers: [
                { id: 'c6', name: 'Original Cover', active: true, performance: 91, clicks: 654, conversions: 13 }
            ]
        }
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>Book Cover Versions</h1>
                    <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>Manage multiple cover designs and track performance</p>
                </div>
                <button style={{ padding: '8px 16px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                    + Upload Cover
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {books.map(book => (
                    <div key={book.id} style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F1111', marginBottom: '16px' }}>
                            {book.title}
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                            {book.covers.map(cover => (
                                <div key={cover.id} style={{
                                    padding: '14px',
                                    background: '#F7FAFA',
                                    border: cover.active ? '2px solid #FF9900' : '1px solid #D5D9D9',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '2px' }}>
                                                {cover.name}
                                            </div>
                                            {cover.active && (
                                                <span style={{
                                                    padding: '2px 6px',
                                                    background: '#FF9900',
                                                    color: '#fff',
                                                    fontSize: '0.6875rem',
                                                    fontWeight: 600,
                                                    borderRadius: '3px'
                                                }}>
                                                    ACTIVE
                                                </span>
                                            )}
                                        </div>
                                        <div style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: cover.performance >= 90 ? '#067D62' : cover.performance >= 80 ? '#FF9900' : '#565959'
                                        }}>
                                            {cover.performance}%
                                        </div>
                                    </div>

                                    <div style={{
                                        height: '150px',
                                        background: '#E3E6E6',
                                        borderRadius: '6px',
                                        marginBottom: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem'
                                    }}>
                                        📖
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#565959' }}>Clicks</div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111' }}>{cover.clicks}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#565959' }}>Sales</div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#067D62' }}>{cover.conversions}</div>
                                        </div>
                                    </div>

                                    <div style={{
                                        height: '4px',
                                        background: '#E3E6E6',
                                        borderRadius: '2px',
                                        overflow: 'hidden',
                                        marginBottom: '12px'
                                    }}>
                                        <div style={{
                                            width: `${cover.performance}%`,
                                            height: '100%',
                                            background: cover.performance >= 90 ? '#067D62' : '#FF9900'
                                        }} />
                                    </div>

                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {!cover.active && (
                                            <button style={{
                                                flex: 1,
                                                padding: '6px 10px',
                                                background: '#FFD814',
                                                border: '1px solid #FCD200',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}>
                                                Set Active
                                            </button>
                                        )}
                                        <button style={{
                                            flex: 1,
                                            padding: '6px 10px',
                                            background: '#fff',
                                            border: '1px solid #D5D9D9',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer'
                                        }}>
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
