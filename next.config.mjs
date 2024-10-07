/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        esmExternals: 'loose'
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**'
        }, {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**'
        }]
    }
};

export default nextConfig;
