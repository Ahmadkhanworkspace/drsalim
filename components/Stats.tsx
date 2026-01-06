'use client';

import { useEffect, useState } from 'react';

interface StatItemProps {
    number: number;
    label: string;
    suffix?: string;
    icon: string;
}

function StatItem({ number, label, suffix = '', icon }: StatItemProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                setCount(number);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [number]);

    return (
        <div style={{
            textAlign: 'center',
            padding: 'var(--spacing-lg)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            {/* Number */}
            <div style={{
                fontSize: '3rem',
                fontWeight: 800,
                color: '#fbbf24', // Premium Gold
                fontFamily: 'Poppins, sans-serif',
                lineHeight: 1
            }}>
                {count}{suffix}
            </div>

            {/* Label */}
            <div style={{
                fontSize: '0.9rem',
                color: '#e0f2fe', // Light Sky Blue for readability
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
            }}>
                {label}
            </div>

            {/* Divider line for elegance */}
            <div style={{
                width: '40px',
                height: '2px',
                background: '#60a5fa', // Lighter blue divider
                marginTop: '1rem'
            }} />
        </div>
    );
}

export default function Stats() {
    return (
        <section id="achievements" style={{
            background: 'var(--color-dark-blue)', // Royal Blue for contrast
            padding: 'var(--spacing-2xl) 0',
            borderTop: '1px solid var(--color-primary)',
            borderBottom: '1px solid var(--color-primary)'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    alignItems: 'center'
                }}>
                    <StatItem number={40} label="Years Experience" suffix="+" icon="⭐" />
                    <StatItem number={200} label="Publications" suffix="+" icon="📚" />
                    <StatItem number={20} label="Books Published" suffix="+" icon="📖" />
                    <StatItem number={20} label="Global Awards" suffix="+" icon="🏆" />
                </div>
            </div>
        </section>
    );
}
