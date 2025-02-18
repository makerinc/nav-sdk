export type onClick = () => void

export type Category = {
	title: string,
	description: string,
	image?: string,
	video?: string,
	onClick?: onClick,
	children: Category[]
}