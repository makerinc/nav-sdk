import SharedComponents from "../SharedComponents";

type option = {
	label: string,
	value: string,
	selected?: boolean,
	disabled?: boolean,

}
type optionGroup = {
	label: string,
	options: Array<option>
	required?: boolean,
	onChange?: (value: string) => void,
}

export type Props = {
	children: (group: Array<optionGroup>) => Array<React.ReactNode>;
};

const VariantPicker = (props: Props) => {
	let { renderProductVariantPicker } = SharedComponents.useContext();

	if (typeof renderProductVariantPicker === "function") {
		return renderProductVariantPicker(props);
	}

	return (
		"variant picker not implemented"
	);
};

export default VariantPicker;