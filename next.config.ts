import type { NextConfig } from 'next';
import path from 'path';
import webpack from 'webpack';

const nextConfig: NextConfig = {
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

    webpack: (config, { isServer }) => {
        // Add GLSL shader support using webpack 5 asset modules
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            type: 'asset/source',
        });

        // Force all React imports to use the same instance (client-side only)
        if (!isServer) {
            const reactPath = path.resolve('./node_modules/react');
            const reactDomPath = path.resolve('./node_modules/react-dom');

            // Use NormalModuleReplacementPlugin to redirect React imports
            config.plugins.push(
                new webpack.NormalModuleReplacementPlugin(/^react$/, reactPath),
                new webpack.NormalModuleReplacementPlugin(/^react-dom$/, reactDomPath)
            );

            // Set aliases as well
            config.resolve.alias = {
                ...config.resolve.alias,
                react: reactPath,
                'react-dom': reactDomPath,
            };
        }

        return config;
    },
};

export default nextConfig;
