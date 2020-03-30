// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import * as responses from 'constants/responses'
import { UsersSearch } from 'constants/responses'
import * as urls from 'constants/urls'
import { useLocale } from 'locales'
import React, { useContext, useEffect, useState } from 'react'
import { userStore } from 'stores'
import { useDebounce } from 'use-debounce'

interface ListOption {
	display: string
	name: string
	id: number
}

const buildOptions = (
	data: UsersSearch,
	student: string,
	parent: string,
	teacher: string
): ListOption[] =>
	data.data.map(({ id, first_name, last_name, type }) => {
		const name = `${first_name} ${last_name}`

		let extra = '('
		if (type === 0) extra += student
		else if (type === 1) extra += parent
		else if (type === 2) extra += teacher
		extra += ')'

		return {
			id,
			name,
			display: `${name} ${extra}`
		}
	})

interface Props {
	onSelect: (id: number) => void
	error?: boolean
}

const AutocompleteRecipients: React.FC<Props> = ({ onSelect, error }) => {
	const { PARENT, STUDENT, TEACHER, RECIPIENT, NO_OPTIONS, LOADING } = useLocale()
	const user = useContext(userStore)
	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [options, setOptions] = useState<ListOption[]>([])
	const [searching, setSearching] = useState(false)

	const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

	useEffect(() => {
		if (debouncedSearchTerm) {
			setSearching(true)
			;(async () => {
				const res = await fetch(urls.api.search(debouncedSearchTerm), {
					headers: {
						'X-API-TOKEN': user.token || ''
					}
				})
				const json = (await res.json()) as responses.UsersSearch

				setOptions(buildOptions(json, STUDENT, PARENT, TEACHER))
				setSearching(false)
			})()
		} else {
			setOptions([])
		}
	}, [debouncedSearchTerm, STUDENT, PARENT, TEACHER, user.token])

	return (
		<Autocomplete
			openOnFocus
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			getOptionSelected={(option, value) => option.name === value.name}
			getOptionLabel={option => option.name}
			options={options}
			loading={searching}
			loadingText={`${LOADING}...`}
			noOptionsText={NO_OPTIONS}
			onChange={(_: React.ChangeEvent<{}>, selected: ListOption | null) =>
				onSelect(selected?.id || 0)
			}
			renderOption={option => option.display}
			renderInput={params => (
				<TextField
					{...params}
					label={RECIPIENT}
					variant="outlined"
					value={searchTerm}
					error={error}
					onChange={e => setSearchTerm(e.target.value)}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{searching && <CircularProgress color="inherit" size={20} />}
								{params.InputProps.endAdornment}
							</>
						)
					}}
				/>
			)}
		/>
	)
}

export default AutocompleteRecipients
