import React from "react";
import SharedComponents from "../SharedComponents";

export type Props = {
	value: number;
	onChange: (value: number) => void;
	children: React.ReactNode;
};

const QuantityPicker = (props: Props) => {
	let { renderProductQuantityPicker } = SharedComponents.useContext();

	if (typeof renderProductQuantityPicker === "function") {
		return renderProductQuantityPicker(props);
	}

	return (
		"quantity picker not implemented"
	);
};

export default QuantityPicker;