# Maker Nav SDK

A React toolkit to help you build custom components for [Maker Nav](https://maker.co/nav) with Typescript declarations.

## Contents
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [API](#api)
  - [`registry.register(type, id, component)`](#registryregistertype-id-component)
  - [`<Image />`](#image-)
  - [`<Video />`](#video-)

## Installation

#### NPM:
```bash
npm install @makerinc/nav-sdk
```

#### Yarn:
```bash
yarn add @makerinc/nav-sdk
```

## Prerequisites

- React 16.14 or higher (features of React 18 or higher are not yet supported.)
- Typescript

## Usage
Register your custom components using the provided `registry.register()` function inside your main React app. Data fetching and syncing will be handled by Nav and the registry will pass the data down to your custom component as props.

```tsx
import React from "@makerinc/nav-sdk/react"; // ⚠️ see note below
import { registry, Product } from "@makerinc/nav-sdk";

type Props = {
  data: Product
}

const MyCustomProductCard = ({data}: Props) => {
  return (
    // Your component code here
  );
};

registry.register("product-card", "my-product-card", MyCustomProductCard);

export default MyCustomProductCard;
```

> **⚠️ Important Note:** The `react` import from `@makerinc/nav-sdk` is required for the hooks to correctly work inside Nav as React would not recognize and track hook usage correctly when the instances are different.
>
>If you wish to use your existing React component in Nav, you can simply replace the react import in your component like so:
> #### Before:
> ```tsx
> import React, {useState, useMemo, ...others} from "react";
> ```
> #### After:
> ```tsx
> import React from "@makerinc/nav-sdk/react";
> const useState = React.useState;
> const useMemo = React.useMemo;
> // ...others
> ```

## API
### `registry.register(type, id, component)`

| Parameter | Type | Description |
| --- | --- | --- |
| type | `'product-card' \| 'category-card' \| 'banner' \| 'products-section' \| 'categories-section' \| 'banners-section'` | The type of component to be registered. This influences the type of data passed to your component. <br><br>See [`ComponentTypeMapping`](https://github.com/makerinc/nav-sdk/blob/main/src/types/ComponentTypeMapping.ts) for available types.
| id | `string` | The id of the component, this will be used to tell Nav which component to render in a specific node or section. <br><br>It must be unique for each custom component. |
| component | `({ data }) => JSX.Element` | React component to be rendered by Nav. <br><br>`data` will be of type [`Product`](https://github.com/makerinc/nav-sdk/blob/main/src/types/Product.ts), [`Category`](https://github.com/makerinc/nav-sdk/blob/main/src/types/Category.ts) or [`Banner`](https://github.com/makerinc/nav-sdk/blob/main/src/types/Banner.ts) depending on the `type` parameter.

---

### `<Image />`

Import it like this `import { Image } from '@makerinc/nav-sdk'`

> We highly recommend using the Image component in your custom Nav components, it is optimized for performance with features like lazy-loading, CDN caching and viewport based queueing & prioritization.

| Prop | Type | Description |
| --- | --- | --- |
| src | `string` | The URL of the image. |
| alt | `string` | The alt text of the image. |
| priority | `number` | The priority of the image. Images with a higher priority will be queued and loaded first. Defaults to `0`.
| fit | `'cover' \| 'contain' \| 'scale-down'` | The fit of the image.

---

### `<Video />`

Import it like this `import { Video } from '@makerinc/nav-sdk'`.

| Prop | Type | Description |
| --- | --- | --- |
| src | `string` | The URL of the video. |
| autoplay | `boolean` | Whether the video should autoplay. |
| muted | `boolean` | Whether the video should be muted. |
| loop | `boolean` | Whether the video should loop. |
| controls | `boolean` | Whether the video should have controls. |
| poster | `string` | The URL of the poster image. |
| fit | `'cover' \| 'contain' \| 'scale-down'` | The fit of the video.

