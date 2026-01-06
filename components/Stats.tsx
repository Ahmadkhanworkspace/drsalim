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
        <div className="modern-card" style={{
            textAlign: 'center',
            padding: 'var(--spacing-2xl)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Icon */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '8rem',
                opacity: 0.05,
                pointerEvents: 'none'
            }}>
                {icon}
            </div>

            {/* Icon */}
            <div style={{
                fontSize: '3rem',
                marginBottom: 'var(--spacing-md)',
                filter: 'drop-shadow(0 4px 12px rgba(0, 212, 255, 0.3))'
            }}>
                {icon}
            </div>

            {/* Number */}
            <div className="gradient-text" style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                marginBottom: 'var(--spacing-sm)',
                fontFamily: 'Poppins, sans-serif',
                position: 'relative'
            }}>
                {count}{suffix}
            </div>

            {/* Label */}
            <div style={{
                fontSize: '1.1rem',
                color: 'var(--color-text-secondary)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                {label}
            </div>
        </div>
    );
}

export default function Stats() {
    return (
        <section id="achievements" className="section" style={{
            background: 'var(--color-bg-secondary)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decoration */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'radial-gradient(circle at 30% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 50%)',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(0, 212, 255, 0.1)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        marginBottom: 'var(--spacing-md)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        border: '1px solid rgba(0, 212, 255, 0.3)'
                    }}>
                        Achievements
                    </div>

                    <h2 style={{
                        marginBottom: 'var(--spacing-md)',
                        background: 'var(--gradient-accent)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Dr. Muhammad Salim&apos;s Scholarly Excellence
                    </h2>

                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}>
                        A lifetime dedicated to research, writing, and sharing knowledge with the world
                    </p>
                </div>

                <div className="grid-4">
                    <StatItem number={200} label="Publications" suffix="+" icon="📚" />
                    <StatItem number={20} label="Awards" suffix="+" icon="🏆" />
                    <StatItem number={40} label="Years Experience" suffix="+" icon="⭐" />
                    <StatItem number={20} label="Books Published" suffix="+" icon="📖" />
                </div>
            </div>
        </section>
    );
}
