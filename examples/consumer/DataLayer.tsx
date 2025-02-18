import React from 'react'
import { ContentProvider, Renderer } from '../../src/index'
import { mockProducts } from './mock'


export const DataLayer = () => {
	return <>
		{mockProducts.map((product) => <ContentProvider key={product.id} product={product}>
			<Renderer UUID={Math.random() > 0.5 ? "product-card" : "product-card-2"} data={product} />
		</ContentProvider>)}
	</>
}