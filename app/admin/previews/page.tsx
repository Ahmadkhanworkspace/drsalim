'use client';

export default function PreviewsPage() {
    const previews = [
        { id: '1', bookTitle: 'Brotherhood', pages: 25, downloads: 342, conversions: 47, conversionRate: 13.7 },
        { id: '2', bookTitle: 'Divine Providence', pages: 30, downloads: 289, conversions: 21, conversionRate: 7.3 },
        { id: '3', bookTitle: 'Spiritual Diseases', pages: 20, downloads: 215, conversions: 13, conversionRate: 6.0 },
        { id: '4', bookTitle: 'Human Journey', pages: 22, downloads: 98, conversions: 5, conversionRate: 5.1 },
        { id: '5', bookTitle: 'Divine Providence Vol 2', pages: 28, downloads: 67, conversions: 0, conversionRate: 0 },
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>Preview Chapters</h1>
                    <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>Manage free sample chapters and track conversions</p>
                </div>
                <button style={{ padding: '8px 16px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                    + Upload Preview
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Total Downloads</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{previews.reduce((sum, p) => sum + p.downloads, 0)}</div>
                </div>
                <div style={{ padding: '14px', background: '#D1F4E0', border: '1px solid #067D62', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Conversions</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#067D62' }}>{previews.reduce((sum, p) => sum + p.conversions, 0)}</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Avg Conversion</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>
                        {(previews.reduce((sum, p) => sum + p.conversionRate, 0) / previews.length).toFixed(1)}%
                    </div>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F7FAFA', borderBottom: '1px solid #D5D9D9' }}>
                                <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Book</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Pages</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Downloads</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Conversions</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Rate</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {previews.map((preview, idx) => (
                                <tr key={preview.id} style={{ borderBottom: idx < previews.length - 1 ? '1px solid #E3E6E6' : 'none' }}>
                                    <td style={{ padding: '12px', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111' }}>{preview.bookTitle}</td>
                                    <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111', textAlign: 'center' }}>{preview.pages}</td>
                                    <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111', textAlign: 'center' }}>{preview.downloads}</td>
                                    <td style={{ padding: '12px', fontSize: '0.8125rem', fontWeight: 600, color: '#067D62', textAlign: 'center' }}>{preview.conversions}</td>
                                    <td style={{ padding: '12px', fontSize: '0.8125rem', fontWeight: 600, color: preview.conversionRate > 10 ? '#067D62' : '#FF9900', textAlign: 'center' }}>
                                        {preview.conversionRate.toFixed(1)}%
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button style={{ padding: '6px 12px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', marginRight: '4px' }}>
                                            Edit
                                        </button>
                                        <button style={{ padding: '6px 12px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                                            Download
                                        </button>
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
