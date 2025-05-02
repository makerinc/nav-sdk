import React from "react";
import SharedComponents from "../SharedComponents";

type current = {
	value: number;
	onChange: (value: number) => void;
}

export type Props = {
	children: (current: current) => React.ReactNode;
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