const ID = "maker-nav-importmap";
const MAP = {
	imports: {
		react: 'https://esm.sh/react@16.14.0',
		'react-dom': 'https://esm.sh/react-dom',
		'react/jsx-runtime': 'https://esm.sh/react@16.14.0/jsx-runtime',
		'react-dom/server': 'https://esm.sh/react-dom/server'
	}
}

export const injectImportMap = () => {
	if (typeof window === 'undefined') {
		return;
	}
	if (typeof document === 'undefined') {
		return;
	}

	if (!!document.getElementById(ID)) {
		return;
	}

	let script = document.createElement('script');
	script.innerHTML = JSON.stringify(MAP)
	script.type = "importmap"
	script.id = ID
	document.head.appendChild(script);
}