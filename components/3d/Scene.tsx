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

    useEffect(() => {
        if (!sunGroupRef.current) return;

        // Create GSAP timeline linked to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5, // Smooth scrubbing
                invalidateOnRefresh: true,
            },
        });

        // Define orbital positions for each section
        // Hero: Center (0, 0, 0)
        // About: Right (4, 1, 0)
        // Works: Left (-4, 0, 0)
        // Services: Right (4, -1, 0)
        // Contact: Center/Down (0, -2, 0)

        tl.to(sunGroupRef.current.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: 'none',
        })
            .to(sunGroupRef.current.position, {
                x: 4,
                y: 1,
                z: 0,
                duration: 1,
                ease: 'power2.inOut',
            })
            .to(sunGroupRef.current.position, {
                x: -4,
                y: 0,
                z: 0,
                duration: 1,
                ease: 'power2.inOut',
            })
            .to(sunGroupRef.current.position, {
                x: 4,
                y: -1,
                z: 0,
                duration: 1,
                ease: 'power2.inOut',
            })
            .to(sunGroupRef.current.position, {
                x: 0,
                y: -2,
                z: 0,
                duration: 1,
                ease: 'power2.inOut',
            });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>

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
