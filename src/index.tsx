import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { metaStore } from 'stores'
import { registerSW } from 'virtual:pwa-register'

const App = lazy(() => import('App'))

const Loading = () => {
	const ballsCount = 5
	const ballsRadius = 7
	const amplitude = 10

	const Ball: React.FC<{ delay: number }> = ({ delay }) => (
		<div
			style={{
				width: ballsRadius * 2,
				height: ballsRadius * 2,
				borderRadius: ballsRadius,
				transform: `translateY(-${amplitude}px)`,
				display: 'inline-block',
				animation: `0.5s ease-in-out ${-delay}s infinite alternate wave`,
				backgroundColor: '#768294'
			}}
		/>
	)

	return (
		<>
			<style
				children={`@keyframes wave {
					0% {
						transform: translateY(-${amplitude}px);
					}
					100% {
						transform: translateY(${amplitude}px);
					}
				}`}
			/>
			<div
				style={{
					display: 'inline-block',
					position: 'fixed',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					width: ballsCount * ballsRadius * 2,
					height: amplitude * 2 + ballsRadius,
					margin: 'auto'
				}}
			>
				{[...new Array(ballsCount)].map((_, i) => (
					<Ball key={i} delay={i * 0.3} />
				))}
			</div>
		</>
	)
}

const render = () =>
	ReactDOM.render(
		<Suspense fallback={<Loading />}>
			<App />
		</Suspense>,
		document.getElementById('root')
	)

// the mock module is only bundled when VITE_MOCK_API=true at build time
if (import.meta.env.VITE_MOCK_API === 'true') {
	import('mocks').then(({ installMockApi }) => {
		installMockApi()
		render()
	})
} else {
	render()
}

if (import.meta.env.PROD) {
	registerSW({
		// the plugin reloads the page once the new worker takes control; the update should instead
		// be applied silently on the next visit, so do nothing here
		onNeedReload() {},
		onNeedRefresh() {
			// hacky way to access the context
			// Nothing will be actually rendered
			ReactDOM.render(
				<metaStore.Consumer>{s => <>{s.theresAnUpdate()}</>}</metaStore.Consumer>,
				document.createElement('noop')
			)
			// inform workbox to skip waiting, update will be applied after a refresh
			navigator.serviceWorker.getRegistration().then(registration => {
				registration?.waiting?.postMessage({ type: 'SKIP_WAITING' })
			})
		}
	})
}
