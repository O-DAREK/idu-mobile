import React from 'react'
import { useParams } from 'react-router'
import NewsList from './NewsList'
import SpecificNews from './SpecificNews'

interface Params {
	id?: string
}

const News = () => {
	const { id } = useParams<Params>()

	return id ? <SpecificNews id={Number(id)} /> : <NewsList />
}

export default News
