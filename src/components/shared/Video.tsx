import SharedComponents from "../SharedComponents";

export type Props = {
	src: string;
	autoplay: boolean;
	muted: boolean;
	loop: boolean;
	controls: boolean;
	poster: string;
	fit: "cover" | "contain" | "scale-down";
};

const Video = (props: Props) => {
	let { renderVideo } = SharedComponents.useContext();

	if (typeof renderVideo === "function") {
		return renderVideo(props);
	}

	return (
		<video
			src={props.src}
			autoPlay={props.autoplay}
			poster={props.poster}
			controls={props.controls}
			muted={props.muted}
			loop={props.loop}
			style={{
				width: "100%",
				height: "100%",
				position: "absolute",
				top: 0,
				left: 0,
				objectFit: props.fit,
			}}
		/>
	);
};

export default Video;