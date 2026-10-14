/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

interface ImportMetaEnv {
	readonly VITE_API_ROOT: string
	readonly VITE_MOCK_API?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare interface BeforeInstallPromptEvent extends Event {
	/**
	 * Returns an array of DOMString items containing the platforms on which the event was dispatched.
	 * This is provided for user agents that want to present a choice of versions to the user such as,
	 * for example, "web" or "play" which would allow the user to chose between a web version or
	 * an Android version.
	 */
	readonly platforms: Array<string>

	/**
	 * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
	 */
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed'
		platform: string
	}>

	/**
	 * Allows a developer to show the install prompt at a time of their own choosing.
	 * This method returns a Promise.
	 */
	prompt(): Promise<void>
}

// TS 4.9 (moduleResolution node) can't resolve vite-plugin-pwa/client via package exports;
// replace with `/// <reference types="vite-plugin-pwa/client" />` after moving to TS 5 + bundler resolution
declare module 'virtual:pwa-register' {
	export function registerSW(options?: {
		onNeedRefresh?: () => void
		onNeedReload?: () => void
		onOfflineReady?: () => void
	}): (reloadPage?: boolean) => Promise<void>
}
