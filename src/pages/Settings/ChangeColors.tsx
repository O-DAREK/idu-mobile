import { Grid, InputAdornment, TextField, Typography } from '@material-ui/core'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { configStore } from 'stores'

interface ColorInputProps {
	onChange: (val: string) => void
	label: string
	defaultValue: string
	color: 'primary' | 'secondary'
}

const ColorInput: React.FC<ColorInputProps> = ({ onChange, ...props }) => {
	const [invalid, setInvalid] = useState(false)

	return (
		<TextField
			variant="outlined"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Typography style={invalid ? { color: 'red' } : undefined}>#</Typography>
					</InputAdornment>
				)
			}}
			onChange={({ target: { value } }) => {
				if (/^[0-9a-f]{6}$/i.test(value)) {
					onChange(value)
					setInvalid(false)
				} else if (value === 'awesome') {
					const ele = document.querySelector('head > meta[name=theme-color]')

					setInterval(
						() =>
							ele?.setAttribute(
								'content',
								`#${Math.floor(Math.random() * 255 * 255 * 255).toString(16)}`
							),
						100
					)
				} else {
					setInvalid(true)
				}
			}}
			{...props}
		/>
	)
}

const ChangeColors: React.FC = observer(() => {
	const { ACCENT_COLORS, PRIMARY, SECONDARY } = useLocale()
	const config = useContext(configStore)

	return (
		<>
			<Typography gutterBottom>{ACCENT_COLORS}</Typography>
			<Grid justify="space-around" container>
				<Grid xs={4} item>
					<ColorInput
						color="primary"
						label={PRIMARY}
						defaultValue={config.accentColors[0].substring(1)}
						onChange={val => config.changePrimaryColor(`#${val}`)}
					/>
				</Grid>
				<Grid xs={4} item>
					<ColorInput
						color="secondary"
						label={SECONDARY}
						defaultValue={config.accentColors[1].substring(1)}
						onChange={val => config.changeSecondaryColor(`#${val}`)}
					/>
				</Grid>
			</Grid>
		</>
	)
})

export default ChangeColors
