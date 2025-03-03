import { Product, registry, NavImage, NavLink } from '../../index';
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
		<NavLink target="product" productId={props.data.id} categoryId={props.data.categoryId} href={props.data.link}>
			<div>
				<div style={{
					position: 'relative',
					aspectRatio: '16/9',
					width: '100%',
				}}>
					<NavImage src={props.data.variants[0].imageLink} alt={props.data.title} fit="cover" priority={1} />
				</div>
				<div>
					{props.data.title}
				</div>
				<NavLink href={props.data.link} target="_blank" onClick={e => e.stopPropagation()}>
					Open Product
				</NavLink>
			</div>
		</NavLink>
	)
}


registry.register('product-card', "my-custom-product-card", Component);
