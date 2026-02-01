'use client';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative px-8">
            {/* Main Title - Stacked Vertically */}
            <div className="text-center">
                <h1 className="text-[12vw] font-display font-black leading-[0.85] tracking-tighter">
                    CONSOLE
                </h1>
                <h1 className="text-[12vw] font-display font-black leading-[0.85] tracking-tighter">
                    LOGS
                </h1>
            </div>

            {/* Subtitle */}
            <p className="text-[3vw] font-display font-light mt-8 tracking-wide">
                BY TEJA
            </p>

            {/* Floating Tag */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 px-6 py-3 rounded-full">
                    <p className="font-mono text-sm text-white/70">
                        v.2026.1 // SYSTEM_READY
                    </p>
                </div>
            </div>
        </section>
    );
}
