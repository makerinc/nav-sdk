import React from '../react';
import { Props as ImageProps } from './shared/NavImage';
import { Props as VideoProps } from './shared/NavVideo';
import { Props as BuyButtonProps } from './shared/NavBuyButton';
import { ProductLinkProps, CategoryLinkProps } from './shared/NavLink';

export type ContextType = {
	renderImage: ((props: ImageProps) => React.JSX.Element) | undefined;
	renderVideo: ((props: VideoProps) => React.JSX.Element) | undefined;
	renderProductLink: ((props: ProductLinkProps) => React.JSX.Element) | undefined;
	renderCategoryLink: ((props: CategoryLinkProps) => React.JSX.Element) | undefined;
	renderBuyButton: ((props: BuyButtonProps) => React.JSX.Element) | undefined;
};

window.__MAKER_NAV_SHARED_COMPONENTS_CONTEXT__ = window.__MAKER_NAV_SHARED_COMPONENTS_CONTEXT__ || React.createContext<ContextType>({
	renderImage: undefined,
	renderVideo: undefined,
	renderProductLink: undefined,
	renderCategoryLink: undefined,
	renderBuyButton: undefined,
});

const Context = window.__MAKER_NAV_SHARED_COMPONENTS_CONTEXT__;

type ProviderProps = React.PropsWithChildren<{
	renderImage: ((props: ImageProps) => React.JSX.Element) | undefined;
	renderVideo: ((props: VideoProps) => React.JSX.Element) | undefined;
	renderProductLink: ((props: ProductLinkProps) => React.JSX.Element) | undefined;
	renderCategoryLink: ((props: CategoryLinkProps) => React.JSX.Element) | undefined;
	renderBuyButton: ((props: BuyButtonProps) => React.JSX.Element) | undefined;
}>;

export const useContext = () => React.useContext(Context);

export function Provider({ renderImage, renderVideo, renderProductLink, renderCategoryLink, renderBuyButton, children }: ProviderProps) {
	return (
		<Context.Provider value={{ renderImage, renderVideo, renderProductLink, renderCategoryLink, renderBuyButton }}>
			{children}
		</Context.Provider>
	);
}

export default {
	Provider,
	useContext
}