'use client';

import dynamic from 'next/dynamic';
import HUD from '@/components/ui/HUD';
import Hero from '@/components/ui/Hero';
import About from '@/components/ui/About';
import Works from '@/components/ui/Works';
import Services from '@/components/ui/Services';
import Footer from '@/components/ui/Footer';

// Dynamically import Scene with SSR disabled (R3F doesn't work with SSR)
const Scene = dynamic(() => import('@/components/3d/Scene'), {
    ssr: false,
});

export default function Home() {
    return (
        <>
            {/* Fixed 3D Background */}
            <Scene />

            {/* Fixed HUD Overlay */}
            <HUD />

            {/* Scrollable HTML Content */}
            <main className="relative w-full z-10">
                <div className="min-h-[150vh]"><Hero /></div>
                <div className="min-h-[150vh]"><About /></div>
                <div className="min-h-[150vh]"><Works /></div>
                <div className="min-h-[150vh]"><Services /></div>
                <div className="min-h-[150vh]"><Footer /></div>
            </main>
        </>
    );
}
