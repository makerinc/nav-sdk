import React from 'react'
import { registry } from "../../src/util/registry";
import { Product } from '../../src/types';

type Props = {
	data: Product;
}

export const Component = (props: Props) => {
	return (
		<div>
			<div>
				{props.data.name}
			</div>
			<div>
				{props.data.variants[0].price}
			</div>
			<button>Add To Cart</button>
		</div>
	)
}

registry.register('product', "my-custom-product-card", Component);
