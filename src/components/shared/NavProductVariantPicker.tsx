import SharedComponents from "../SharedComponents";

type option = {
	id: string,
	groupName: string,
	label: string,
	value: string,
	alt?: string,
	disabled: boolean,
	hidden: boolean,
}

type optionGroup = {
	id: string,
	name: string,
	label: string,
	value?: string,
	initialValue: string,
	options: Array<option>,
	hidden: boolean,
	required: boolean,
	error?: string
}

export type Props = {
	children: (group: optionGroup, onChange: (optionGroup: optionGroup) => void) => React.ReactNode;
};

const VariantPicker = (props: Props) => {
	let { renderProductVariantPicker } = SharedComponents.useContext();

	if (typeof renderProductVariantPicker === "function") {
		return renderProductVariantPicker(props);
	}

	return (
		<div>variant picker not implemented</div>
	);
};

export default VariantPicker;