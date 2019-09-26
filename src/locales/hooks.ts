import { strings } from 'locales'
import { autorun } from 'mobx'
import { useContext, useEffect, useState } from 'react'
import { configStore } from 'stores'

export const useLocale = () => {
	const config = useContext(configStore)
	const [lang, setLang] = useState(config.language)

	useEffect(
		() => autorun(() => setLang(config.language)),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	let currStrings = Object.keys(strings).reduce(
		(prev, curr) => {
			if (strings.hasOwnProperty(curr)) {
				const key = curr as keyof typeof strings
				prev[key] = strings[key][lang]
			}
			return prev
		},
		{} as { [key in keyof typeof strings]: string }
	)

	return currStrings
}
