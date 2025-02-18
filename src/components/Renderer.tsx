import { useEffect, useState } from 'react';

import { Product, Category } from '../types';
import { registry } from '../types/Registry';

type RendererProps = {
	UUID: string;
	data: Product | Category;
};

export function Renderer({
	UUID,
	data
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
		return <div>No component found for UUID: {UUID}</div>;
	}

	return <Component data={data} />;
}
