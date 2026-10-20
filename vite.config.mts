/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'prompt',
			// keep the URL of the CRA service worker so already installed clients can update
			filename: 'service-worker.js',
			// manifest.json is kept in public/ and linked from index.html
			manifest: false,
			injectRegister: false,
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,ico,json}'],
				navigateFallback: '/index.html'
			}
		})
	],
	resolve: { tsconfigPaths: true },
	server: { port: 3000 },
	// a different port than dev, so the production service worker never controls the dev origin
	preview: { port: 4173 },
	build: { outDir: 'build', sourcemap: true },
	test: {
		environment: 'jsdom',
		setupFiles: 'src/setupTests.ts'
	}
})
