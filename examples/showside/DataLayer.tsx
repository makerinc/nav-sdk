import React from 'react'
import { ContentProvider, Renderer } from '../../src/index'
import { mockProducts } from './mock'


export const DataLayer = () => {
	return <>
		{mockProducts.map((product) => <ContentProvider key={product.id} product={product}>
			<Renderer UUID={"product-card"} data={product} />
		</ContentProvider>)}
	</>
}