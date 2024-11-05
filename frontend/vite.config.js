import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico',"apple-touc-icon.png","masked-icon.png"],
      manifest: {
        name: 'Book Review',
        short_name: 'Book Review',
        start_url: '/',
        description:"An app that can show quality of book through comment and ratings.",
        display: 'standalone',
        background_color: '#ffffff', 
        theme_color: '#000000',       
        icons: [
          {
            src: '/icons/icon-16x16.png', 
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: '/icons/icon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: '/icons/icon-192x192.png',  
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',  
            sizes: '512x512',
            type: 'image/png'
          }

        ]
      }
    })
  ]
});
