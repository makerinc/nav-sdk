import React from 'react'
import { Renderer, ComponentLoader, SharedComponentsProvider } from '../../src/index'
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

let renderBuyButton = (props) => {
	if (props.action === 'add-to-cart') {
		return (<button onClick={() => console.log("add to cart clicked!", props)}>{props.children}</button>)
	} else if (props.action === 'buy-now') {
		return (<button onClick={() => console.log("buy now clicked!", props)}>{props.children}</button>)
	} else {
		return (<button onClick={() => console.log("unknown action clicked!", props)}>{props.children}</button>)
	}
}

let renderProductForm = (props) => {
	return (<form onSubmit={(e) => {
		e.preventDefault()
		console.log("form submitted!", props)
	}}>
		{props.children}
	</form>)
}

let renderProductVariantPicker = (props) => {
	return (<div>variant picker not implemented</div>)
}

let renderProductQuantityPicker = (props) => {
	return (<div>quantity picker not implemented</div>)
}

export default function App() {
	const [mountLoader, setMountLoader] = React.useState(false)
	const [mountRenderer, setMountRenderer] = React.useState(false)

	return (
		<SharedComponentsProvider
			renderImage={renderImage}
			renderVideo={renderVideo}
			renderCategoryLink={renderCategoryLink}
			renderProductLink={renderProductLink}
			renderBuyButton={renderBuyButton}
			renderProductForm={renderProductForm}
			renderProductVariantPicker={renderProductVariantPicker}
			renderProductQuantityPicker={renderProductQuantityPicker}>
			<label htmlFor='mount-loader'><input name="mount-loader" type="checkbox" checked={mountLoader} onChange={(e) => setMountLoader(e.target.checked)} />Mount Loader</label> <br />
			<label htmlFor='mount-renderer'><input name="mount-renderer" type="checkbox" checked={mountRenderer} onChange={(e) => setMountRenderer(e.target.checked)} />Mount Renderer</label>
			{mountRenderer ? mockProducts.map((product) =>
				<Renderer key={product.id} componentId={"my-custom-product-card"} data={product} renderFallback={() => <div>No component found for componentId: my-custom-product-card</div>} additionalProps={{ test: "example prop value" }} />
			) : null}
			{mountLoader ?
				<ComponentLoader url="http://localhost:5173/builder/CustomProductCard.js" /> : null}
		</SharedComponentsProvider>)
}