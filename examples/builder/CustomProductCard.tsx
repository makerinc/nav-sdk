import React from 'react'
import { RegisteredComponent } from '../../src/index'

export const CustomProductCard = () => {
	return (
		<RegisteredComponent contentType='product' UUID="product-card">
			{(product) => {
				return (
					<div>
						<div>
							{product.name}
						</div>
						<div>
							{product.variants[0].price}
						</div>
					</div>
				)
			}}
		</RegisteredComponent>
	)
}