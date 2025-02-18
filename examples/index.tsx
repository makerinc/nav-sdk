import React from 'react'
import ReactDOM from 'react-dom'
import { CustomProductCard } from './builder/CustomProductCard.tsx'
import { DataLayer } from './consumer/DataLayer.tsx'

ReactDOM.render(
	<React.StrictMode>
		<CustomProductCard />
		<DataLayer />
	</React.StrictMode>,
	document.getElementById('root')
)
