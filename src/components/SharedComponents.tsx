import React from '../react';
import { Props as ImageProps } from './shared/NavImage';
import { Props as VideoProps } from './shared/NavVideo';
import { Props as BuyButtonProps } from './shared/NavBuyButton';
import { Props as ProductFormProps } from './shared/NavProductForm';
import { Props as ProductVariantPickerProps } from './shared/NavProductVariantPicker';
import { Props as ProductQuantityPicker } from './shared/NavProductQuantityPicker';
import { ProductLinkProps, CategoryLinkProps } from './shared/NavLink';

export type ContextType = {
	renderImage: ((props: ImageProps) => React.JSX.Element) | undefined;
	renderVideo: ((props: VideoProps) => React.JSX.Element) | undefined;
	renderProductLink: ((props: ProductLinkProps) => React.JSX.Element) | undefined;
	renderCategoryLink: ((props: CategoryLinkProps) => React.JSX.Element) | undefined;
	renderBuyButton: ((props: BuyButtonProps) => React.JSX.Element) | undefined;
	renderProductForm: ((props: ProductFormProps) => React.JSX.Element) | undefined;
	renderProductVariantPicker: ((props: ProductVariantPickerProps) => React.JSX.Element) | undefined;
	renderProductQuantityPicker: ((props: ProductQuantityPicker) => React.JSX.Element) | undefined;
};

window.__MAKER_NAV_SHARED_COMPONENTS_CONTEXT__ = window.__MAKER_NAV_SHARED_COMPONENTS_CONTEXT__ || React.createContext<ContextType>({
	renderImage: undefined,
	renderVideo: undefined,
	renderProductLink: undefined,
	renderCategoryLink: undefined,
	renderBuyButton: undefined,
	renderProductForm: undefined,
	renderProductVariantPicker: undefined,
	renderProductQuantityPicker: undefined,
});

const Context = window.__MAKER_NAV_SHARED_COMPONENTS_CONTEXT__;

type ProviderProps = React.PropsWithChildren<ContextType>;

export const useContext = () => React.useContext(Context);

export function Provider({ children, ...ctxValue }: ProviderProps) {
	return (
		<Context.Provider value={ctxValue}>
			{children}
		</Context.Provider>
	);
}

export default {
	Provider,
	useContext
}