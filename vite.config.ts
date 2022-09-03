import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "/favicon.ico",
                "/apple-touch-icon.png",
                "/safari-pinned-tab.svg",
            ],
            manifest: {
                name: "Bibliomar",
                short_name: "Bibliomar",
                description:
                    "Sua suíte completa de leitura: pesquise, baixe e leia livros gratuitamente.",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
                background_color: "#ffffff",
                start_url: "https://bibliomar.site",
                display: "standalone",
                orientation: "portrait",
            },
        }),
    ],
});
