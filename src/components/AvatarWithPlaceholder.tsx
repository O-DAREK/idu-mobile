import { Avatar, AvatarProps } from '@material-ui/core'
import React, { useState } from 'react'

interface Props extends Omit<AvatarProps, 'placeholder'> {
	placeholder: React.ReactElement
}

const AvatarWithPlaceholder: React.FC<Props> = ({ placeholder, ...avatarProps }) => {
	const [loading, setLoading] = useState(true)

	return (
		<>
			{loading && placeholder}
			<Avatar
				{...avatarProps}
				style={loading ? { display: 'none' } : avatarProps.style}
				imgProps={{
					onLoad: () => setLoading(false)
				}}
			/>
		</>
	)
}

export default AvatarWithPlaceholder
