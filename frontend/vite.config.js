import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["user.png", "strawberry.png"],

            manifest: {
                name: "SmultronStällen",
                short_name: "Smultron",
                descripton: "A webbsite to share hidden gems",
                start_url: "/",
                display: "standalone",
            },
            workbox: {
                runtimeCaching: [
                    {
                        // HTML / JS / CSS: NetworkFirst
                        urlPattern: /.*\.(?:html|js|css|webmanifest)$/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "assets",
                            networkTimeoutSeconds: 10,
                        },
                    },
                    {
                        // API requests: NetworkFirst
                        urlPattern: /\/api\/.*$/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "api-cache",
                            networkTimeoutSeconds: 10,
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                    {
                        // Images: CacheFirst
                        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)$/,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "images",
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 30 * 24 * 60 * 60,
                            },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                ],
            },
        }),
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://backend:3000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
