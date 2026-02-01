'use client';

export default function About() {
    return (
        <section className="min-h-screen flex items-center px-8 lg:px-16">
            {/* Text anchored left, w-1/2 */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-[8vw] lg:text-[6vw] font-display font-black mb-8 tracking-tight">
                    KERNEL_PANIC?
                </h2>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl">
                    <p className="text-xl lg:text-2xl font-display font-light leading-relaxed text-white/90">
                        No. Just controlled chaos. I am a <span className="text-cyan font-semibold">Vibe Coder</span> who
                        translates <span className="italic">'what if'</span> into <span className="italic">'here it is'</span>.
                        Bridging the gap between raw engineering and organic fluid motion.
                    </p>
                </div>
            </div>

            {/* Visual whitespace on right */}
            <div className="hidden lg:block w-1/2" />
        </section>
    );
}
