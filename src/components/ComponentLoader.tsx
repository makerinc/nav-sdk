import React, { useEffect, useState } from "react";

type Props = {
	url: string;
	props?: Record<string, any>;
};

export function ComponentLoader({ url, props = {} }: Props) {
	const [Component, setComponent] = useState<React.FC | null>(null);

	useEffect(() => {
		(async () => {
			try {
				// Fetch the remote JavaScript file
				const response = await fetch(url);
				const jsCode = await response.text();

				// Wrap the code in a function so it can be evaluated
				const module: any = {};
				// eslint-disable-next-line no-new-func
				new Function("module", "exports", jsCode)(module, module);

				// Check if the module exports a valid React component
				if (typeof module.exports?.default === "function") {
					setComponent(() => module.exports.default);
				} else {
					console.error("Loaded module is not a valid React component");
				}
			} catch (error) {
				console.error("Failed to load remote component:", error);
			}
		})();
	}, [url]);

	return <div>{Component ? <Component {...props} /> : <p>Loading...</p>}</div>;
}
