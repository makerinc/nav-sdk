import { Product } from '../../src/types'

export const mockProducts: Product[] = [
	{
		name: "Product 1",
		variants: [
			{
				name: "Variant 1",
				price: "USD 10.00",
				image: "https://loremipsum.com"
			}
		]
	},
	{
		name: "Product 2",
		variants: [
			{
				name: "Variant 1",
				price: "USD 1.00",
				image: "https://loremipsum.com"
			}
		]
	}
]