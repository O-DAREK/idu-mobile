import { useCallback, useState } from 'react'

export function usePromise<T extends any[], U>(
	promise: (...args: T) => Promise<U>
): [(...args: T) => void, U | undefined, boolean, any] {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [result, setResult] = useState<U>()

	const callPromise = useCallback(
		(...args: T) => {
			setError(null)
			setResult(undefined)
			setLoading(true)
			promise(...args)
				.then(res => {
					setResult(res)
					setLoading(false)
				})
				.catch(err => {
					setError(err)
					setLoading(false)
				})
		},
		[promise]
	)

	return [callPromise, result, loading, error]
}
