import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    build: {
        outDir: '../server/public', // Output directory for the built frontend
        emptyOutDir: true, // Ensure the output directory is empty before building
    },
    server: {
        port: 5173, // Default Vite dev server port
        proxy: {
            '/api/auth': {
                target: 'http://localhost:8080', // Proxy API requests to the backend
                changeOrigin: true,
            },
        },
    },
});