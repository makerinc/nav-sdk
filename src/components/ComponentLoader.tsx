import React, { useEffect } from "react";

type Props = {
	url: string;
};

declare global {
	interface Window {
		__MAKER_REACT: any
	}
}

export function ComponentLoader({ url }: Props) {

	useEffect(() => {
		window.__MAKER_REACT = React;

		try {
			const script = document.createElement("script");
			script.type = "module";
			script.src = url;

			document.body.appendChild(script);

			script.onerror = (error) => {
				console.error("Error loading remote component:", error);
			};
		} catch (error) {
			console.error("Failed to load remote component:", error);
		}
	}, [url]);

	return null;
}