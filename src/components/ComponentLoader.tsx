import React from "../../react";
import { registry, useRegisteredComponentByUrl } from "../utils/registry";
import { log } from '../utils/logging'

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
		if (!document?.head) {
			// Potentially running on the server
			return;
		}

		window.__MAKER_NAV_SCRIPT_RELOAD_COUNT__ = window.__MAKER_NAV_SCRIPT_RELOAD_COUNT__ || {};
		window.__MAKER_NAV_SCRIPT_RELOAD_COUNT__[url] = (window.__MAKER_NAV_SCRIPT_RELOAD_COUNT__[url] ?? -1) + 1;

		let reloadCount = window.__MAKER_NAV_SCRIPT_RELOAD_COUNT__?.[url];

		const script = document.createElement("script");
		script.type = "module";
		script.src = url + (reloadCount == 0 || reloadCount == undefined ? "" : "?v=" + reloadCount);

		document.head.appendChild(script);

		script.onload = () => {
			log("component loaded", url)
			onLoad && onLoad();
		};

		script.onerror = (error) => {
			onError && onError("Failed to load remote component");
			console.error("Error loading remote component:", error);
		};

		return () => {
			log("component unloaded", url)
			document.head.removeChild(script);
		};
	}, [url]);

	return null;
}