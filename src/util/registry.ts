import { Product, Category } from '../types';
import { ReactElement } from 'react';
import { injectImportMap } from './importmap';


type ContentTypeMapping = {
	product: Product;
	category: Category;
};

export type RenderFunction<T extends keyof ContentTypeMapping> = (data: ContentTypeMapping[T]) => ReactElement;

type RegisterFunction = <T extends keyof ContentTypeMapping>(
	contentType: T,
	componentId: string,
	render: RenderFunction<T>
) => void;

type RegisteredComponent<T extends keyof ContentTypeMapping> = {
	contentType: T;
	render: RenderFunction<T>;
};

declare global {
	interface Window {
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


class ComponentRegistry {
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
				render: RenderFunction<T>
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
					new CustomEvent('maker-nav-component-registered', {
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
						new CustomEvent('maker-nav-component-unregistered', {
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
		if (!ComponentRegistry.instance) {
			ComponentRegistry.instance = new ComponentRegistry();
		}
		return ComponentRegistry.instance;
	}


	public register<T extends keyof ContentTypeMapping>(
		contentType: T,
		componentId: string,
		render: RenderFunction<T>
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

	public getRenderFunction(componentId: string): RenderFunction<any> | undefined {
		if (this.isRegistryAvailable()) {
			return window.__MAKER_NAV_COMPONENT_REGISTRY__!.list().find(component => component.componentId === componentId)?.render;
		}
	}

	public isRegistryAvailable(): boolean {
		return typeof window !== 'undefined' && !!window.__MAKER_NAV_COMPONENT_REGISTRY__;
	}
}

export const registry = ComponentRegistry.getInstance();
