import { Suspense } from 'react';
import imported from 'react-imported-component';


type Props = {
	url: string;
	props?: Record<string, any>;
};

export function ComponentLoader({ url, props = {} }: Props) {


	const RemoteComponent = imported(() =>
		import(url)
	);

	return (
		<Suspense fallback={''}>
			<RemoteComponent {...props} />
		</Suspense>
	);

}