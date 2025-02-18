import React from 'react'
import ReactDOM from 'react-dom'
import { Renderer, RemoteComponent } from '../../src/index'
import { mockProducts } from './mock'

ReactDOM.render(
	<React.StrictMode>
		{mockProducts.map((product) =>
			<Renderer key={product.id} componentId={"product-card"} data={product} fallback={<div>No component found for componentId: product-card</div>} />
		)}
		<RemoteComponent url="/examples/builder/CustomProductCard.js" />
	</React.StrictMode>,
	document.getElementById('root')
)
