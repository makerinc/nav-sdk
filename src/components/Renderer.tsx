import { Product, Category } from '../types';
import { registry } from '../types/Registry';

type RendererProps = {
	UUID: string;
	data: Product | Category;
};

export function Renderer({
	UUID,
	data
}: RendererProps) {
	const Component = registry.getComponent(UUID);

	if (!Component) {
		return <div>No component found for UUID: {UUID}</div>;
	}

	return <Component data={data} />;
}