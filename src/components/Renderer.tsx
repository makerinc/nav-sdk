import React from 'react';
import { Product, Category } from '../types';
import { registry, useRegistrationListener } from '../util/registry';
import ErrorBoundary from './ErrorBoundary';

type RendererProps = {
	componentId: string;
	data: Product | Category;
	fallback: React.ReactElement;
};


export function Renderer({ componentId, data, fallback }: RendererProps) {
	const [_, setForceRender] = React.useState<number>(() => 0);

	useRegistrationListener((data) => {
		data == componentId && setForceRender(previous => previous + 1);
	})

	const RenderComponent = registry.getRenderFunction(componentId)

	if (typeof RenderComponent !== 'function') {
		return fallback;
	}

	return (
		<ErrorBoundary fallback={fallback}>
			{React.createElement(RenderComponent, { data })}
		</ErrorBoundary>
	);
}