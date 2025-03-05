import React from "../../react";
import { registry, useRegisteredComponentByUrl } from "../utils/registry";

type Props = {
	url: string;
	onLoad?: (() => void);
	onError?: ((error: string) => void);
};

export function ComponentLoader({ url, onLoad, onError }: Props) {
	let registeredComponentId = useRegisteredComponentByUrl(url)?.componentId

	React.useEffect(() => {
		return () => {
			if (registeredComponentId) {
				registry.unregister(registeredComponentId);
			}
		}
	}, [registeredComponentId])

	React.useEffect(() => {
		if (!!document?.head) {
			// Potentially running on the server
			return;
		}

		const script = document.createElement("script");
		script.type = "module";
		script.src = url;

		document.head.appendChild(script);

		script.onload = () => {
			onLoad && onLoad();
		};

		script.onerror = (error) => {
			onError && onError("Failed to load remote component");
			console.error("Error loading remote component:", error);
		};

		return () => {
			document.head.removeChild(script);
		};
	}, [url]);

	return null;
}