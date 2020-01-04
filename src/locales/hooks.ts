import { autorun } from 'mobx'
import { useContext, useEffect, useState } from 'react'
import { configStore } from 'stores'
import strings, { Language } from './strings'

const mappedStrings = (() => {
	type MappedStrings = { [key in keyof typeof strings]: string }
	let cacheLang: Language | undefined = undefined
	let cacheMap: MappedStrings | undefined = undefined

	return (to: Language): MappedStrings => {
		if (to !== cacheLang) {
			cacheLang = to
			cacheMap = Object.keys(strings).reduce((prev, curr) => {
				if (strings.hasOwnProperty(curr)) {
					const key = curr as keyof typeof strings
					prev[key] = strings[key][to]
				}
				return prev
			}, {} as MappedStrings)
		}

		return cacheMap!
	}
})()

export const useLocale = () => {
	const config = useContext(configStore)
	const [lang, setLang] = useState(config.language)

	useEffect(() => autorun(() => setLang(config.language)), [config.language])

	return mappedStrings(lang)
}
