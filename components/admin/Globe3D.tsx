'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function Globe3D({ realtimeUsers }: { realtimeUsers: number }) {
    const globeEl = useRef<any>();
    const [heatmapData, setHeatmapData] = useState<any[]>([]);
    const [arcsData, setArcsData] = useState<any[]>([]);

    useEffect(() => {
        // Generate heat map points for visitor locations
        const generateHeatmap = () => {
            const points = [];
            const hotspots = [
                { lat: 40.7128, lng: -74.0060, weight: 0.8 }, // New York
                { lat: 51.5074, lng: -0.1278, weight: 0.9 }, // London
                { lat: 35.6762, lng: 139.6503, weight: 0.7 }, // Tokyo
                { lat: 24.8607, lng: 67.0011, weight: 1.0 }, // Karachi
                { lat: 25.2048, lng: 55.2708, weight: 0.85 }, // Dubai
                { lat: 1.3521, lng: 103.8198, weight: 0.75 }, // Singapore
            ];

            hotspots.forEach(spot => {
                // Add main hotspot
                points.push({
                    lat: spot.lat,
                    lng: spot.lng,
                    weight: spot.weight,
                    size: 0.5
                });

                // Add surrounding points for heat effect
                for (let i = 0; i < 5; i++) {
                    points.push({
                        lat: spot.lat + (Math.random() - 0.5) * 10,
                        lng: spot.lng + (Math.random() - 0.5) * 10,
                        weight: spot.weight * 0.6,
                        size: 0.3
                    });
                }
            });

            return points;
        };

        // Generate connection arcs
        const generateArcs = () => {
            const N = 15;
            return [...Array(N).keys()].map(() => ({
                startLat: (Math.random() - 0.5) * 180,
                startLng: (Math.random() - 0.5) * 360,
                endLat: (Math.random() - 0.5) * 180,
                endLng: (Math.random() - 0.5) * 360,
                color: ['rgba(16, 185, 129, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(0, 212, 255, 0.6)'][Math.floor(Math.random() * 3)]
            }));
        };

        setHeatmapData(generateHeatmap());
        setArcsData(generateArcs());

        // Update data every 3 seconds
        const interval = setInterval(() => {
            setHeatmapData(generateHeatmap());
            setArcsData(generateArcs());
        }, 3000);

        // Auto-rotate globe
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.8;
            globeEl.current.pointOfView({ altitude: 2.5 });
        }

        return () => clearInterval(interval);
    }, []);

    return (
        <Globe
            ref={globeEl}
            backgroundColor="rgba(255,255,255,0)"
            globeImageUrl={null}
            showAtmosphere={true}
            atmosphereColor="#00d4ff"
            atmosphereAltitude={0.15}

            // Light blue globe with grid
            hexPolygonsData={[...Array(1000).keys()].map(() => ({
                lat: (Math.random() - 0.5) * 180,
                lng: (Math.random() - 0.5) * 360
            }))}
            hexPolygonResolution={3}
            hexPolygonMargin={0.3}
            hexPolygonColor={() => '#e0f2fe'}
            hexPolygonAltitude={0.001}

            // Heat map points
            pointsData={heatmapData}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: any) => `rgba(16, 185, 129, ${d.weight})`}
            pointAltitude={0.01}
            pointRadius={(d: any) => d.size}

            // Connection arcs
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={1500}
            arcStroke={0.5}
            arcsTransitionDuration={1000}

            width={300}
            height={300}
        />
    );
}
