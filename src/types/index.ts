type DataTypeCategory = {
	id: string,
	title: string,
	description: string,
	image?: string,
	imageWidth?: number,
	imageHeight?: number,
	video?: string,
	children: DataTypeCategory[]
}

type DataTypeBanner = {
	id: string;
	title: string;
	description: string;
	image: string;
	imageWidth: number;
	imageHeight: number;
	video?: string;
	link?: string;
}

type DataTypeProduct = {
	id: string;
	title: string;
	link?: string;
	productType: string;
	categoryId: string;
	variants: DataTypeVariant[];
	metadata?: DataTypeMetadata;
}

type DataTypeVariant = {
	title: string;
	size: string;
	color: string;
	pattern: string;
	material: string;
	price: string;
	salePrice: string;
	style: string;
	description: string;
	groupId: string;
	id: string;
	imageLink: string;
	imageSize?: [number, number] | undefined;
	additionalImageLinks: string[];
	additionalImageSizes?: Array<[number, number] | undefined>;
	customLabel0?: string;
	customLabel1?: string;
	customLabel2?: string;
	customLabel3?: string;
	customLabel4?: string;
	customLabel5?: string;
	customLabel6?: string;
	customLabel7?: string;
	customLabel8?: string;
	customLabel9?: string;
	availability?: string;
	availableQuantity?: number;
	link?: string;
	brand?: string;
	mpn?: string;
	tags?: string[];
	metadata?: DataTypeMetadata;
	currency?: string;
};

type DataTypeMetadata = {
	[key: string]: DataTypeMetadataValue;
}

type DataTypeMetadataValue = {
	_0: string | number | undefined;
}

export namespace DataType {
	export type Product = DataTypeProduct;
	export type Category = DataTypeCategory;
	export type Banner = DataTypeBanner;
}

export type ComponentTypeMapping = {
	"product-card": DataType.Product;
	"category-card": DataType.Category;
	"banner": DataType.Banner;
	"categories-section": DataType.Category[];
	"products-section": DataType.Product[];
	"banners-section": DataType.Banner[];
	"custom-section": any;
}