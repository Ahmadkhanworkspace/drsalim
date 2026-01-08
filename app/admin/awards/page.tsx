'use client';

export default function AwardsPage() {
    const awards: any[] = [];

    const stats = {
        totalAwards: 0,
        bestsellers: 0,
        mediaFeatures: 0,
        recognitions: 0
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>Awards & Recognition</h1>
                    <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>Showcase achievements and accolades</p>
                </div>
                <button style={{ padding: '8px 16px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                    + Add Award
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#0F1111', marginBottom: '4px', textTransform: 'uppercase' }}>Awards</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{stats.totalAwards}</div>
                </div>
                <div style={{ padding: '14px', background: '#D1F4E0', border: '1px solid #067D62', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Bestsellers</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#067D62' }}>{stats.bestsellers}</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Media Features</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{stats.mediaFeatures}</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Recognitions</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{stats.recognitions}</div>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F1111', marginBottom: '16px' }}>Achievement Timeline</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {awards.map(award => (
                        <div key={award.id} style={{
                            padding: '16px',
                            background: '#F7FAFA',
                            border: '1px solid #D5D9D9',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            gap: '12px'
                        }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '1.25rem' }}>
                                        {award.category === 'Award' ? '🏆' : award.category === 'Bestseller' ? '⭐' : award.category === 'Media' ? '📰' : '🎖️'}
                                    </span>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#0F1111', margin: 0 }}>{award.title}</h4>
                                </div>
                                <div style={{ fontSize: '0.8125rem', color: '#565959', marginBottom: '4px' }}>
                                    {award.book} • {award.organization}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                    {award.date}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{
                                    padding: '4px 10px',
                                    background: award.category === 'Award' ? '#FFD814' : award.category === 'Bestseller' ? '#D1F4E0' : '#FFF4E5',
                                    color: award.category === 'Award' ? '#0F1111' : award.category === 'Bestseller' ? '#067D62' : '#FF9900',
                                    fontSize: '0.6875rem',
                                    fontWeight: 600,
                                    borderRadius: '4px',
                                    textTransform: 'uppercase'
                                }}>
                                    {award.category}
                                </span>
                                <button style={{
                                    padding: '6px 12px',
                                    background: '#fff',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer'
                                }}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
