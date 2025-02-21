import { ContentTypeMapping, RenderFunction, RegisterFunction } from "../util/registry";


declare global {
	interface Window {
		__MAKER_REACT__: any,
		__MAKER_NAV_COMPONENT_REGISTRY__?: {
			register: RegisterFunction,
			unregister: (componentId: string) => void,
			list: () => Array<{
				componentId: string;
				contentType: keyof ContentTypeMapping;
				render: RenderFunction<keyof ContentTypeMapping>;
			}>;
		};
	}
}
