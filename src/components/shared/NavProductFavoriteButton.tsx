import { DataType } from "../../index"
import SharedComponents from "../SharedComponents";

type state = 'active' | 'loading' | 'inactive' | 'disabled';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	product: DataType.Product,
	children: (state: state) => React.ReactNode;
};

const FavoriteButton = (props: Props) => {
	let { renderProductFavoriteButton } = SharedComponents.useContext();

	if (typeof renderProductFavoriteButton === 'function') {
		return renderProductFavoriteButton(props);
	}

	return (
		<button {...props} onClick={props.onClick}>
			{props.children('inactive')}
		</button>
	);
};

export default FavoriteButton;
