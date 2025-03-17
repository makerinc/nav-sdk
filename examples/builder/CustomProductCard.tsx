import { DataType, registry, NavImage, NavLink, NavCTAButton } from '../../src/index';
import React from '../../src/react';

type Props = {
	data: DataType.Product;
	test?: string
}

const Component = (props: Props) => {
	let selectedVariant = props.data.variants[0];

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
				<NavCTAButton action='add-to-cart' product={props.data} variant={selectedVariant}>Add to Cart</NavCTAButton>
			</div>
		</NavLink>
	)
}

Component.defaultProps = {
	test: "test"
}

registry.register('product-card', "my-custom-product-card", Component);

export default Component;