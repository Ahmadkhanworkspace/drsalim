'use client';

export default function BundlesPage() {
    const bundles = [
        {
            id: '1',
            name: 'Complete Spiritual Growth Collection',
            books: ['Brotherhood', 'Spiritual Diseases', 'Human Journey'],
            regularPrice: 33,
            bundlePrice: 25,
            discount: 24,
            sales: 12,
            revenue: 300
        },
        {
            id: '2',
            name: 'Divine Providence Complete Set',
            books: ['Divine Providence', 'Divine Providence Vol 2'],
            regularPrice: 22,
            bundlePrice: 18,
            discount: 18,
            sales: 8,
            revenue: 144
        },
        {
            id: '3',
            name: 'Beginner\'s Islamic Studies Bundle',
            books: ['Brotherhood', 'Human Journey'],
            regularPrice: 21,
            bundlePrice: 17,
            discount: 19,
            sales: 15,
            revenue: 255
        }
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>Book Bundles</h1>
                    <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>Create and manage book bundles and collections</p>
                </div>
                <button style={{ padding: '8px 16px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                    + Create Bundle
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Total Bundles</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{bundles.length}</div>
                </div>
                <div style={{ padding: '14px', background: '#D1F4E0', border: '1px solid #067D62', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Total Sales</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#067D62' }}>{bundles.reduce((sum, b) => sum + b.sales, 0)}</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Revenue</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#067D62' }}>${bundles.reduce((sum, b) => sum + b.revenue, 0)}</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {bundles.map(bundle => (
                    <div key={bundle.id} style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F1111', marginBottom: '4px' }}>{bundle.name}</h3>
                                <div style={{ fontSize: '0.8125rem', color: '#565959' }}>{bundle.books.length} books included</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959', textDecoration: 'line-through' }}>${bundle.regularPrice}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#C7511F' }}>${bundle.bundlePrice}</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#067D62' }}>Save {bundle.discount}%</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>Included Books:</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {bundle.books.map((book, idx) => (
                                    <span key={idx} style={{
                                        padding: '4px 10px',
                                        background: '#F7FAFA',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        color: '#0F1111'
                                    }}>
                                        {book}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ padding: '10px', background: '#F7FAFA', borderRadius: '6px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959' }}>Sales</div>
                                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#067D62' }}>{bundle.sales}</div>
                            </div>
                            <div style={{ padding: '10px', background: '#F7FAFA', borderRadius: '6px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959' }}>Revenue</div>
                                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#067D62' }}>${bundle.revenue}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ padding: '6px 14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                                Edit Bundle
                            </button>
                            <button style={{ padding: '6px 14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                                View Analytics
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
