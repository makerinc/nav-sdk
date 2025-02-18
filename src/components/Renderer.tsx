import { useEffect, useState, ReactElement } from 'react';

import { Product, Category } from '../types';
import { registry } from '../util/registry';

type RendererProps = {
	componentId: string;
	data: Product | Category;
	fallback: ReactElement;
};

export function Renderer({
	componentId,
	data,
	fallback
}: RendererProps) {
	const [Component, setComponent] = useState(() => registry.getComponent(componentId))

	let refreshComponent = (_: any) => {
		setComponent(() => registry.getComponent(componentId))
	}

	useEffect(() => {
		window.addEventListener('maker-nav-component-registered', refreshComponent);

		() => {
			window.removeEventListener('maker-nav-component-registered', refreshComponent)
		}
	}, [componentId, data])

	if (!Component) {
		return fallback;
	}

	return <Component data={data} />;
}
