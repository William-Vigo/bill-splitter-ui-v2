import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/split-bill",
                destination: "http://localhost:8080/split-bill",
            },
        ]
    },
}

export default nextConfig
