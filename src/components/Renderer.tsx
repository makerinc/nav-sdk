import React, { useEffect, useState, useCallback, ReactElement } from 'react';
import { Product, Category } from '../types';
import { registry, RenderFunction } from '../util/registry';
import ErrorBoundary from './ErrorBoundary';

type RendererProps = {
	componentId: string;
	data: Product | Category;
	fallback: ReactElement;
};

export function Renderer({ componentId, data, fallback }: RendererProps) {
	const [renderFunction, setRenderFunction] = useState<RenderFunction<any> | undefined>(
		() => registry.getRenderFunction(componentId)
	);

	const refreshComponent = useCallback(() => {
		const newRenderFunction = registry.getRenderFunction(componentId);
		if (newRenderFunction) {
			setRenderFunction(() => newRenderFunction);
		}
	}, [componentId]);

	useEffect(() => {
		const handleComponentRegistered = () => {
			refreshComponent();
		};

		window.addEventListener('maker-nav-component-registered', handleComponentRegistered);
		return () => {
			window.removeEventListener('maker-nav-component-registered', handleComponentRegistered);
		};
	}, [refreshComponent]);

	if (typeof renderFunction !== 'function') {
		return fallback;
	}

	return (
		<ErrorBoundary fallback={fallback}>
			{React.createElement(renderFunction, { data })}
		</ErrorBoundary>
	);
}
