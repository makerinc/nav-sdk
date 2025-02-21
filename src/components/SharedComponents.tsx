import React from '../../react';
import { Props as ImageProps } from './Image';

type ContextType = {
	renderImage: (props: ImageProps) => React.JSX.Element | null;
};

const Context = React.createContext<ContextType>({
	renderImage: (_: ImageProps) => null
});

type ProviderProps = React.PropsWithChildren<{
	renderImage: (props: ImageProps) => React.JSX.Element | null;
}>;

export const useContext = () => React.useContext(Context);

export function Provider({ renderImage, children }: ProviderProps) {
	return (
		<Context.Provider value={{ renderImage }}>
			{children}
		</Context.Provider>
	);
}

export default {
	Provider,
	useContext
};