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

        // Create GSAP timeline linked to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5, // Liquid physics feel
                invalidateOnRefresh: true,
            },
        });

        // --- S-CURVE ORBITAL PATH ---
        // Phase 1: Hero -> About (Morning Rise)
        tl.to(sunGroupRef.current.position, {
            x: 4, y: 1, z: 0,
            duration: 1, ease: 'power2.inOut'
        }, 0)

            // Phase 2: About -> Works (Deep Space Swing)
            .to(sunGroupRef.current.position, {
                x: -4, y: 0, z: 2,
                duration: 1, ease: 'power2.inOut'
            }, 1)

            // Phase 3: Works -> Services (Re-entry)
            .to(sunGroupRef.current.position, {
                x: 4, y: -1, z: 0,
                duration: 1, ease: 'power2.inOut'
            }, 2)

            // Phase 4: Services -> Contact (Sunset Descent)
            .to(sunGroupRef.current.position, {
                x: 0, y: -2, z: 0,
                duration: 1, ease: 'power2.inOut'
            }, 3);

        // --- ATMOSPHERE SHIFT ---
        if (bgRef.current) {
            // Initial: Void Black (#000000)

            // Phase 1: Morning Blue
            tl.to(bgRef.current, { r: 0.1, g: 0.1, b: 0.2 }, 0)

                // Phase 2: Deep Space Black
                .to(bgRef.current, { r: 0.0, g: 0.0, b: 0.0 }, 1)

                // Phase 3: Sunset Red
                .to(bgRef.current, { r: 0.2, g: 0.05, b: 0.05 }, 3);
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                {/* Dynamic Atmosphere Background */}
                <color ref={bgRef as any} attach="background" args={['#000000']} />

                {/* Ambient lighting for subtle fill */}
                <ambientLight intensity={0.2} />

                {/* Star field background */}
                <StarField />

                {/* The Sun with orbital animation */}
                <group ref={sunGroupRef}>
                    <TheSun />
                </group>
            </Canvas>
        </div>
    );
}
