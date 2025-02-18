import { useEffect, useState, ReactElement } from 'react';

import { Product, Category } from '../types';
import { registry } from '../types/Registry';

type RendererProps = {
	UUID: string;
	data: Product | Category;
	fallback: ReactElement;
};

export function Renderer({
	UUID,
	data,
	fallback
}: RendererProps) {
	const [Component, setComponent] = useState(() => registry.getComponent(UUID))

	let refreshComponent = (_: any) => {
		setComponent(() => registry.getComponent(UUID))
	}

	useEffect(() => {
		window.addEventListener('maker-nav-component-registered', refreshComponent);

		() => {
			window.removeEventListener('maker-nav-component-registered', refreshComponent)
		}
	}, [UUID, data])

	if (!Component) {
		return fallback;
	}

	return <Component data={data} />;
}
