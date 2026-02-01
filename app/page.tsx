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
                {/* Hero: Center */}
                <div className="h-screen flex items-center justify-center">
                    <Hero />
                </div>

                {/* About: Left (Start) */}
                <div className="min-h-screen flex items-center justify-start">
                    <About />
                </div>

                {/* Works: Right (End) */}
                <div className="min-h-screen flex items-center justify-end">
                    <Works />
                </div>

                {/* Services: Left (Start) */}
                <div className="min-h-screen flex items-center justify-start">
                    <Services />
                </div>

                {/* Footer: Center */}
                <div className="h-screen flex items-center justify-center">
                    <Footer />
                </div>
            </main>
        </>
    );
}
