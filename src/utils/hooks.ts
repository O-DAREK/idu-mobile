import { useCallback, useEffect, useRef, useState } from 'react'

export function usePromise<T extends any[], U>(
	promise: (...args: T) => Promise<U>
): [(...args: T) => void, U | undefined, boolean, any] {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [result, setResult] = useState<U>()
	const cancelled = useRef(false)

	useEffect(
		() => () => {
			cancelled.current = true
		},
		[]
	)

	const callPromise = useCallback(
		(...args: T) => {
			setError(null)
			setResult(undefined)
			setLoading(true)
			promise(...args)
				.then(res => {
					if (!cancelled.current) {
						setResult(res)
						setLoading(false)
					}
				})
				.catch(err => {
					if (!cancelled.current) {
						console.log('got error', { cancelled, err })
						setError(err)
						setLoading(false)
					}
				})
		},
		[promise, cancelled]
	)

	return [callPromise, result, loading, error]
}
