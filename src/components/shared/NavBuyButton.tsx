import { DataType } from "../../index"
import SharedComponents from "../SharedComponents";

type action = 'add-to-cart' | 'buy-now';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	action: action,
	product: DataType.Product,
	variant: DataType.ProductVariant,
	children: React.ReactNode;
};

const CTAButton = (props: Props) => {
	let { renderBuyButton } = SharedComponents.useContext();

	if (typeof renderBuyButton === 'function') {
		return renderBuyButton(props);
	}

	return (
		<button {...props} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default CTAButton;
