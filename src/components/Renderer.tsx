import React from 'react';
import { Product, Category } from '../types';
import { registry, useRegistrationListener } from '../utils/registry';
import ErrorBoundary from './ErrorBoundary';

type RendererProps = {
	componentId: string;
	data: Product | Category;
	renderFallback: () => React.ReactNode;
};

export function Renderer({ componentId, data, renderFallback }: RendererProps) {
	const [_, setForceRender] = React.useState<number>(() => 0);

	useRegistrationListener((data) => {
		data.componentId == componentId && setForceRender(previous => previous + 1);
	})

	const RenderComponent = registry.getRenderFunction(componentId)

	if (typeof RenderComponent !== 'function') {
		return renderFallback();
	}

	return (
		<ErrorBoundary renderFallback={renderFallback}>
			{React.createElement(RenderComponent, { data })}
		</ErrorBoundary>
	);
}