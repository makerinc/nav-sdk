import * as React from 'react';
import { ComponentTypeMapping } from "../types";
import { CustomComponent, RegisterFunction, ComponentRegistry } from "../utils/registry";
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
				componentType: keyof ComponentTypeMapping;
				render: CustomComponent<keyof ComponentTypeMapping>;
			}>;
		};
		__MAKER_COMPONENT_REGISTRY_INSTANCE__?: ComponentRegistry;
		__MAKER_NAV_LOGGING_ENABLED__?: boolean;
	}
}
