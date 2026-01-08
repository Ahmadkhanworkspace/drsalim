'use client';

export default function ReadingStatsPage() {
    const topBooks = [
        { title: 'Brotherhood', reads: 1247, completionRate: 78, avgTime: '4.2 hrs' },
        { title: 'Divine Providence', reads: 892, completionRate: 65, avgTime: '5.8 hrs' },
        { title: 'Spiritual Diseases', reads: 654, completionRate: 82, avgTime: '3.5 hrs' },
        { title: 'Human Journey', reads: 423, completionRate: 71, avgTime: '4.0 hrs' },
    ];

    const deviceStats = [
        { device: 'Mobile', percentage: 62, reads: 2145 },
        { device: 'Desktop', percentage: 28, reads: 968 },
        { device: 'Tablet', percentage: 10, reads: 346 },
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>Reading Statistics</h1>
                <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>Track reader engagement and behavior</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Total Reads</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>3,459</div>
                </div>
                <div style={{ padding: '14px', background: '#D1F4E0', border: '1px solid #067D62', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Avg Completion</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#067D62' }}>74%</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Avg Reading Time</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>4.4 hrs</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                {/* Most Read Books */}
                <div style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F1111', marginBottom: '16px' }}>Most Read Books</h3>
                    {topBooks.map((book, idx) => (
                        <div key={idx} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: idx < topBooks.length - 1 ? '1px solid #E3E6E6' : 'none' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111' }}>{book.title}</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#067D62' }}>{book.reads}</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '6px' }}>
                                {book.completionRate}% completion • {book.avgTime} avg
                            </div>
                            <div style={{ height: '4px', background: '#E3E6E6', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: `${book.completionRate}%`, height: '100%', background: '#067D62' }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Device Stats */}
                <div style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F1111', marginBottom: '16px' }}>Reading by Device</h3>
                    {deviceStats.map((stat, idx) => (
                        <div key={idx} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111' }}>{stat.device}</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F1111' }}>{stat.percentage}%</span>
                            </div>
                            <div style={{ height: '8px', background: '#E3E6E6', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${stat.percentage}%`, height: '100%', background: '#FF9900' }} />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#565959', marginTop: '4px' }}>
                                {stat.reads.toLocaleString()} reads
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
