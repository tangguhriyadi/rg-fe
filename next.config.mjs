/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rgbtest.s3.ap-southeast-1.amazonaws.com",
                port: "",
                pathname: "**",
            },
        ],
    },
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
