import { Product } from '../../src/types'

export const mockProducts: Product[] = [
	{
		id: "1",
		name: "Product 243345",
		otherVariants: [
			{
				name: "Variant 1",
				price: "USD 10.00",
				image: "https://loremipsum.com"
			}
		]
	},
	{
		id: "2",
		name: "Product 2",
		otherVariants: [
			{
				name: "Variant 1",
				price: "USD 1.00",
				image: "https://loremipsum.com"
			}
		]
	}
]