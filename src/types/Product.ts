export type Variant = {
	name: string
}

export type Product = {
	id: string
	name: string
	description?: string
	otherVariants: Variant[]
}