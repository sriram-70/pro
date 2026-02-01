import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['var(--font-inter-tight)', 'sans-serif'],
                mono: ['var(--font-jetbrains)', 'monospace'],
            },
            colors: {
                // Morning Palette
                peach: '#FFD1B3',
                lavender: '#E6E6FA',
                // Noon Palette
                cyan: '#00F0FF',
                chrome: '#FFFFFF',
                // Sunset Palette
                magma: '#FF2A00',
                void: '#2A0033',
            },
        },
    },
    plugins: [],
};

export default config;
