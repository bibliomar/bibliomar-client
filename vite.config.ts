// noinspection AllyPlainJsInspection

import { build, defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { dependencies } from "./package.json";

function renderChunks(deps: Record<string, string>) {
    const chunks = {};
    Object.keys(deps).forEach((key) => {
        if (["react", "react-router-dom", "react-dom"].includes(key)) return;
        chunks[key] = [key];
    });
    return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                cleanupOutdatedCaches: true,
            },
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
                display: "standalone",
                orientation: "portrait",
            },
        }),
    ],
});
