'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TheSun from './TheSun';
import StarField from './StarField';
import * as THREE from 'three';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Scene() {
    const sunGroupRef = useRef<THREE.Group>(null);
    const bgRef = useRef<THREE.Color>(null);

    useEffect(() => {
        if (!sunGroupRef.current) return;

        // MASTER TIMELINE: Sunrise -> Sunset
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2.5, // "Water Flow" physics (Heavy Damping)
                invalidateOnRefresh: true,
            },
        });

        // --- PHASE 1: THE AWAKENING (Hero -> About) ---
        // Vibe: Darkness Killing Light -> First Ray
        // Move: Center -> Right (Orbiting)
        // Rotate: 0 -> -2 (Rolling Forward)
        // Color: Deep Blue (#0F172A) -> Morning Haze (#334155)

        tl.to(sunGroupRef.current.position, { x: 7, y: 0, z: 0, duration: 1, ease: 'power2.inOut' }, 0)
            .to(sunGroupRef.current.rotation, { x: -2, duration: 1, ease: 'power2.inOut' }, 0)
            .to(bgRef.current!, { r: 0.2, g: 0.25, b: 0.33 }, 0); // #334155 (Slate-700) roughly


        // --- PHASE 2: HIGH NOON (About -> Works) ---
        // Vibe: Peak Intensity, Contrast
        // Move: Right -> Left (Cross Over)
        // Rotate: -2 -> -4
        // Color: Morning Haze -> Void Black (#000000) for contrast

        tl.to(sunGroupRef.current.position, { x: -7, y: 0, z: 2, duration: 1, ease: 'power2.inOut' }, 1)
            .to(sunGroupRef.current.rotation, { x: -4, duration: 1, ease: 'power2.inOut' }, 1)
            .to(bgRef.current!, { r: 0.0, g: 0.0, b: 0.0 }, 1);


        // --- PHASE 3: AFTERNOON GLOW (Works -> Services) ---
        // Vibe: Warmth returning
        // Move: Left -> Right (Return)
        // Rotate: -4 -> -6
        // Color: Void -> Deep Purple/Orange hint (#2E1065)

        tl.to(sunGroupRef.current.position, { x: 7, y: 0, z: 0, duration: 1, ease: 'power2.inOut' }, 2)
            .to(sunGroupRef.current.rotation, { x: -6, duration: 1, ease: 'power2.inOut' }, 2)
            .to(bgRef.current!, { r: 0.18, g: 0.06, b: 0.4 }, 2); // #2E1065 approx


        // --- PHASE 4: GOLDEN HOUR FINALE (Services -> Contact) ---
        // Vibe: The Setting Sun
        // Move: Right -> Center Down (Setting)
        // Rotate: -6 -> -8
        // Color: Purple -> Fiery Red (#7F1D1D)

        tl.to(sunGroupRef.current.position, { x: 0, y: -2, z: 0, duration: 1, ease: 'power2.inOut' }, 3)
            .to(sunGroupRef.current.rotation, { x: -8, duration: 1, ease: 'power2.inOut' }, 3)
            .to(bgRef.current!, { r: 0.5, g: 0.11, b: 0.11 }, 3); // #7F1D1D


        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
                {/* FOV reduced for cinematic flatness */}

                {/* Dynamic Atmosphere Background - Start: Void Blue */}
                <color ref={bgRef as any} attach="background" args={['#0F172A']} />

                <ambientLight intensity={0.5} />
                <StarField />

                <group ref={sunGroupRef}>
                    <TheSun />
                </group>
            </Canvas>
        </div>
    );
}
