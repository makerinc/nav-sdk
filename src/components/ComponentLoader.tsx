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

				// Convert the JavaScript code into an executable ES module
				const blob = new Blob([jsCode], { type: "application/javascript" });
				const blobURL = URL.createObjectURL(blob);

				// Dynamically import the compiled module
				const module = await import(blobURL);

				// Check if the module exports a valid React component
				if (typeof module.default === "function") {
					setComponent(() => module.default);
				} else {
					console.error("Loaded module is not a valid React component");
				}

				// Cleanup blob URL after use
				URL.revokeObjectURL(blobURL);
			} catch (error) {
				console.error("Failed to load remote component:", error);
			}
		})();
	}, [url]); // Re-run if `url` changes

	return <div>{Component ? <Component {...props} /> : <p>Loading...</p>}</div>;
}
