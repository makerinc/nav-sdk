import React from 'react'
import { Renderer } from '../../src/index'
import { mockProducts } from './mock'


export const DataLayer = () => {
	return <>
		{mockProducts.map((product) =>
			<Renderer key={product.id} UUID={"product-card"} data={product} fallback={<div>No component found for UUID: product-card</div>} />
		)}
	</>
}