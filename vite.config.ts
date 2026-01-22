import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: 'es2020',
    minify: 'terser',
    cssMinify: true,
<<<<<<< HEAD
    sourcemap: true, // Requested for debugging/PSI
    terserOptions: {
      compress: {
        drop_console: false,
=======
    sourcemap: false, // Disabled for production performance
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
        pure_funcs: ['console.log', 'console.info'],
>>>>>>> 7a5998c0dbaea2a458f8c2449618e062d9c1a814
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core - smallest possible chunk
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('node_modules/react/')) {
            return 'react';
          }
          // Framer Motion - lazy loaded with Hero
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          // Radix UI components - lazy loaded
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          // tRPC and tanstack - only for authenticated pages
          if (id.includes('@trpc') || id.includes('@tanstack')) {
            return 'data-layer';
          }
          // Lucide icons - tree shake automatically
          if (id.includes('lucide-react')) {
            return 'icons';
          }
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
