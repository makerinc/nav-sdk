import React from 'react';
import { DataType } from '../types';
import { useRegisteredComponentById } from '../utils/registry';
import ErrorBoundary from './ErrorBoundary';

type RendererProps = {
	componentId: string;
	data: DataType.Product | DataType.Category;
	renderFallback: () => React.ReactElement;
};

export function Renderer({ componentId, data, renderFallback }: RendererProps) {
	const RenderComponent = useRegisteredComponentById(componentId)?.render

	if (typeof RenderComponent !== 'function') {
		return renderFallback();
	}

	return (
		<ErrorBoundary renderFallback={renderFallback}>
			{React.createElement(RenderComponent, { data })}
		</ErrorBoundary>
	);
}