import { Product } from './Product'
import { Category } from './Category'

export type ContentType = 'product' | 'category' | 'none';

export type Content =
	| { type: 'product'; data: Product }
	| { type: 'category'; data: Category }
	| { type: 'none'; data: null };


export interface ContextState {
	content: Content;
	loading: boolean;
	error: string | null;
}
