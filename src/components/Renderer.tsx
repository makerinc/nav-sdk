import React from 'react';
import ShadowDOM from 'react-shadow';
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
	const [, setForceRender] = React.useState<number>(() => 0);

	useRegistrationListener((data) => {
		if (data.componentId === componentId) {
			setForceRender(previous => previous + 1);
		}
	});

	const RenderComponent = registry.getById(componentId)?.render;

	if (typeof RenderComponent !== 'function') {
		return renderFallback();
	}

	return (
		<ErrorBoundary renderFallback={renderFallback}>
			<ShadowDOM.div>
				<RenderComponent data={data} {...additionalProps} />
			</ShadowDOM.div>
		</ErrorBoundary>
	);
}
