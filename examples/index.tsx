import React from 'react'
import ReactDOM from 'react-dom'
import { CustomProductCard } from './builder/CustomProductCard.tsx'
import { CustomProductCard2 } from './builder/CustomProductCard2.tsx'
import { DataLayer } from './consumer/DataLayer.tsx'

ReactDOM.render(
	<React.StrictMode>
		<DataLayer />
		<CustomProductCard />
		<CustomProductCard2 />
	</React.StrictMode>,
	document.getElementById('root')
)
