import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from "fs";

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),

    ],
    server: {
        https: {
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.crt'),
        },
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        cors: true,
        hmr: {
            host: '192.168.1.7',
        },
      }
});
