import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ReactClient/",
  plugins: [
    react(),
    visualizer({ open: true }), // Visualizer plugin for analyzing bundle
  ],
  build: {
    sourcemap: false, // Disable source maps in production
    minify: "esbuild", // Use esbuild for minification (fast, default)
    // Or use 'terser' for more compression (but slower)
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate vendor libraries into a separate chunk
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 500, // Limit chunk size warning (in KB)
  },
  optimizeDeps: {
    // Pre-bundle dependencies to speed up development builds
    include: ["react", "react-dom"],
  },
});
