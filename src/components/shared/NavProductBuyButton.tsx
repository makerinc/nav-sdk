import { DataType } from "../../index"
import SharedComponents from "../SharedComponents";

type action = 'add-to-cart' | 'buy-now';
type state = 'available' | 'added-to-cart' | 'out-of-stock' | 'unavailable';

type renderProps = {
	state: state,
}

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	action: action,
	product: DataType.Product,
	variant: DataType.ProductVariant,
	children: (renderProps: renderProps) => React.ReactNode;
};

const CTAButton = (props: Props) => {
	let { renderBuyButton } = SharedComponents.useContext();

	if (typeof renderBuyButton === 'function') {
		return renderBuyButton(props);
	}

	return (
		<button {...props} onClick={props.onClick}>
			{props.children({ state: 'available' })}
		</button>
	);
};

export default CTAButton;
