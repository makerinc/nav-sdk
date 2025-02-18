import { ContentType } from '../types';
import React from 'react';

declare global {
	interface Window {
		__MAKER_NAV_COMPONENT_REGISTRY__?: {
			register: <T extends ContentType>(
				contentType: T,
				UUID: string,
				component: React.ComponentType<any>
			) => void;
			unregister: (UUID: string) => void;
			get: (UUID: string) => React.ComponentType<any> | undefined;
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
		if (typeof window !== 'undefined' && !window.__MAKER_NAV_COMPONENT_REGISTRY__) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__ = {
				register: <T extends ContentType>(
					contentType: T,
					UUID: string,
					component: React.ComponentType<any>
				) => {
					this.components.set(UUID, {
						contentType,
						component
					});

					if (!this.contentTypeMap.has(contentType)) {
						this.contentTypeMap.set(contentType, new Set());
					}
					this.contentTypeMap.get(contentType)!.add(UUID);

					window.dispatchEvent(
						new CustomEvent('component-registered', {
							detail: { contentType, UUID }
						})
					);
				},
				unregister: (UUID: string) => {
					const component = this.components.get(UUID);
					if (component) {
						const typeSet = this.contentTypeMap.get(component.contentType);
						if (typeSet) {
							typeSet.delete(UUID);
							if (typeSet.size === 0) {
								this.contentTypeMap.delete(component.contentType);
							}
						}
						this.components.delete(UUID);

						window.dispatchEvent(
							new CustomEvent('component-unregistered', {
								detail: { UUID }
							})
						);
					}
				},
				get: (UUID: string) => {
					return this.components.get(UUID)?.component;
				}
			};
		}
	}

	public static getInstance(): ComponentRegistry {
		if (!ComponentRegistry.instance) {
			ComponentRegistry.instance = new ComponentRegistry();
		}
		return ComponentRegistry.instance;
	}

	public register<T extends ContentType>(
		contentType: T,
		UUID: string,
		component: React.ComponentType<any>
	): void {
		if (this.isRegistryAvailable()) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__!.register(contentType, UUID, component);
		}
	}

	public unregister(UUID: string): void {
		if (this.isRegistryAvailable()) {
			window.__MAKER_NAV_COMPONENT_REGISTRY__!.unregister(UUID);
		}
	}

	public getComponent(UUID: string): React.ComponentType<any> | undefined {
		return this.components.get(UUID)?.component;
	}

	public getComponentsByType(contentType: ContentType): Array<{
		UUID: string;
		component: React.ComponentType<any>;
	}> {
		const UUIDs = this.contentTypeMap.get(contentType) || new Set();
		return Array.from(UUIDs).map(UUID => ({
			UUID,
			component: this.components.get(UUID)!.component
		}));
	}

	public isRegistryAvailable(): boolean {
		return typeof window !== 'undefined' && !!window.__MAKER_NAV_COMPONENT_REGISTRY__;
	}
}

export const registry = ComponentRegistry.getInstance();