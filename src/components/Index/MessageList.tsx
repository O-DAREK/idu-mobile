import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'

const SkeletonMessagePreview = () => (
	<Grid spacing={2} alignItems="center" container>
		<Grid xs="auto" item>
			<Skeleton variant="circle" height={40} width={40} />
		</Grid>
		<Grid xs={true} item>
			<Grid direction="column" container>
				<Grid spacing={2} container>
					<Grid xs={2} item>
						<Skeleton height={6} />
					</Grid>
					<Grid xs={6} item>
						<Skeleton height={6} />
					</Grid>
				</Grid>
				<Grid spacing={2} alignItems="center" container>
					<Grid xs={1} item>
						<Skeleton height={10} />
					</Grid>
					<Grid xs={8} item>
						<Skeleton height={6} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</Grid>
)

const MessageList: React.FC = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setLoading(false), 50000)
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
