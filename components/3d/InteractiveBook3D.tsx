'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Book3DProps {
    coverImage: string;
    title: string;
    author?: string;
    spineColor?: string;
}

export default function InteractiveBook3D({
    coverImage,
    title,
    author = 'Dr. Muhammad Salim',
    spineColor = '#6A1A1A'
}: Book3DProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // Scene, Camera, Renderer
        const width = container.clientWidth || 380;
        const height = container.clientHeight || 480;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
        camera.position.set(0, 0, 8.8);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Lighting System (Warm Editorial Lighting)
        const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xfffaed, 2.4);
        keyLight.position.set(4, 6, 6);
        keyLight.castShadow = true;
        scene.add(keyLight);

        // Moving Specular Light for Gold Foil Gleam
        const gleamLight = new THREE.PointLight(0xffdf88, 3.2, 12);
        gleamLight.position.set(0, 1, 4);
        scene.add(gleamLight);

        const rimLight = new THREE.DirectionalLight(0xc5a869, 1.2);
        rimLight.position.set(-4, -2, -3);
        scene.add(rimLight);

        // Book Mesh Group
        const bookGroup = new THREE.Group();
        scene.add(bookGroup);

        // Book Geometry: Width 3.1, Height 4.5, Depth 0.45
        const bookWidth = 3.1;
        const bookHeight = 4.5;
        const bookDepth = 0.48;
        const geometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);

        // Procedural Paper Texture for Pages
        const createPagesTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#F4EDE0';
                ctx.fillRect(0, 0, 128, 128);
                // Subtle horizontal paper edge grooves
                ctx.fillStyle = '#E5D8C3';
                for (let i = 0; i < 128; i += 3) {
                    ctx.fillRect(0, i, 128, 1);
                }
            }
            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            return texture;
        };

        const pagesTexture = createPagesTexture();
        const pagesMaterial = new THREE.MeshStandardMaterial({
            map: pagesTexture,
            roughness: 0.85,
            metalness: 0.05
        });

        // Spine Material (Embossed Leather / Cloth)
        const spineMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(spineColor),
            roughness: 0.4,
            metalness: 0.15
        });

        // Back Cover Material
        const backMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(spineColor),
            roughness: 0.45,
            metalness: 0.1
        });

        // Front Cover Material with Texture Loader
        const textureLoader = new THREE.TextureLoader();
        let frontMaterial: THREE.MeshStandardMaterial;

        // Fallback Canvas while image loads
        const createFallbackCover = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 768;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = spineColor;
                ctx.fillRect(0, 0, 512, 768);
                // Gold border
                ctx.strokeStyle = '#D4AF37';
                ctx.lineWidth = 12;
                ctx.strokeRect(24, 24, 464, 720);
                // Typography
                ctx.fillStyle = '#F5D77F';
                ctx.font = 'bold 36px serif';
                ctx.textAlign = 'center';
                ctx.fillText(title, 256, 320);
                ctx.font = '20px sans-serif';
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(author, 256, 420);
            }
            return new THREE.CanvasTexture(canvas);
        };

        frontMaterial = new THREE.MeshStandardMaterial({
            map: createFallbackCover(),
            roughness: 0.35,
            metalness: 0.25
        });

        textureLoader.load(coverImage, (loadedTex) => {
            loadedTex.colorSpace = THREE.SRGBColorSpace;
            loadedTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
            frontMaterial.map = loadedTex;
            frontMaterial.needsUpdate = true;
        });

        // Multi-materials array: [right, left, top, bottom, front, back]
        const materials = [
            pagesMaterial, // +X: Pages edge
            spineMaterial, // -X: Book Spine
            pagesMaterial, // +Y: Top pages
            pagesMaterial, // -Y: Bottom pages
            frontMaterial, // +Z: Front Cover
            backMaterial   // -Z: Back Cover
        ];

        const bookMesh = new THREE.Mesh(geometry, materials);
        bookMesh.castShadow = true;
        bookGroup.add(bookMesh);

        // Soft Ground Shadow Below Book
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 256;
        shadowCanvas.height = 256;
        const sctx = shadowCanvas.getContext('2d');
        if (sctx) {
            const grad = sctx.createRadialGradient(128, 128, 10, 128, 128, 120);
            grad.addColorStop(0, 'rgba(30, 24, 20, 0.35)');
            grad.addColorStop(0.5, 'rgba(30, 24, 20, 0.15)');
            grad.addColorStop(1, 'rgba(30, 24, 20, 0)');
            sctx.fillStyle = grad;
            sctx.fillRect(0, 0, 256, 256);
        }
        const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
        const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
        const shadowMat = new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            opacity: 0.7,
            depthWrite: false
        });
        const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
        shadowMesh.rotation.x = -Math.PI / 2;
        shadowMesh.position.y = -2.6;
        scene.add(shadowMesh);

        // Rotation & Physics States
        let targetRotationY = -0.35; // Default aesthetic 3D angle
        let targetRotationX = 0.08;
        let currentRotationY = -0.35;
        let currentRotationX = 0.08;

        let mouseX = 0;
        let mouseY = 0;
        let isPointerDown = false;
        let startPointerX = 0;
        let startPointerY = 0;
        let startRotationY = 0;
        let startRotationX = 0;

        // Pointer Event Handlers
        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            isPointerDown = true;
            setIsDragging(true);
            setHasInteracted(true);
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            startPointerX = clientX;
            startPointerY = clientY;
            startRotationY = targetRotationY;
            startRotationX = targetRotationX;
        };

        const onPointerMove = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

            if (isPointerDown) {
                const deltaX = clientX - startPointerX;
                const deltaY = clientY - startPointerY;
                targetRotationY = startRotationY + deltaX * 0.012;
                targetRotationX = Math.max(-0.6, Math.min(0.6, startRotationX + deltaY * 0.01));
            } else {
                // Subtle cursor parallax when hovering
                const rect = container.getBoundingClientRect();
                const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
                const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
                mouseX = normX;
                mouseY = normY;
                targetRotationY = -0.35 + normX * 0.35;
                targetRotationX = 0.08 - normY * 0.25;

                // Move specular gleam light opposite cursor
                gleamLight.position.x = normX * 2.5;
                gleamLight.position.y = normY * 2.5 + 1;
            }
        };

        const onPointerUp = () => {
            isPointerDown = false;
            setIsDragging(false);
        };

        container.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);

        container.addEventListener('touchstart', onPointerDown, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchend', onPointerUp);

        // Animation Loop
        let animationFrameId: number;
        let clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            // Smooth Interpolation (Damping)
            currentRotationY += (targetRotationY - currentRotationY) * 0.07;
            currentRotationX += (targetRotationX - currentRotationX) * 0.07;

            // Idle floating motion
            const floatOffset = Math.sin(elapsed * 1.6) * 0.08;
            bookGroup.position.y = floatOffset;
            shadowMesh.scale.setScalar(1 - floatOffset * 0.4);

            bookGroup.rotation.y = currentRotationY;
            bookGroup.rotation.x = currentRotationX;

            renderer.render(scene, camera);
        };

        animate();

        // Responsive Resize Handler
        const handleResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousedown', onPointerDown);
            window.removeEventListener('mousemove', onPointerMove);
            window.removeEventListener('mouseup', onPointerUp);
            container.removeEventListener('touchstart', onPointerDown);
            window.removeEventListener('touchmove', onPointerMove);
            window.removeEventListener('touchend', onPointerUp);
            renderer.dispose();
            geometry.dispose();
            materials.forEach((m) => m.dispose());
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [coverImage, title, author, spineColor]);

    return (
        <div
            className="relative w-full h-[450px] sm:h-[520px] flex items-center justify-center select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/50 via-rose-100/30 to-transparent rounded-3xl blur-2xl pointer-events-none -z-10" />

            {/* Three.js Canvas Container */}
            <div
                ref={mountRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Interactive Badge Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-sm text-[11px] font-mono text-stone-600 pointer-events-none transition-opacity duration-300">
                <span className="w-2 h-2 rounded-full bg-crimson-700 animate-ping" />
                <span className="font-semibold text-stone-900">
                    {isDragging ? 'Rotating 3D Volume' : 'Drag to Rotate 3D Book'}
                </span>
                <span className="text-stone-400">· 360°</span>
            </div>
        </div>
    );
}
