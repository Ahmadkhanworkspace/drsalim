'use client';

export default function AwardsPage() {
    const awards = [
        {
            id: '1',
            title: 'Presidential Seerat Award (Essay Writing)',
            book: 'National Seerat Conference',
            organization: 'Conferred by General Pervez Musharraf (President of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'Award'
        },
        {
            id: '2',
            title: 'Presidential Seerat Award (2nd Presidential Honor)',
            book: 'National Seerat Conference',
            organization: 'Conferred by General Pervez Musharraf (President of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'Award'
        },
        {
            id: '3',
            title: 'National Prime Ministerial Seerat Award',
            book: 'National Seerat Conference',
            organization: 'Conferred by Mr. M. Nawaz Sharif (Prime Minister of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'Award'
        },
        {
            id: '4',
            title: 'Presidential Seerat Award',
            book: 'National Seerat Conference',
            organization: 'Conferred by Mr. Farooq Khan Leghari (President of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'Award'
        },
        {
            id: '5',
            title: 'Prime Ministerial Seerat Award',
            book: 'National Seerat Conference',
            organization: 'Conferred by Mr. Moeen A. Qureshi (Caretaker Prime Minister of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'Award'
        },
        {
            id: '6',
            title: 'International Student Leadership Honor',
            book: 'Islamic Centre Establishment',
            organization: 'International Muslim Students Association (IMSA) • IRRI / UPLB Philippines',
            date: 'President & VP IMSA',
            category: 'Recognition'
        },
        {
            id: '7',
            title: 'Scholars\' Forum Distinction (Top 5%)',
            book: 'Academic Fellowship',
            organization: 'University of Agriculture Faisalabad (UAF)',
            date: 'Merit Fellowship',
            category: 'Recognition'
        }
    ];

    const stats = {
        totalAwards: 5,
        bestsellers: 2,
        mediaFeatures: 14,
        recognitions: 8
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>Awards & Presidential Recognition</h1>
                    <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>
                        Official presidential and national accolades conferred on Dr. Muhammad Salim
                    </p>
                </div>
                <button style={{ padding: '8px 16px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                    + Add Award
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#0F1111', marginBottom: '4px', textTransform: 'uppercase' }}>Presidential Awards</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{stats.totalAwards}</div>
                </div>
                <div style={{ padding: '14px', background: '#D1F4E0', border: '1px solid #067D62', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Published Books</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#067D62' }}>6</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Scientific & Religious Works</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>200+</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Scholarly Recognitions</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{stats.recognitions}</div>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F1111', marginBottom: '16px' }}>
                    National & Presidential Achievement Timeline
                </h3>
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
                                        {award.category === 'Award' ? '🎖️' : '🌟'}
                                    </span>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F1111', margin: 0 }}>{award.title}</h4>
                                </div>
                                <div style={{ fontSize: '0.8125rem', color: '#067D62', fontWeight: 600, marginBottom: '4px' }}>
                                    {award.organization}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                    {award.book} • {award.date}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{
                                    padding: '4px 10px',
                                    background: award.category === 'Award' ? '#FFD814' : '#D1F4E0',
                                    color: '#0F1111',
                                    fontSize: '0.6875rem',
                                    fontWeight: 700,
                                    borderRadius: '4px',
                                    textTransform: 'uppercase'
                                }}>
                                    {award.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
