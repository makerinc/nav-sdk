import { useContext } from 'react'
import { Category, Product, ContextState } from '../types/index'
import { ContentContext } from '../context/ContentContext'

export const useContent = (): ContextState => {
	const context = useContext(ContentContext);
	if (context === undefined) {
		throw new Error('useContent must be used within a ContentProvider');
	}
	return context;
};

export let useCategory = (): Category | null => {
	let { content } = useContent()

	if (content.type === 'category') {
		return content.data
	}

	return null
}

export let useProduct = (): Product | null => {
	let { content } = useContent()

	if (content.type === 'product') {
		return content.data
	}

	return null
}