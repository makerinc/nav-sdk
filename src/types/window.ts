import * as React from 'react';
import { ContentTypeMapping, CustomComponent, RegisterFunction, ComponentRegistry } from "../utils/registry";
import { ContextType as SharedComponentsContext } from "../components/SharedComponents";


declare global {
	interface Window {
		__MAKER_REACT__: typeof React,
		__MAKER_SHARED_COMPONENTS_CONTEXT__?: React.Context<SharedComponentsContext>,
		__MAKER_NAV_COMPONENT_REGISTRY__?: {
			register: RegisterFunction,
			unregister: (componentId: string) => void,
			list: () => Array<{
				componentId: string;
				contentType: keyof ContentTypeMapping;
				render: CustomComponent<keyof ContentTypeMapping>;
			}>;
		};
		__MAKER_COMPONENT_REGISTRY_INSTANCE__?: ComponentRegistry;
	}
}
