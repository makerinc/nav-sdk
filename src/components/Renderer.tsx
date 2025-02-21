import { useEffect, useState, ReactElement } from 'react';
import { Product, Category } from '../types';
import { registry } from '../util/registry';
import ErrorBoundary from './ErrorBoundary';

type RendererProps = {
	componentId: string;
	data: Product | Category;
	fallback: ReactElement;
};

export function Renderer({ componentId, data, fallback }: RendererProps) {
	const [_, setForceRender] = useState<number>(() => 0);


	useEffect(() => {
		const handleForceRender = () => {
			setForceRender(previous => previous + 1);
		};

		window.addEventListener('maker-nav-component-registered', handleForceRender);
		return () => {
			window.removeEventListener('maker-nav-component-registered', handleForceRender);
		};
	}, []);


	const RenderComponent = registry.getRenderFunction(componentId)

	if (typeof RenderComponent !== 'function') {
		return fallback;
	}

	return (
		<ErrorBoundary fallback={fallback}>
			<RenderComponent data={data} />
		</ErrorBoundary>
	);
}