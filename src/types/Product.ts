export type MetadataValue = {
	_0: string | number | undefined;
}

export type Metadata = {
	[key: string]: MetadataValue;
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
	imageSize?: number[];
	additionalImageSizes?: Array<number[]>;
	imageLink: string;
	moreImageLinks: string;
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

export type Product = {
	id: string;
	title: string;
	link: string;
	productType: string;
	variants: Variant[];
	metadata?: Metadata;
}