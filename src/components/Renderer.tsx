import { useEffect, useRef, useState, ReactElement } from 'react';
import { Product, Category } from '../types';
import { registry, RenderFunction } from '../util/registry';
import ErrorBoundary from './ErrorBoundary';

type RendererProps = {
	componentId: string;
	data: Product | Category;
	fallback: ReactElement;
};

export function Renderer({ componentId, data, fallback }: RendererProps) {
	const renderFunctionRef = useRef<RenderFunction<any> | undefined>(
		registry.getRenderFunction(componentId)
	);
	const [_, setForceRender] = useState(false);

	const refreshComponent = () => {
		renderFunctionRef.current = registry.getRenderFunction(componentId);
		setForceRender((prev) => !prev);
	};

	useEffect(() => {
		const handleComponentRegistered = () => {
			refreshComponent();
		};

		window.addEventListener('maker-nav-component-registered', handleComponentRegistered);
		return () => {
			window.removeEventListener('maker-nav-component-registered', handleComponentRegistered);
		};
	}, []);

	if (typeof renderFunctionRef.current !== 'function') {
		return fallback;
	}

	const RenderedComponent = renderFunctionRef.current;
	return (
		<ErrorBoundary fallback={fallback}>
			<RenderedComponent data={data} />
		</ErrorBoundary>
	);
}
