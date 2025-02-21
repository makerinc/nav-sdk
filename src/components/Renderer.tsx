import React, { useEffect, useState, ReactElement } from 'react';
import { Product, Category } from '../types';
import { registry, RenderFunction } from '../util/registry';
import ErrorBoundary from './ErrorBoundary';

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
	const [renderFunction, setRenderFunction] = useState<RenderFunction<any> | undefined>(() => registry.getRenderFunction(componentId));

	const refreshComponent = () => {
		setRenderFunction(() => registry.getRenderFunction(componentId));
	};

	useEffect(() => {
		const handleComponentRegistered = () => {
			refreshComponent();
		};

		window.addEventListener('maker-nav-component-registered', handleComponentRegistered);

		return () => {
			window.removeEventListener('maker-nav-component-registered', handleComponentRegistered);
		};
	}, [componentId]);

	if (!renderFunction) {
		return fallback;
	}

	return <ErrorBoundary fallback={fallback}>{React.createElement(renderFunction, { data })}</ErrorBoundary>;
}
