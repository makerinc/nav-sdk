import React from 'react'
import ReactDOM from 'react-dom'
import { Renderer, ComponentLoader, SharedComponentsProvider } from '../../index'
import { mockProducts } from './mock'

const renderImage = (props) => {
	return (<img
		aria-label="rendered by examples"
		src={props.src}
		alt={props.alt}
		loading={props.priority == 0 ? 'eager' : 'lazy'}
		style={{
			objectFit: props.fit,
			objectPosition: 'center',
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: 0,
			left: 0
		}}
	/>)
}

const renderVideo = (props) => {
	return (<video
		aria-label="rendered by examples"
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
	/>)
}

let renderCategoryLink = (props) => {
	return (<a href={props.href}>{props.children}</a>)
}

let renderProductLink = (props) => {
	return (<a href={props.href}>{props.children}</a>)
}

ReactDOM.render(
	<React.StrictMode>
		<SharedComponentsProvider renderImage={renderImage} renderVideo={renderVideo} renderCategoryLink={renderCategoryLink} renderProductLink={renderProductLink}>
			{mockProducts.map((product) =>
				<Renderer key={product.id} componentId={"my-custom-product-card"} data={product} renderFallback={() => <div>No component found for componentId: my-custom-product-card</div>} />
			)}
			<ComponentLoader url="/examples/builder/CustomProductCard.js" />
		</SharedComponentsProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
