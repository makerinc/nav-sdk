import React, { createContext, useMemo, ReactNode } from 'react';
import { Category, Product, Content } from '../types/index';

export const ContentContext = createContext<Content | undefined>(undefined);

interface ContentProviderProps {
	children: ReactNode;
	product?: Product | null;
	category?: Category | null;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
	children,
	product = null,
	category = null,
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

	return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
};
