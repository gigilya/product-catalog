import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination:
                    'https://maxifoxy-testfront-96b4.twc1.net/api/:path*',
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ohotaktiv.ru',
                port: '',
                pathname: '/upload/**',
            },
        ],
    },
};

export default nextConfig;
