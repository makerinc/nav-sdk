import { useEffect } from "react";

type Props = {
	url: string;
};

export function ComponentLoader({ url }: Props) {

	useEffect(() => {

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