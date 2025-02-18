import { ReactElement, useEffect } from 'react';
import { Product, Category, ContentType } from '../types/index';
import { registry } from '../types/Registry';

type ContentDataType<T extends ContentType> =
	T extends 'product' ? Product :
	T extends 'category' ? Category :
	never;

type Props<T extends ContentType> = {
	contentType: T;
	UUID: string;
	children: (content: ContentDataType<T>) => ReactElement;
}

type InternalProps = {
	data: Product | Category | null
}

export function RegisteredComponent<T extends ContentType>({
	contentType,
	UUID,
	children
}: Props<T>): null {

	const Component = ({ data }: InternalProps) => {

		const element = children(data as ContentDataType<T>);

		return element;
	}

	useEffect(() => {
		if (registry.isRegistryAvailable()) {
			registry.register(contentType, UUID, Component);
			return () => {
				registry.unregister(UUID);
			};
		}
	}, [contentType, UUID]);

	return null;
}