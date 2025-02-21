import React from 'react';
import { Props } from './Image';

type Context = {
	renderImage: (props: Props) => React.JSX.Element | null;
};

type ProviderProps = React.PropsWithChildren<Context>

const Context = React.createContext<Context>({
	renderImage: (_) => null
});

export const useContext = () => React.useContext(Context)

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
}