import { DataType } from "../../index"
import SharedComponents from "../SharedComponents";

export type Props = {
	children: (variant: DataType.ProductVariant) => React.ReactNode;
};

const ProductInfo = (props: Props) => {
	let { renderProductInfo } = SharedComponents.useContext();

	if (typeof renderProductInfo === 'function') {
		return renderProductInfo(props);
	}

	return (
		<div>product info not implemented</div>
	);
};

export default ProductInfo;
