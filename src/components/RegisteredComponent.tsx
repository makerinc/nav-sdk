import { ReactElement } from 'react';
import { Product, Category } from '../types/index';
import { useContent } from '../hooks/use-content';
import { useRegisterer } from '../hooks/use-registerer';

type ValidContentType = 'product' | 'category';

type ContentDataType<T extends ValidContentType> =
	T extends 'product' ? Product :
	T extends 'category' ? Category :
	never;

type Props<T extends ValidContentType> = {
	contentType: T;
	UUID: string;
	children: (content: ContentDataType<T>) => ReactElement;
}

export function RegisteredComponent<T extends ValidContentType>({
	contentType,
	UUID,
	children
}: Props<T>): ReactElement {
	const content = useContent();

	if (contentType !== content.type) {
		throw new Error('Content type does not match registered component');
	}

	return useRegisterer(children(content.data as ContentDataType<T>), UUID);
}