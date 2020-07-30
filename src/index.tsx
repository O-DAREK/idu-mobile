import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { metaStore } from 'stores'
import * as serviceWorker from './serviceWorker'

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

ReactDOM.render(
	<Suspense fallback={<Loading />}>
		<App />
	</Suspense>,
	document.getElementById('root')
)

serviceWorker.register({
	onUpdate(registration) {
		// hacky way to access the context
		// Nothing will be actually rendered
		ReactDOM.render(
			<metaStore.Consumer>{s => <>{s.theresAnUpdate()}</>}</metaStore.Consumer>,
			document.createElement('noop')
		)
		// inform workbox to skip waiting, update will be applied after a refresh
		registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
	}
})

ReactGA.initialize('UA-2140149-14')
