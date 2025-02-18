import React from 'react'
import { RegisteredComponent } from '../../src/index'

export const CustomProductCard2 = () => {
	return (
		<RegisteredComponent contentType='product' UUID="product-card-2">
			{(product) => {
				return (
					<div>
						<div>
							{product.variants[0].price}
						</div>
						<div>
							{product.name}
						</div>
					</div>
				)
			}}
		</RegisteredComponent>
	)
}