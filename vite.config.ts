import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ✅ enables access via local IPs and custom hosts like *.localtest.me
    port: 5173,
    cors: true,
   allowedHosts: [
      // Add any subdomain you use here
      'localhost',
      'localtest.me',
      '.localtest.me', // allow all subdomains
      'outstanding-meal-shop.localtest.me',
      '*.localtest.me' // wildcard (some Vite versions support this)
    ],
  },
});
