import { Product, Category, Banner } from '.';

export type ComponentTypeMapping = {
	"product-card": Product;
	"category-card": Category;
	"banner": Banner;
	"categories-section": Category[];
	"products-section": Product[];
	"banners-section": Banner[];
	"custom-section": any;
};
