import React from '../../react';
import { Props as ImageProps } from './shared/Image';
import { Props as VideoProps } from './shared/Video';
import { ProductLinkProps, CategoryLinkProps } from './shared/Link';

export type ContextType = {
	renderImage: ((props: ImageProps) => React.JSX.Element) | undefined;
	renderVideo: ((props: VideoProps) => React.JSX.Element) | undefined;
	renderProductLink: ((props: ProductLinkProps) => React.JSX.Element) | undefined;
	renderCategoryLink: ((props: CategoryLinkProps) => React.JSX.Element) | undefined;
};

window.__MAKER_SHARED_COMPONENTS_CONTEXT__ = window.__MAKER_SHARED_COMPONENTS_CONTEXT__ || React.createContext<ContextType>({
	renderImage: undefined,
	renderVideo: undefined,
	renderProductLink: undefined,
	renderCategoryLink: undefined,
});

const Context = window.__MAKER_SHARED_COMPONENTS_CONTEXT__;

type ProviderProps = React.PropsWithChildren<{
	renderImage: ((props: ImageProps) => React.JSX.Element) | undefined;
	renderVideo: ((props: VideoProps) => React.JSX.Element) | undefined;
	renderProductLink: ((props: ProductLinkProps) => React.JSX.Element) | undefined;
	renderCategoryLink: ((props: CategoryLinkProps) => React.JSX.Element) | undefined;
}>;

export const useContext = () => React.useContext(Context);

export function Provider({ renderImage, renderVideo, renderProductLink, renderCategoryLink, children }: ProviderProps) {
	return (
		<Context.Provider value={{ renderImage, renderVideo, renderProductLink, renderCategoryLink }}>
			{children}
		</Context.Provider>
	);
}

export default {
	Provider,
	useContext
};