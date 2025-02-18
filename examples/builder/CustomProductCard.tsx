import React from 'react'
import { RegisteredComponent } from '../../src/index'

export default () => {
	return (
		<RegisteredComponent contentType='product' componentId="product-card">
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
					</div>
				)
			}}
		</RegisteredComponent>
	)
}