import React, { createContext, useMemo, ReactNode } from 'react';
import { Category, Product, ContextState, Content } from '../types/index';

export const ContentContext = createContext<ContextState | undefined>(undefined);

interface ContentProviderProps {
	children: ReactNode;
	product?: Product | null;
	category?: Category | null;
	loading?: boolean;
	error?: string | null;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
	children,
	product = null,
	category = null,
	loading = false,
	error = null,
}) => {
	const content: Content = useMemo(() => {
		if (product) {
			return { type: 'product', data: product };
		} else if (category) {
			return { type: 'category', data: category };
		} else {
			return { type: 'none', data: null };
		}
	}, [product, category]);

	const value = useMemo<ContextState>(() => ({
		content,
		loading,
		error,
	}), [content, loading, error]);

	return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
