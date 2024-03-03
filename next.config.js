/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
export const basePath = isProd ? '/klimadashboard-ka' : '';

const nextConfig = {
    output: 'export',
    basePath,

    images: {
        unoptimized: true
    }
}

export default nextConfig;
