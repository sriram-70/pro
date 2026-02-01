'use client';

const projects = [
    {
        name: 'TourneyPlus',
        description: 'Esports Architecture',
        tags: ['React', 'Node.js', 'WebSockets'],
    },
    {
        name: 'Livspace',
        description: 'Interactive Campaigns',
        tags: ['Next.js', 'Three.js', 'GSAP'],
    },
    {
        name: 'Neural',
        description: 'Financial Logic',
        tags: ['TypeScript', 'PostgreSQL', 'Redis'],
    },
];

export default function Works() {
    return (
        <section className="min-h-screen flex items-center justify-end px-8 lg:px-16">
            {/* Visual whitespace on left */}
            <div className="hidden lg:block w-1/2" />

            {/* Bento Grid anchored right, w-1/2 */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-[8vw] lg:text-[6vw] font-display font-black mb-12 tracking-tight">
                    RUNTIME_MODULES
                </h2>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`backdrop-blur-md bg-white/[0.02] border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 ${index === 0 ? 'md:col-span-2' : ''
                                }`}
                        >
                            <h3 className="text-3xl font-display font-bold mb-3">
                                {project.name}
                            </h3>
                            <p className="text-xl text-white/70 mb-6">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="font-mono text-xs px-3 py-1 bg-white/10 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
