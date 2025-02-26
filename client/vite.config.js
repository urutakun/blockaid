import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),

    ],
    // server: {
    //     host: '192.168.1.5', // Exposes to local network
    //     port: 5173, // Default Vite port
    //     strictPort: true,
    // }
});
