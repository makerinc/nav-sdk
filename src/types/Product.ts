
export type Product = {
	id: string;
	title: string;
	link?: string;
	productType: string;
	categoryId: string;
	variants: Variant[];
	metadata?: Metadata;
}

export type Variant = {
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
	metadata?: Metadata;
	currency?: string;
};

export type Metadata = {
	[key: string]: MetadataValue;
}

export type MetadataValue = {
	_0: string | number | undefined;
}