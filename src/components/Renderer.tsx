import { useEffect, useState, ReactElement } from 'react';
import { Product, Category } from '../types';
import { registry } from '../util/registry';
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
	const [Component, setComponent] = useState<React.ComponentType<any> | undefined>(() => registry.getComponent(componentId));

	const refreshComponent = () => {
		setComponent(() => registry.getComponent(componentId));
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

	if (!Component) {
		return fallback;
	}

	return <ErrorBoundary fallback={fallback}><Component data={data} /></ErrorBoundary>;
}
