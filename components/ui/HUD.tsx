'use client';

import { useEffect, useState } from 'react';

export default function HUD() {
    const [fps, setFps] = useState(60);
    const [location, setLocation] = useState('LOADING...');

    useEffect(() => {
        // Simple FPS counter
        let lastTime = performance.now();
        let frames = 0;

        const updateFPS = () => {
            frames++;
            const currentTime = performance.now();

            if (currentTime >= lastTime + 1000) {
                setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
                frames = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(updateFPS);
        };

        updateFPS();

        // Get user location (city)
        setLocation('INDIA');
    }, []);

    return (
        <>
            {/* Top Right: System Status */}
            <div className="fixed top-8 right-8 z-50">
                <div className="backdrop-blur-sm bg-black/20 border border-white/10 px-4 py-2 rounded-lg">
                    <p className="font-mono text-xs text-white/70">
                        SYS: ONLINE // {fps}FPS
                    </p>
                </div>
            </div>

            {/* Bottom Left: Location */}
            <div className="fixed bottom-8 left-8 z-50">
                <div className="backdrop-blur-sm bg-black/20 border border-white/10 px-4 py-2 rounded-lg">
                    <p className="font-mono text-xs text-white/70">
                        LOC: {location}
                    </p>
                </div>
            </div>
        </>
    );
}
