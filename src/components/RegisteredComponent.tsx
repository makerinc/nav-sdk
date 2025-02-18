import { ReactElement } from 'react';
import { Product, Category, ContentType } from '../types/index';
import { useContent } from '../hooks/use-content';
import { useRegisterer } from '../hooks/use-registerer';


type ContentDataType<T extends ContentType> =
	T extends 'product' ? Product :
	T extends 'category' ? Category :
	never;

type Props<T extends ContentType> = {
	contentType: T;
	UUID: string;
	children: (content: ContentDataType<T>) => ReactElement;
}

export function RegisteredComponent<T extends ContentType>({
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