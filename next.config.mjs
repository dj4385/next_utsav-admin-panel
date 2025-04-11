/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.com"
            },
            {
                protocol: "https",
                hostname: "utsav-kestone-public.s3.amazonaws.com"
            },
            {
                protocol: "https",
                hostname: "utsav-kestone-public.s3.ap-south-1.amazonaws.com"
            },
            {
                protocol: "https",
                hostname: "www.kestoneutsav.com"
            },
            {
                protocol: "https",
                hostname: "utsav-kestone-public.s3.amazonaws.com"
            }
        ]
    },
    reactStrictMode: false
};



export default nextConfig;
