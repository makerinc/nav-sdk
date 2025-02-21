import { Product } from './product'
import { Category } from './category'

export type ContentType = 'product' | 'category' | 'none';

export type Content =
  | { type: 'product'; data: Product }
  | { type: 'category'; data: Category }
  | { type: 'none'; data: null };

