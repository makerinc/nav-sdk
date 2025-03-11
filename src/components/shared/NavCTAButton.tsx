import { DataType } from "../../index"
import SharedComponents from "../SharedComponents";

type action = 'add-to-cart' | 'add-to-wishlist' | 'checkout' | 'buy-now';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	action: action,
	product: DataType.Product,
	variant: DataType.ProductVariant,
	children: React.ReactNode;
};

const CTAButton = (props: Props) => {
	let { renderCTAButton } = SharedComponents.useContext();

	if (typeof renderCTAButton === 'function') {
		return renderCTAButton(props);
	}

	return (
		<button {...props} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default CTAButton;
