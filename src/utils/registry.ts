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

export type RegisterFunction = <T extends keyof ComponentTypeMapping>(
	contentType: T,
	componentId: string,
	render: CustomComponent<T>
) => void;

export type CustomComponent<T extends keyof ComponentTypeMapping> = (
	props: CustomComponentProps<T>
) => React.JSX.Element;

type RegisteredComponent<T extends keyof ComponentTypeMapping> = {
	contentType: T;
	componentUrl: string;
	render: CustomComponent<T>;
};

export type EventDetail = {
	contentType: string;
	componentId: string;
	componentUrl: string;
}

const getCallerModuleUrl = (): string | undefined => {
	const err = new Error();
	const stackLines = err.stack?.split("\n") || [];

	log("getCallerModuleUrl stack lines", stackLines);

	const lastStackLine = stackLines[stackLines.length - 1];
	if (!lastStackLine) return;

	log("getCallerModuleUrl last stack line", lastStackLine);

	const match = lastStackLine.match(/.*at\s+(https?:\/\/.*?(\.js|\.tsx|\.ts))(?::\d+:\d+)?.*/);

	log("getCallerModuleUrl match", match);

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
				contentType: T,
				componentId: string,
				render: CustomComponent<T>
			) => {
				let componentUrl = getCallerModuleUrl() || import.meta.url;

				this.components.set(componentId, {
					contentType,
					componentUrl,
					render
				} as RegisteredComponent<keyof ComponentTypeMapping>);


				window.dispatchEvent(
					new CustomEvent<EventDetail>(EVENTS.REGISTERED, {
						detail: { contentType, componentId, componentUrl: componentUrl }
					})
				);
			},
			unregister: (componentId: string) => {
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
					contentType: component.contentType,
					render: component.render
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
		contentType: T,
		componentId: string,
		render: CustomComponent<T>
	): void {
		if (this.isRegistryAvailable()) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__!.register(contentType, componentId, render);
		}
	}

	public unregister(componentId: string): void {
		if (this.isRegistryAvailable()) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__!.unregister(componentId);
		}
	}

	public getRenderFunction(componentId: string): CustomComponent<any> | undefined {
		return window.__MAKER_NAV_COMPONENT_REGISTRY__!.list().find(component => component.componentId === componentId)?.render
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
