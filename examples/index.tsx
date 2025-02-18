import React from 'react'
import ReactDOM from 'react-dom'
import { CustomProductCard } from './builder/CustomProductCard.tsx'
import { DataLayer } from './showside/DataLayer.tsx'

ReactDOM.render(
	<React.StrictMode>
		<DataLayer />
		<CustomProductCard />
	</React.StrictMode>,
	document.getElementById('root')
)
