import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/intercity': {
          target: 'http://localhost:3002',
          changeOrigin: true
        }
      }
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        // Inline workbox runtime to avoid network dependency
        injectRegister: 'auto',
        manifest: {
          name: 'কই যাবো',
          short_name: 'কই যাবো',
          description: 'Find Dhaka bus routes instantly! Real-time tracking & Metro Rail guide.',
          theme_color: '#006a4e',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: 'icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2,ttf}'],
          navigateFallback: 'index.html',
          navigateFallbackDenylist: [/^\/api/, /^\/intercity/],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          // Inline the workbox runtime instead of loading from CDN
          mode: 'production',
          sourcemap: false,
          runtimeCaching: [
            // Tailwind CSS CDN - Critical for offline styling
            {
              urlPattern: /^https:\/\/cdn\.tailwindcss\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'tailwind-cdn-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            // Google Fonts Stylesheets
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            // Google Fonts Files
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            // AI Studio CDN (React, Lucide, etc.)
            {
              urlPattern: /^https:\/\/aistudiocdn\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'aistudio-cdn-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: false
        }
      })
    ],
    publicDir: 'public',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      emptyOutDir: true,
      rollupOptions: {
        external: ['react', 'react-dom', 'react-dom/client', 'lucide-react', '@google/genai'],
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        },
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY_1': JSON.stringify(env.GEMINI_API_KEY_1 || env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY_2': JSON.stringify(env.GEMINI_API_KEY_2 || ''),
      'process.env.GEMINI_API_KEY_3': JSON.stringify(env.GEMINI_API_KEY_3 || ''),
      'process.env.GEMINI_API_KEY_4': JSON.stringify(env.GEMINI_API_KEY_4 || ''),
      'process.env.GEMINI_API_KEY_5': JSON.stringify(env.GEMINI_API_KEY_5 || '')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
