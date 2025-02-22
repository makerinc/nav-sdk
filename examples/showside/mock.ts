import { Product } from '../../src/types'

export const mockProducts: Product[] = [
	{
		id: "P12345",
		title: "Premium Cotton T-Shirt",
		link: "https://example.com/products/premium-cotton-tshirt",
		productType: "Apparel",
		variants: [
			{
				title: "Premium Cotton T-Shirt - Medium - Blue",
				size: "M",
				color: "Blue",
				pattern: "Solid",
				material: "100% Cotton",
				price: "29.99",
				salePrice: "24.99",
				style: "Casual",
				description: "A soft and comfortable premium cotton t-shirt, perfect for everyday wear.",
				groupId: "G123",
				id: "V12345",
				imageSize: [500, 500],
				additionalImageSizes: [[1000, 1000], [1500, 1500]],
				imageLink: "https://example.com/images/tshirt-blue.jpg",
				moreImageLinks: "https://example.com/images/tshirt-blue-side.jpg,https://example.com/images/tshirt-blue-back.jpg",
				customLabel0: "Best Seller",
				customLabel1: "Organic Cotton",
				availability: "In Stock",
				availableQuantity: 100,
				link: "https://example.com/products/premium-cotton-tshirt?variant=V12345",
				brand: "FashionX",
				mpn: "FX-T123",
				tags: ["t-shirt", "cotton", "casual", "blue", "premium"],
				metadata: {
					weight: { _0: "200g" },
					origin: { _0: "India" },
					careInstructions: { _0: "Machine wash cold" }
				},
				currency: "USD"
			}
		],
		metadata: {
			category: { _0: "Clothing" },
			gender: { _0: "Unisex" },
			season: { _0: "All Season" }
		}
	},
	{
		id: "P12346",
		title: "Premium Cotton T-Shirt",
		link: "https://example.com/products/premium-cotton-tshirt",
		productType: "Apparel",
		variants: [
			{
				title: "Premium Cotton T-Shirt - Medium - Blue",
				size: "M",
				color: "Blue",
				pattern: "Solid",
				material: "100% Cotton",
				price: "29.99",
				salePrice: "24.99",
				style: "Casual",
				description: "A soft and comfortable premium cotton t-shirt, perfect for everyday wear.",
				groupId: "G123",
				id: "V12345",
				imageSize: [500, 500],
				additionalImageSizes: [[1000, 1000], [1500, 1500]],
				imageLink: "https://example.com/images/tshirt-blue.jpg",
				moreImageLinks: "https://example.com/images/tshirt-blue-side.jpg,https://example.com/images/tshirt-blue-back.jpg",
				customLabel0: "Best Seller",
				customLabel1: "Organic Cotton",
				availability: "In Stock",
				availableQuantity: 100,
				link: "https://example.com/products/premium-cotton-tshirt?variant=V12345",
				brand: "FashionX",
				mpn: "FX-T123",
				tags: ["t-shirt", "cotton", "casual", "blue", "premium"],
				metadata: {
					weight: { _0: "200g" },
					origin: { _0: "India" },
					careInstructions: { _0: "Machine wash cold" }
				},
				currency: "USD"
			}
		],
		metadata: {
			category: { _0: "Clothing" },
			gender: { _0: "Unisex" },
			season: { _0: "All Season" }
		}
	},
]