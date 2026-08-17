import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "RestroPro",
        short_name: "RestroPro",
        description: "Manage Your Restaurant, Cafe, Hotel, Bar, Food Truck, Stall, any food store.",
        theme_color: "#ECF1EB",
        icons: [
          {
            src: "/logo_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  // Dev server: proxy /api calls to the backend so you don't get CORS errors locally.
  // Change the target to your Railway URL when testing against production backend.
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_SOCKET_IO || "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: "dist",
  },
});
