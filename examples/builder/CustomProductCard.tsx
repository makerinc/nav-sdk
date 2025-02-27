import { Product, registry, Image, Link } from '../../index';
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
		<Link target="product" productId={props.data.id} href={props.data.link}>
			<div>
				<div style={{
					position: 'relative',
					aspectRatio: '16/9',
					width: '100%',
				}}>
					<Image src={props.data.variants[0].imageLink} alt={props.data.title} fit="cover" priority={1} />
				</div>
				<div>
					{props.data.title}
				</div>
				<button onClick={handleClick}>Clicked {state} times</button>
				<Link href={props.data.link} target="_blank" onClick={e => e.stopPropagation()}>
					Open Product
				</Link>
			</div>
		</Link>
	)
}

registry.register('product-card', "my-custom-product-card", Component);
