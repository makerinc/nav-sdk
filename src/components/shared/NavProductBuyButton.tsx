import { DataType } from "../../index"
import SharedComponents from "../SharedComponents";

type action = 'add-to-cart';
type state = 'available' | 'loading' | 'done' | 'out-of-stock' | 'unavailable';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	action: action,
	product: DataType.Product,
	children: (state: state) => React.ReactNode;
};

const BuyButton = (props: Props) => {
	let { renderProductBuyButton } = SharedComponents.useContext();

	if (typeof renderProductBuyButton === 'function') {
		return renderProductBuyButton(props);
	}

	return (
		<button {...props} onClick={props.onClick}>
			{props.children('available')}
		</button>
	);
};

export default BuyButton;
