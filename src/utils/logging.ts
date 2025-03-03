let loggingEnabled = window.__MAKER_NAV_LOGGING_ENABLED__ || true;

export const log = (...args: any[]) => {
	if (!loggingEnabled) {
		return;
	}

	console.log("[nav-sdk]", ...args);
}
