/** @type {import('next').NextConfig} */
import basePath from "./environment.mjs"

const nextConfig = {
    output: 'export',
    basePath: basePath,

    images: {
        unoptimized: true
    }
}

export default nextConfig;
