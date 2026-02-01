'use client';

const services = [
    {
        id: 'fn.01',
        name: 'Full Stack Engineering',
        description: 'End-to-end application development with modern frameworks',
    },
    {
        id: 'fn.02',
        name: 'WebGL Experiences',
        description: 'Custom shaders, 3D interactions, and immersive visuals',
    },
    {
        id: 'fn.03',
        name: 'Technical Strategy',
        description: 'Architecture planning, performance optimization, and scalability',
    },
];

export default function Services() {
    return (
        <section className="min-h-screen flex items-center px-8 lg:px-16">
            {/* List anchored left */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-[8vw] lg:text-[6vw] font-display font-black mb-12 tracking-tight">
                    AVAILABLE_FUNCTIONS()
                </h2>

                {/* Services List */}
                <div className="space-y-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="backdrop-blur-md bg-white/[0.02] border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-6">
                                <span className="font-mono text-cyan text-2xl font-bold shrink-0">
                                    {service.id}
                                </span>
                                <div>
                                    <h3 className="text-3xl font-display font-bold mb-2 group-hover:text-cyan transition-colors">
                                        {service.name}
                                    </h3>
                                    <p className="text-lg text-white/70">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual whitespace on right */}
            <div className="hidden lg:block w-1/2" />
        </section>
    );
}
