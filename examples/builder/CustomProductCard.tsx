import { Product, registry } from '../../index';
import React from '../../react';

type Props = {
	data: Product;
}

export const Component = (props: Props) => {
	let [state, setState] = React.useState(0);

	const handleClick = () => {
		setState(state + 1);
	};

	return (
		<div>
			<div>
				{props.data.name}
			</div>
			<button onClick={handleClick}>Clicked {state} times</button>
		</div>
	)
}

registry.register('product', "my-custom-product-card", Component);
