import { ReactElement } from 'react'

export const useRegisterer = (component: ReactElement, UUID: string) => {
	console.log('registered component', UUID, component)

	return component;
}