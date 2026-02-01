'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useScrollStore } from '@/hooks/useScrollStore';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Update scroll store
        lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
            const progress = Math.min(Math.max(scroll / limit, 0), 1);
            useScrollStore.getState().setScrollProgress(progress);
            useScrollStore.getState().setScrollY(scroll);
        });

        // Animation loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
