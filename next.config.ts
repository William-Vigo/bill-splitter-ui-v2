import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: "standalone",
    async rewrites() {
        return [
            {
                source: "/api/split-bill",
                destination: "http://bill-splitter:8080/split-bill",
            },
        ]
    },
}

export default nextConfig
