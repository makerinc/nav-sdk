import React from '../../react';
import { Props as ImageProps } from './shared/Image';
import { Props as VideoProps } from './shared/Video';

export type ContextType = {
	renderImage: ((props: ImageProps) => React.JSX.Element) | undefined;
	renderVideo: ((props: VideoProps) => React.JSX.Element) | undefined;
};


window.__MAKER_SHARED_COMPONENTS_CONTEXT__ = window.__MAKER_SHARED_COMPONENTS_CONTEXT__ || React.createContext<ContextType>({
	renderImage: undefined,
	renderVideo: undefined,
});

const Context = window.__MAKER_SHARED_COMPONENTS_CONTEXT__;

type ProviderProps = React.PropsWithChildren<{
	renderImage: ((props: ImageProps) => React.JSX.Element) | undefined;
	renderVideo: ((props: VideoProps) => React.JSX.Element) | undefined;
}>;

export const useContext = () => React.useContext(Context);

export function Provider({ renderImage, renderVideo, children }: ProviderProps) {
	return (
		<Context.Provider value={{ renderImage, renderVideo }}>
			{children}
		</Context.Provider>
	);
}

export default {
	Provider,
	useContext
};