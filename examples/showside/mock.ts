import { DataType } from '../../src/types'

export const mockProducts: DataType.Product[] = [
	{
		id: "P12345",
		title: "Premium Cotton T-Shirt",
		link: "https://example.com/products/premium-cotton-tshirt",
		productType: "Apparel",
		categoryId: "",
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
				imageLink: "https://makertestingnaman.myshopify.com/cdn/shop/files/man-adjusts-blue-tuxedo-bowtie_925x_f15f8ea8-63ca-49ef-be2b-ee444c832f44.jpg?v=1739515201",
				additionalImageLinks: [],
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
		categoryId: "",
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
				imageLink: "https://makertestingnaman.myshopify.com/cdn/shop/files/red-plaid-shirt_925x_2b126cd2-f8b2-47c1-ac58-0da32ee96437.jpg?v=1739515194",
				additionalImageLinks: [],
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