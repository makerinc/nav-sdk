// TODO: actually match the product data with Showside

export type Variant = {
	name: string
	price: string
	image: string
}

export type Product = {
	name: string
	variants: Variant[]
}