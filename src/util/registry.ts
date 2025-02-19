import { ContentType } from '../types';
import React from 'react';

declare global {
	interface Window {
		__MAKER_NAV_COMPONENT_REGISTRY__?: {
			register: <T extends ContentType>(
				contentType: T,
				componentId: string,
				component: React.ComponentType<any>
			) => void;
			unregister: (componentId: string) => void;
			get: (componentId: string) => React.ComponentType<any> | undefined;
		};
	}
}

type RegisteredComponent = {
	contentType: ContentType;
	component: React.ComponentType<any>;
};

class ComponentRegistry {
	private static instance: ComponentRegistry;
	private components = new Map<string, RegisteredComponent>();
	private contentTypeMap = new Map<ContentType, Set<string>>();

	private constructor() {
		if (typeof window === 'undefined') {
			return;
		}
		if (typeof document === 'undefined') {
			return;
		}

		let script = document.createElement('script');
		script.innerHTML = `{"imports":{"react":"https://esm.sh/react@16.14.0","react-dom":"https://esm.sh/react@16.14.0","react/jsx-runtime":"https://esm.sh/react@16.14.0/jsx-runtime"}}`
		script.type = "importmap"
		document.body.appendChild(script);

		window.__MAKER_NAV_COMPONENT_REGISTRY__ = {
			register: <T extends ContentType>(
				contentType: T,
				componentId: string,
				component: React.ComponentType<any>
			) => {
				this.components.set(componentId, {
					contentType,
					component
				});

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
			get: (componentId: string) => {
				return this.components.get(componentId)?.component;
			}
		};

	}

	public static getInstance(): ComponentRegistry {
		if (!ComponentRegistry.instance) {
			ComponentRegistry.instance = new ComponentRegistry();
		}
		return ComponentRegistry.instance;
	}

	public register<T extends ContentType>(
		contentType: T,
		componentId: string,
		component: React.ComponentType<any>
	): void {
		if (this.isRegistryAvailable()) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__!.register(contentType, componentId, component);
		}
	}

	public unregister(componentId: string): void {
		if (this.isRegistryAvailable()) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__!.unregister(componentId);
		}
	}

	public getComponent(componentId: string): React.ComponentType<any> | undefined {
		return this.components.get(componentId)?.component;
	}

	public getComponentsByType(contentType: ContentType): Array<{
		componentId: string;
		component: React.ComponentType<any>;
	}> {
		const componentIds = this.contentTypeMap.get(contentType) || new Set();
		return Array.from(componentIds).map(componentId => ({
			componentId,
			component: this.components.get(componentId)!.component
		}));
	}

	public isRegistryAvailable(): boolean {
		return typeof window !== 'undefined' && !!window.__MAKER_NAV_COMPONENT_REGISTRY__;
	}
}

export const registry = ComponentRegistry.getInstance();