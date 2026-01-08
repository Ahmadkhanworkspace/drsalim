'use client';

import { useState } from 'react';

interface Promotion {
    id: string;
    title: string;
    bookTitle: string;
    type: 'discount' | 'bundle' | 'free';
    discountPercent?: number;
    code: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'scheduled' | 'expired';
    uses: number;
    maxUses: number;
}

export default function PromotionsPage() {
    const [promotions] = useState<Promotion[]>([
        { id: '1', title: 'New Year Sale', bookTitle: 'Brotherhood', type: 'discount', discountPercent: 25, code: 'NEWYEAR25', startDate: '2026-01-01', endDate: '2026-01-15', status: 'active', uses: 47, maxUses: 100 },
        { id: '2', title: 'Spiritual Growth Bundle', bookTitle: 'Spiritual Diseases + Human Journey', type: 'bundle', discountPercent: 30, code: 'SPIRITUAL30', startDate: '2026-01-05', endDate: '2026-01-31', status: 'active', uses: 18, maxUses: 50 },
        { id: '3', title: 'Free Preview Week', bookTitle: 'Divine Providence Vol 2', type: 'free', code: 'PREVIEW2026', startDate: '2026-01-10', endDate: '2026-01-17', status: 'scheduled', uses: 0, maxUses: 200 },
        { id: '4', title: 'Brotherhood Launch', bookTitle: 'Brotherhood', type: 'discount', discountPercent: 20, code: 'LAUNCH20', startDate: '2025-12-01', endDate: '2025-12-31', status: 'expired', uses: 156, maxUses: 200 },
    ]);

    const stats = {
        active: promotions.filter(p => p.status === 'active').length,
        scheduled: promotions.filter(p => p.status === 'scheduled').length,
        totalUses: promotions.reduce((sum, p) => sum + p.uses, 0),
        revenue: 942 * 0.15 // Estimated revenue from promotions
    };

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 16px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>
                        Book Promotions
                    </h1>
                    <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>
                        Manage discounts, sales, and promotional campaigns
                    </p>
                </div>
                <button style={{
                    padding: '8px 16px',
                    background: '#FFD814',
                    border: '1px solid #FCD200',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}>
                    + Create Promotion
                </button>
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
            }}>
                <div style={{ padding: '14px', background: '#D1F4E0', border: '1px solid #067D62', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Active Promotions</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#067D62' }}>{stats.active}</div>
                </div>
                <div style={{ padding: '14px', background: '#FFF4E5', border: '1px solid #FF9900', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Scheduled</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF9900' }}>{stats.scheduled}</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Total Uses</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{stats.totalUses}</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Est. Revenue</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>${stats.revenue.toFixed(0)}</div>
                </div>
            </div>

            {/* Promotions List */}
            <div style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {promotions.map(promo => (
                        <div key={promo.id} style={{
                            padding: '16px',
                            background: '#F7FAFA',
                            border: '1px solid #D5D9D9',
                            borderRadius: '8px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                                <div>
                                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F1111', marginBottom: '4px' }}>
                                        {promo.title}
                                    </div>
                                    <div style={{ fontSize: '0.8125rem', color: '#565959', marginBottom: '4px' }}>
                                        {promo.bookTitle}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                        {promo.startDate} to {promo.endDate}
                                    </div>
                                </div>
                                <span style={{
                                    padding: '4px 10px',
                                    background: promo.status === 'active' ? '#D1F4E0' : promo.status === 'scheduled' ? '#FFF4E5' : '#E3E6E6',
                                    color: promo.status === 'active' ? '#067D62' : promo.status === 'scheduled' ? '#FF9900' : '#565959',
                                    fontSize: '0.6875rem',
                                    fontWeight: 600,
                                    borderRadius: '4px',
                                    textTransform: 'uppercase'
                                }}>
                                    {promo.status}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959' }}>Discount</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#067D62' }}>
                                        {promo.discountPercent ? `${promo.discountPercent}% OFF` : promo.type === 'free' ? 'FREE' : 'Bundle'}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959' }}>Code</div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', fontFamily: 'monospace' }}>
                                        {promo.code}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959' }}>Uses</div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111' }}>
                                        {promo.uses} / {promo.maxUses}
                                    </div>
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
                                    width: `${(promo.uses / promo.maxUses) * 100}%`,
                                    height: '100%',
                                    background: '#067D62'
                                }} />
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
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
                                <button style={{
                                    padding: '6px 12px',
                                    background: '#fff',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer'
                                }}>
                                    View Analytics
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
