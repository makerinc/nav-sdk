import React from 'react'
import { Product, registry } from '../../index';

type Props = {
	data: Product;
}

export const Component = (props: Props) => {
	return (
		<div>
			<div>
				{props.data.name}
			</div>
		</div>
	)
}

registry.register('product', "my-custom-product-card", Component);
