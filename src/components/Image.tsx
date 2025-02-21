import React from "react";

declare module "react" {
	interface ImgHTMLAttributes<T> extends React.HTMLAttributes<T> {
		fetchpriority?: 'high' | 'low' | 'auto';
	}
}

import SharedComponents from './SharedComponents';

export type Props = {
	src: string;
	alt: string;
	fit: 'cover' | 'contain' | 'scale-down';
	priority: number;
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
				left: 0,
				zIndex: props.priority
			}}
		/>
	)
}

export default Image;