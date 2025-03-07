import React from 'react';
import { DataType } from '../types';
import { registry, useRegistrationListener } from '../utils/registry';
import ErrorBoundary from './ErrorBoundary';

type RendererProps = {
	componentId: string;
	data: DataType.Product | DataType.Category;
	additionalProps: Record<string, unknown>;
	renderFallback: () => React.ReactElement;
};

export function Renderer({ componentId, data, additionalProps, renderFallback }: RendererProps) {
	const [_, setForceRender] = React.useState<number>(() => 0);

	useRegistrationListener((data) => {
		data.componentId == componentId && setForceRender(previous => previous + 1);
	})

	const RenderComponent = registry.getById(componentId)?.render;

	if (typeof RenderComponent !== 'function') {
		return renderFallback();
	}

	return (
		<ErrorBoundary renderFallback={renderFallback}>
			{React.createElement(RenderComponent, { data, ...additionalProps })}
		</ErrorBoundary>
	);
}