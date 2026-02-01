'use client';

export default function Footer() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-8">
            {/* CTA */}
            <div className="text-center mb-16">
                <h2 className="text-[10vw] lg:text-[8vw] font-display font-black mb-8 tracking-tight">
                    INITIATE_HANDSHAKE
                </h2>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 px-8 py-4 rounded-full inline-block hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <a href="mailto:hello@teja.dev" className="font-mono text-xl">
                        hello@teja.dev
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <p className="font-mono text-sm text-white/50">
                    EXIT CODE: 0 (SUCCESS)
                </p>
            </div>
        </section>
    );
}
