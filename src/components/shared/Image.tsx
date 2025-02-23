import SharedComponents from '../SharedComponents';

export type Props = {
	src: string;
	alt: string;
	priority: number;
	fit: 'cover' | 'contain' | 'scale-down';
}

const Image = (props: Props) => {
	let { renderImage } = SharedComponents.useContext();

	if (typeof renderImage === 'function') {
		return renderImage(props);
	}

	return (
		<img
			src={props.src}
			alt={props.alt}
			loading={props.priority == 0 ? 'eager' : 'lazy'}
			fetchpriority={props.priority == 0 ? 'high' : 'low'}
			style={{
				objectFit: props.fit,
				objectPosition: 'center',
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: 0,
				left: 0
			}}
		/>
	)
}

export default Image;