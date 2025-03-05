import React from "../../react";
import { ComponentTypeMapping } from "../types";
import { injectImportMap } from './importmap';
import { log } from './logging';

export const EVENTS = {
	REGISTERED: "maker-nav-component-registered",
	UNREGISTERED: "maker-nav-component-unregistered"
}

type CustomComponentProps<T extends keyof ComponentTypeMapping> = {
	data: ComponentTypeMapping[T];
	[key: string]: unknown;
}

export type CustomComponent<T extends keyof ComponentTypeMapping> = React.FC<CustomComponentProps<T>> & {
	defaultProps?: Partial<CustomComponentProps<T>>;
};

export type RegisterFunction = <T extends keyof ComponentTypeMapping>(
	componentType: T,
	componentId: string,
	render: CustomComponent<T>
) => void;

export type RegisteredComponent<T extends keyof ComponentTypeMapping> = {
	componentId: string;
	componentType: T;
	componentUrl: string;
	render: CustomComponent<T>;
	defaultProps?: Partial<CustomComponentProps<T>>;
};

export type EventDetail = {
	componentType: string;
	componentId: string;
	componentUrl: string;
	defaultProps?: Partial<CustomComponentProps<keyof ComponentTypeMapping>>;
}

const getCallerModuleUrl = (): string | undefined => {
	const err = new Error();
	const stackLines = err.stack?.split("\n") || [];

	const lastStackLine = stackLines[stackLines.length - 1];
	if (!lastStackLine) return;

	const match = lastStackLine.match(/.*at\s+(https?:\/\/.*?(\.js|\.tsx|\.ts))(?::\d+:\d+)?.*/);

	if (match) return match[1];
}

export class ComponentRegistry {
	private components = new Map<string, RegisteredComponent<keyof ComponentTypeMapping>>();

	private constructor() {
		if (typeof window === 'undefined') {
			return;
		}
		if (typeof document === 'undefined') {
			return;
		}

		injectImportMap()

		window.__MAKER_NAV_COMPONENT_REGISTRY__ = {
			register: <T extends keyof ComponentTypeMapping>(
				componentType: T,
				componentId: string,
				render: CustomComponent<T>
			) => {
				log("registering", componentId)
				let componentUrl = getCallerModuleUrl() || import.meta.url;
				let defaultProps = render.defaultProps;

				this.components.set(componentId, {
					componentType,
					componentUrl,
					render,
					defaultProps
				} as RegisteredComponent<keyof ComponentTypeMapping>);

				window.dispatchEvent(
					new CustomEvent<EventDetail>(EVENTS.REGISTERED, {
						detail: { componentType, componentId, componentUrl: componentUrl, defaultProps: defaultProps }
					})
				);
			},
			unregister: (componentId: string) => {
				log("unregistering", componentId)
				const component = this.components.get(componentId);
				if (component) {
					this.components.delete(componentId);

					window.dispatchEvent(
						new CustomEvent(EVENTS.UNREGISTERED, {
							detail: { componentId }
						})
					);
				}
			},
			list: () => {
				return Array.from(this.components.entries()).map(([componentId, component]) => ({
					componentId: componentId,
					componentUrl: component.componentUrl,
					componentType: component.componentType,
					render: component.render,
					defaultProps: component.defaultProps
				}));
			}
		};
	}

	public static getInstance(): ComponentRegistry {
		if (typeof window !== 'undefined' && window.__MAKER_COMPONENT_REGISTRY_INSTANCE__) {
			return window.__MAKER_COMPONENT_REGISTRY_INSTANCE__;
		}

		const instance = new ComponentRegistry();
		if (typeof window !== 'undefined') {
			window.__MAKER_COMPONENT_REGISTRY_INSTANCE__ = instance;
		}
		return instance;
	}

	public register<T extends keyof ComponentTypeMapping>(
		componentType: T,
		componentId: string,
		render: CustomComponent<T>
	): void {
		if (this.isRegistryAvailable()) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__!.register(componentType, componentId, render);
		}
	}

	public unregister(componentId: string): void {
		if (this.isRegistryAvailable()) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__!.unregister(componentId);
		}
	}

	public getById(componentId: string): RegisteredComponent<keyof ComponentTypeMapping> | undefined {
		return window.__MAKER_NAV_COMPONENT_REGISTRY__!.list().find(component => component.componentId === componentId)
	}

	public getByUrl(componentUrl: string): RegisteredComponent<keyof ComponentTypeMapping> | undefined {
		return window.__MAKER_NAV_COMPONENT_REGISTRY__!.list().find(component => component.componentUrl === componentUrl)
	}

	public isRegistryAvailable(): boolean {
		return typeof window !== 'undefined' && !!window.__MAKER_NAV_COMPONENT_REGISTRY__;
	}
}

export const registry = ComponentRegistry.getInstance();

export function useRegistrationListener(callback: (data: EventDetail) => void, dependencies: any[] = []) {
	React.useEffect(() => {
		const handleEvent = (e: any) => {
			const data = e as CustomEvent<EventDetail>;
			callback(data.detail);
		};

		window.addEventListener(EVENTS.REGISTERED, handleEvent);
		return () => {
			window.removeEventListener(EVENTS.REGISTERED, handleEvent);
		};
	}, dependencies);
}

export function useRegisteredComponentById(componentId: string) {
	let initialValue = registry.getById(componentId)

	let [registeredComponent, setRegisteredComponent] = React.useState<RegisteredComponent<keyof ComponentTypeMapping> | undefined>(initialValue);

	useRegistrationListener((data) => {
		data.componentId == componentId && setRegisteredComponent(registry.getById(componentId));
	})

	return registeredComponent
}

export function useRegisteredComponentByUrl(componentUrl: string) {
	let initialValue = registry.getById(componentUrl)

	let [registeredComponent, setRegisteredComponent] = React.useState<RegisteredComponent<keyof ComponentTypeMapping> | undefined>(initialValue);

	useRegistrationListener((data) => {
		data.componentUrl == componentUrl && setRegisteredComponent(registry.getByUrl(componentUrl));
	})

	return registeredComponent
}