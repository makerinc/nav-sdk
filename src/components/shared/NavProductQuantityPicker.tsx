import React from "react";
import SharedComponents from "../SharedComponents";

export type Props = {
	children: (value: number, onChange: (value: number) => void) => React.ReactNode;
};

const QuantityPicker = (props: Props) => {
	let { renderProductQuantityPicker } = SharedComponents.useContext();

	if (typeof renderProductQuantityPicker === "function") {
		return renderProductQuantityPicker(props);
	}

	return (
		<div>quantity picker not implemented</div>
	);
};

export default QuantityPicker;