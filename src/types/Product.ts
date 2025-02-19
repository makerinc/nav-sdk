export type Variant = {
	name: string
	price: string
	image: string
}

export type Product = {
	id: string
	name: string
	otherVariants: Variant[]
}