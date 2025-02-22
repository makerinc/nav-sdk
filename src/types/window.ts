import * as React from 'react';
import { ContentTypeMapping, CustomComponent, RegisterFunction } from "../utils/registry";


declare global {
	interface Window {
		__MAKER_REACT__: typeof React,
		__MAKER_NAV_COMPONENT_REGISTRY__?: {
			register: RegisterFunction,
			unregister: (componentId: string) => void,
			list: () => Array<{
				componentId: string;
				contentType: keyof ContentTypeMapping;
				render: CustomComponent<keyof ContentTypeMapping>;
			}>;
		};
	}
}
