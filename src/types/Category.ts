export type Category = {
	id: string,
	title: string,
	description: string,
	image?: string,
	imageWidth?: number,
	imageHeight?: number,
	video?: string,
	children: Category[]
}