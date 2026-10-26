import { useTheme } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useRef } from 'react'
import { configStore } from 'stores'

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

type TurnstileApi = {
	render: (container: HTMLElement, options: Record<string, unknown>) => string
	remove: (widgetId: string) => void
}

declare global {
	interface Window {
		turnstile?: TurnstileApi
	}
}

let scriptPromise: Promise<TurnstileApi> | undefined

// the script is shared by all widgets: Turnstile warns when its api.js is loaded more than once
const loadScript = (): Promise<TurnstileApi> => {
	if (!scriptPromise) {
		scriptPromise = new Promise((resolve, reject) => {
			const script = document.createElement('script')
			script.src = SCRIPT_URL
			script.async = true
			script.onload = () =>
				window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile is missing'))
			script.onerror = () => {
				// allow a retry on the next mount, e.g. after the connection comes back
				scriptPromise = undefined
				script.remove()
				reject(new Error('Failed to load Turnstile'))
			}
			document.head.appendChild(script)
		})
	}

	return scriptPromise
}

type Props = {
	siteKey: string
	onToken: (token: string | undefined) => void
}

/**
 * Cloudflare Turnstile widget. Its token is single-use, so the parent should remount the widget
 * (change its `key`) after every login attempt.
 */
const Turnstile: React.FC<Props> = observer(({ siteKey, onToken }) => {
	const container = useRef<HTMLDivElement>(null)
	const onTokenRef = useRef(onToken)
	const mode = useTheme().palette.mode
	const { language } = useContext(configStore)

	// a new callback from the parent must not re-render the widget, which would drop its token
	useEffect(() => {
		onTokenRef.current = onToken
	}, [onToken])

	useEffect(() => {
		let widgetId: string | undefined
		let unmounted = false

		loadScript()
			.then(turnstile => {
				if (unmounted || !container.current) return

				widgetId = turnstile.render(container.current, {
					sitekey: siteKey,
					theme: mode,
					language,
					// the login card is narrower than the 300px of the normal size
					size: 'compact',
					callback: (token: string) => onTokenRef.current(token),
					'expired-callback': () => onTokenRef.current(undefined),
					'error-callback': () => onTokenRef.current(undefined)
				})
			})
			.catch(err => console.error(err))

		return () => {
			unmounted = true
			if (widgetId) window.turnstile?.remove(widgetId)
			onTokenRef.current(undefined)
		}
	}, [siteKey, mode, language])

	return <div ref={container} />
})

export default Turnstile
