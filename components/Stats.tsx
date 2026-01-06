'use client';

import { useEffect, useState } from 'react';

interface StatItemProps {
    number: number;
    label: string;
    suffix?: string;
}

function StatItem({ number, label, suffix = '' }: StatItemProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2500;
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
            padding: '2rem 1rem'
        }}>
            <div style={{
                fontSize: 'clamp(3rem, 6vw, 4rem)',
                fontWeight: 800,
                color: '#fff',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1,
                marginBottom: '0.75rem',
                textShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
                {count}{suffix}
            </div>

            <div style={{
                fontSize: '0.85rem',
                color: '#1c1917',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontFamily: 'var(--font-body)'
            }}>
                {label}
            </div>
        </div>
    );
}

export default function Stats() {
    return (
        <section id="achievements" className="section" style={{
            background: 'var(--gradient-gold)',
            position: 'relative',
            padding: '4rem 0'
        }}>
            <div className="container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 2rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    alignItems: 'center'
                }}>
                    <StatItem number={40} label="Years Experience" suffix="+" />
                    <StatItem number={200} label="Publications" suffix="+" />
                    <StatItem number={20} label="Books Published" suffix="+" />
                    <StatItem number={20} label="Global Awards" suffix="+" />
                </div>
            </div>
        </section>
    );
}
