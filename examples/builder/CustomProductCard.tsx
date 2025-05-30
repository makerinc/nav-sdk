import { DataType, registry, NavImage, NavLink, NavProductBuyButton, NavProductForm, NavProductVariantPicker, NavProductQuantityPicker } from '../../src/index';
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
				<NavProductForm product={props.data} variant={selectedVariant}>
					<NavProductVariantPicker>
						{(group, onChange) => {
							return (<div key={group.label}>
								<div>{group.label}</div>
								{group.options.map((option) => (
									<div key={option.value}>
										<input type="radio" name={group.label} value={option.value} checked={group.value == option.value || group.initialValue == option.value} onChange={(e) => onChange({ ...group, value: e.target.value })} />
										<label>{option.label}</label>
									</div>
								))}
							</div>)
						}}
					</NavProductVariantPicker>
					<NavProductQuantityPicker>
						{(value, onChange) => <input type="number" min={1} max={10} value={value} onChange={(e) => onChange(parseInt(e.target.value))} />}
					</NavProductQuantityPicker>
					<NavProductBuyButton action='add-to-cart'>
						{(state) => {
							switch (state) {
								case 'available':
									<button>Add to Cart</button>
									break;
								case 'out-of-stock':
									<button disabled={true}>Out of Stock</button>
									break;
								case 'unavailable':
									<button disabled={true}>Unavailable</button>
									break;
								case 'loading':
									<button disabled={true}>Adding to Cart...</button>
									break;
								case 'done':
									<button disabled={true}>Added to Cart!</button>
									break;
							}
						}}
					</NavProductBuyButton>
				</NavProductForm>
			</div>
		</NavLink>
	)
}

Component.defaultProps = {
	test: "test"
}

registry.register('product-card', "my-custom-product-card", Component);

export default Component;