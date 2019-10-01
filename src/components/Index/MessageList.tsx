import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'

const SkeletonMessagePreview = () => (
	<>
		<Skeleton variant="circle" width={40} height={40} />
		<Skeleton width="60%" height={6} /> • <Skeleton width="30%" height={6} /> <br />
		<Skeleton width="80%" height={6} /> • <Skeleton width="10%" height={6} />
	</>
)

const MessageList: React.FC = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setLoading(false), 5000)
	}, [])

	return loading ? (
		<>
			{new Array(5).fill(null).map((_, i) => (
				<SkeletonMessagePreview key={i} />
			))}
		</>
	) : (
		<>loaded</>
	)
}

export default MessageList
