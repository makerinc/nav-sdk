import React from 'react'
import { RegisteredComponent } from '../src/index'

export const ProductCard = () => {
	return (
		<RegisteredComponent contentType='product' UUID="product-card">
			{(product) => {
				return (
					<div>
						<div>
							{product.name}
						</div>
						<div>
							{product.variants[0].name}
						</div>
					</div>
				)
			}}
		</RegisteredComponent>
	)
}