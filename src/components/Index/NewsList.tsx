import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'

const SkeletonNewsPreview = () => (
	<Grid direction="column" container>
		<Grid spacing={2} container>
			<Grid xs={4} item>
				<Skeleton height={6} />
			</Grid>
			<Grid xs={3} item>
				<Skeleton height={6} />
			</Grid>
		</Grid>
		<Grid container>
			<Grid xs={12} item>
				<Skeleton height={6} />
			</Grid>
		</Grid>
	</Grid>
)

const NewsList: React.FC = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setLoading(false), 50000)
	}, [])

	return loading ? (
		<>
			{new Array(5).fill(null).map((_, i) => (
				<SkeletonNewsPreview key={i} />
			))}
		</>
	) : (
		<>loaded</>
	)
}

export default NewsList
