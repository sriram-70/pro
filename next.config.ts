import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

    webpack: (config) => {
        // Add GLSL shader support using webpack 5 asset modules
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            type: 'asset/source',
        });

        return config;
    },
};

export default nextConfig;
