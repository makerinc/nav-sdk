import React from 'react'
import ReactDOM from 'react-dom'
import { DataLayer } from './showside/DataLayer.tsx'
import { RemoteComponent } from '../src/components/RemoteComponent.tsx'

ReactDOM.render(
	<React.StrictMode>
		<DataLayer />
		<RemoteComponent url="/examples/builder/CustomProductCard.js" />
	</React.StrictMode>,
	document.getElementById('root')
)
