'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface FluidTiltCardProps {
    coverImage: string;
    title: string;
    author?: string;
    badge?: string;
    rating?: number;
    pages?: number;
    price?: string;
}

export default function FluidTiltCard({
    coverImage,
    title,
    author = 'Dr. Muhammad Salim',
    badge,
    rating = 4.9,
    pages = 428,
    price = '$21.50'
}: FluidTiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Rotation angles (-14 to +14 deg)
        const rotX = ((mouseY / height) - 0.5) * -22;
        const rotY = ((mouseX / width) - 0.5) * 22;

        setRotateX(rotX);
        setRotateY(rotY);

        // Glare coordinates (in percentage)
        setGlarePosition({
            x: (mouseX / width) * 100,
            y: (mouseY / height) * 100,
            opacity: 0.35
        });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlarePosition(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            className="perspective-[1200px] w-full flex items-center justify-center py-4 select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)'
                }}
                className="relative w-52 sm:w-60 h-76 sm:h-88 rounded-2xl bg-stone-900 shadow-2xl overflow-hidden cursor-pointer group transform-gpu"
            >
                {/* Book Spine 3D Ridge Effect on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-black/40 border-r border-white/10 z-20 pointer-events-none rounded-l-2xl" />

                {/* Cover Image */}
                <div className="relative w-full h-full">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-103"
                        sizes="(max-width: 640px) 240px, 280px"
                    />
                </div>

                {/* Dynamic Metallic Gold Foil Glare Layer */}
                <div
                    className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle 180px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 235, 170, 0.55), rgba(255, 215, 100, 0.1) 40%, transparent 80%)`,
                        opacity: glarePosition.opacity
                    }}
                />

                {/* Top Badge */}
                {badge && (
                    <div className="absolute top-3 right-3 z-30">
                        <span className="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                            ★ {badge}
                        </span>
                    </div>
                )}

                {/* Bottom Spec Strip */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-stone-950/95 via-stone-950/70 to-transparent z-30 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span className="text-amber-200/90 font-semibold">{price}</span>
                    <span className="text-stone-300">{pages} Pages</span>
                </div>
            </div>
        </div>
    );
}
