import React from 'react'
import ReactDOM from 'react-dom'
import { DataLayer } from './showside/DataLayer.tsx'
import { RemoteComponent } from '@paciolan/remote-component'

ReactDOM.render(
	<React.StrictMode>
		<DataLayer />
		<RemoteComponent url="https://raw.githubusercontent.com/makerinc/nav-sdk/refs/heads/dev/examples/builder/CustomProductCard.js" />
	</React.StrictMode>,
	document.getElementById('root')
)
