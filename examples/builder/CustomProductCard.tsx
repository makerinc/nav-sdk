import React from 'react'
import { RegisteredComponent } from '../../src/index'

export const Component = () => {
	return (
		<RegisteredComponent contentType='product' componentId="my-custom-product-card">
			{(product) => {
				// This where all the magic happens
				return (
					<div>
						<div>
							{product.name}
						</div>
						<div>
							{product.variants[0].price}
						</div>
						<button>Add To Cart</button>
					</div>
				)
			}}
		</RegisteredComponent>
	)
}
