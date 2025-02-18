import React, { useEffect, useState } from 'react';

type Props = {
	url: string;
	props?: Record<string, any>;
};

export function RemoteComponent({ url, props = {} }: Props) {
	const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadComponent() {
			try {
				const module = await import(url);
				if (module.default.prototype?.isReactComponent) {
					setComponent(() => module.default);
				} else {
					setComponent(() => (props: any) => module.default(props));
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load component');
			}
		}

		loadComponent();
	}, [url]);

	if (error) return <div>Error loading component: {error}</div>;
	if (!Component) return <div>Loading...</div>;

	return <Component {...props} />;
}