import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Replacement for `use-async-react`, which sets its "cancelled" flag on unmount and never resets
 * it, so under StrictMode (effects mount, unmount, mount) results of calls would be dropped.
 */
export default function useAsync<T extends any[], U>(promise: (...args: T) => Promise<U>) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<any>(undefined)
	const [result, setResult] = useState<U | undefined>(undefined)
	const cancelled = useRef(false)

	useEffect(() => {
		cancelled.current = false
		return () => {
			cancelled.current = true
		}
	}, [])

	const call = useCallback(
		(...args: T) => {
			setError(undefined)
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
						setError(err)
						setLoading(false)
					}
				})
		},
		[promise]
	)

	return { call, result, loading, error }
}
