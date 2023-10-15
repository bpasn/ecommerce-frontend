/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fakestoreapi.com"
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com"
            }
        ]
    },
    // webpack: config => {
    //     config.ignoreWarnings = [
    //         { module: /node_modules\/node-fetch\/lib\/index\.js/ },
    //         { file: /node_modules\/node-fetch\/lib\/index\.js/ },
    //     ];
    //     return config;
    // }
};

module.exports = nextConfig;
