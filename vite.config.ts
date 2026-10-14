import babel from '@rolldown/plugin-babel'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		// MobX 5 decorators need Babel's legacy semantics (lazy property initializers); TS-style
		// field assignment breaks enforceActions. Drop together with decorators in the MobX 6 task.
		babel({
			include: /[\\/]stores[\\/][A-Za-z]+\.ts$/,
			presets: ['@babel/preset-typescript'],
			plugins: [
				['@babel/plugin-proposal-decorators', { legacy: true }],
				['@babel/plugin-transform-class-properties', { loose: true }]
			]
		}),
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
	preview: { port: 3000 },
	build: { outDir: 'build', sourcemap: true },
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: 'src/setupTests.ts'
	}
})
