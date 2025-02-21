import React from '../../react';
import { Product, Category } from '../types/Index';
import { registry, useRegistrationListener, RenderFunction } from '../util/registry';
import ErrorBoundary from './ErrorBoundary';



type RendererProps = {
	componentId: string;
	data: Product | Category;
	fallback: React.ReactElement;
};


export function Renderer({ componentId, data, fallback }: RendererProps) {
	const [Component, setComponent] = React.useState<RenderFunction<any> | undefined>(undefined);

	useRegistrationListener((_) => {
		setComponent(registry.getRenderFunction(componentId))
	})

	if (typeof Component !== 'function') {
		return fallback;
	}

	return (
		<ErrorBoundary fallback={fallback}>
			<Component data={data} />
		</ErrorBoundary>
	);
}