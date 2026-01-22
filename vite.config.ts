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
    sourcemap: false, // Desativado para performance de produção
    terserOptions: {
      compress: {
        drop_console: false, // Mantido como false para debug, conforme manual
        drop_debugger: false,
        pure_funcs: [], // Removido console.log daqui para garantir que apareçam
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('node_modules/react/')) return 'react';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('@radix-ui')) return 'ui-vendor';
          if (id.includes('@trpc') || id.includes('@tanstack')) return 'data-layer';
          if (id.includes('lucide-react')) return 'icons';
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
