import { useEffect } from "react";

type Props = {
	url: string;
	onLoad: (() => void) | undefined;
	onError: ((error: string) => void) | undefined;
};

export function ComponentLoader({ url, onLoad, onError }: Props) {
	useEffect(() => {
		try {
			const script = document.createElement("script");
			script.type = "module";
			script.src = url;

			document.body.appendChild(script);

			script.onload = () => {
				onLoad && onLoad();
			};

			script.onerror = (error) => {
				onError && onError("Failed to load remote component");
				console.error("Error loading remote component:", error);
			};
		} catch (error) {
			onError && onError("Raised exception while injecting script");
			console.error("Failed to load remote component:", error);
		}
	}, [url]);

	return null;
}