import React, { useEffect, useState, ReactElement } from 'react';

type Props = {
	url: string;
	props?: Record<string, any>;
};

export function ComponentLoader({ url, props = {} }: Props) {
	const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);

	useEffect(() => {
		async function loadComponent() {
			const module = await import(url);
			if (module.default.prototype?.isReactComponent) {
				setComponent(() => module.default);
			} else {
				setComponent(() => (props: any) => module.default(props));
			}
		}

		loadComponent();
	}, [url]);

	if (!Component) return null;

	return <Component {...props} />;
}