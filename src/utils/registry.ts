import React from "../../react";
import { Product, Category } from '../types';
import { injectImportMap } from './importmap';

export type ContentTypeMapping = {
	product: Product;
	category: Category;
};

export const EVENTS = {
	REGISTERED: "maker-nav-component-registered",
	UNREGISTERED: "maker-nav-component-unregistered"
}

type CustomComponentProps<T extends keyof ContentTypeMapping> = {
	data: ContentTypeMapping[T];
};

export type CustomComponent<T extends keyof ContentTypeMapping> = (props: CustomComponentProps<T>) => React.JSX.Element

export type RegisterFunction = <T extends keyof ContentTypeMapping>(
	contentType: T,
	componentId: string,
	render: CustomComponent<T>
) => void;

type RegisteredComponent<T extends keyof ContentTypeMapping> = {
	contentType: T;
	render: CustomComponent<T>;
};


export class ComponentRegistry {
	private static instance: ComponentRegistry;
	private components = new Map<string, RegisteredComponent<keyof ContentTypeMapping>>();
	private contentTypeMap = new Map<keyof ContentTypeMapping, Set<string>>();

	private constructor() {
		if (typeof window === 'undefined') {
			return;
		}
		if (typeof document === 'undefined') {
			return;
		}

		injectImportMap()

		window.__MAKER_NAV_COMPONENT_REGISTRY__ = {
			register: <T extends keyof ContentTypeMapping>(
				contentType: T,
				componentId: string,
				render: CustomComponent<T>
			) => {
				this.components.set(componentId, {
					contentType,
					render
				} as RegisteredComponent<keyof ContentTypeMapping>);

				if (!this.contentTypeMap.has(contentType)) {
					this.contentTypeMap.set(contentType, new Set());
				}
				this.contentTypeMap.get(contentType)!.add(componentId);

				window.dispatchEvent(
					new CustomEvent(EVENTS.REGISTERED, {
						detail: { contentType, componentId }
					})
				);
			},
			unregister: (componentId: string) => {
				const component = this.components.get(componentId);
				if (component) {
					const typeSet = this.contentTypeMap.get(component.contentType);
					if (typeSet) {
						typeSet.delete(componentId);
						if (typeSet.size === 0) {
							this.contentTypeMap.delete(component.contentType);
						}
					}
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

	public register<T extends keyof ContentTypeMapping>(
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

export function useRegistrationListener(callback: (componentId: string) => void) {
	React.useEffect(() => {
		const handleEvent = (e: any) => {
			callback(e.detail.componentId);
		};

		window.addEventListener(EVENTS.REGISTERED, handleEvent);
		return () => {
			window.removeEventListener(EVENTS.UNREGISTERED, handleEvent);
		};
	}, []);
}