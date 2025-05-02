import { DataType } from "../../index"
import SharedComponents from "../SharedComponents";

export type Props = React.AnchorHTMLAttributes<HTMLFormElement> & {
	product: DataType.Product,
	variant?: DataType.ProductVariant,
	children: React.ReactNode;
};

const ProductForm = (props: Props) => {
	let {
		product,
		variant,
		children,
		...standardFormProps
	} = props;

	let { renderProductForm } = SharedComponents.useContext();

	if (typeof renderProductForm === "function") {
		return renderProductForm(props);
	}

	return (
		<form {...standardFormProps}>
			{props.children}
		</form>
	);
};

export default ProductForm;