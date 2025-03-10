# Maker Nav SDK

A React toolkit to help you build custom components for [Maker Nav](https://maker.co/nav) with Typescript declarations.

<img width="1575" alt="Nav SDK overview" src="https://github.com/user-attachments/assets/37af531c-0dfb-4f73-8f6d-42deef6d38ab" />

## Contents
- [Get Started](#get-started)
- [Usage](#usage)
- [CLI](#cli)
  - [CLI Configuration](#cli-configuration)
- [API](#api)
  - [`registry.register(type, id, component)`](#registryregistertype-id-component)
- [Components](#components)  
  - [`<NavImage />`](#navimage-)
  - [`<NavVideo />`](#navvideo-)
  - [`<NavLink />`](#navlink-)

## Get Started

### Prerequisites
- React 16.14 or higher (features of React 18 or higher are not yet supported.)
- Typescript

### Installation

#### NPM:
```bash
npm install @makerinc/nav-sdk
```

#### Yarn:
```bash
yarn add @makerinc/nav-sdk
```

### Starter Project
If you'd like to self-host your Nav components, you can clone our starter project:
[makerinc/nav-sdk-starter-project](https://github.com/makerinc/nav-sdk-starter-project?tab=readme-ov-file#getting-started)

## Usage
Register your custom components using the provided `registry.register()` function inside your main React app. Data fetching and syncing will be handled by Nav and the registry will pass the data down to your custom component as props.

```tsx
import React from "@makerinc/nav-sdk/react"; // ⚠️ see note below
import { registry, DataType } from "@makerinc/nav-sdk";

type Props = {
  data: DataType.Product
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

## CLI
With Nav SDK command line interface, you can build your custom components and publish them to Nav editor without having to leave your IDE.

First you'll need to ensure that SDK is installed globally on your system:

```bash
npm install -g @makerinc/nav-sdk
```

You can now run `nav-sdk hi` to make sure the CLI has been installed correctly and to verify that you are on the latest version.

Once done, you are now ready to:
- Run `nav-sdk login` to authenticate with your Nav account.
- Run `nav-sdk build` to make build output for all your components and prepare them for publishing. By default, this will build all components in the `src/components` directory and output them to the `node_modules/.nav-sdk` directory but you can configure this in your `navsdk.config.json` file on the root of your project. [Learn more about configuring the build](#cli-configuration).
- Run `nav-sdk publish` to publish your built components to Nav editor. This will automatically detect the components that have been built and prompt you to select which ones you want to publish with an option to bump the version of the component.


### CLI Configuration

Nav SDK can be configured using a `navsdk.config.json` file in the root of your project. This file allows you to configure the paths to your components and the output directory for the built components used by the CLI.

Default configuration looks as follows:
```json
{
  "paths": [
    "src/components/**/*.tsx",
    "src/components/**/*.ts",
    "src/components/**/*.jsx",
    "src/components/**/*.js"
  ],
  "outputDir": "node_modules/.nav-sdk"
}
```

#### Paths

The `paths` property is an array of glob patterns that specify the paths to your components. This allows you to include or exclude specific files from the build process.

#### Output Directory

The `outputDir` property is the directory where the built components will be output. This directory will be created if it doesn't exist.

## API
### `registry.register(type, id, component)`

Import it like this `import { registry } from '@makerinc/nav-sdk'`

This is the main entrypoint for your custom components to be registered with Nav.

| Parameter | Type | Description |
| --- | --- | --- |
| type | `'product-card' \| 'category-card' \| 'banner' \| 'products-section' \| 'categories-section' \| 'banners-section'` and [more...](https://github.com/makerinc/nav-sdk/blob/main/src/types/index.ts) | The type of component to be registered. This influences the type of data passed to your component.
| id | `string` | The id of the component, this will be used to tell Nav which component to render in a specific node or section. <br><i>It must be unique for each custom component.</i> |
| component | `({ data }) => JSX.Element` | React component to be rendered by Nav. <br>The `data` prop will be of type [`DataType.Product`](https://github.com/makerinc/nav-sdk/blob/main/src/types/index.ts), [`DataType.Category`](https://github.com/makerinc/nav-sdk/blob/main/src/types/index.ts) or [`DataType.Banner`](https://github.com/makerinc/nav-sdk/blob/main/src/types/index.ts) depending on the `type` parameter.

## Components

### `<NavImage />`

Import it like this `import { NavImage } from '@makerinc/nav-sdk'`

Optimized for performance with features like lazy-loading, CDN caching and viewport based queueing & prioritization.

| Prop | Type | Description |
| --- | --- | --- |
| src | `string` | The URL of the image. |
| alt | `string` | The alt text of the image. |
| priority | `number` | The priority of the image. Images with a higher priority will be queued and loaded first. Defaults to `0`.
| fit | `'cover' \| 'contain' \| 'scale-down'` | The fit of the image.

---

### `<NavVideo />`

Import it like this `import { NavVideo } from '@makerinc/nav-sdk'`.

Allows queuing and autoplaying of visible videos one by one and progressively loads the videos on a page instead of all at once. Along with standard web video formats, it also supports HLS format - you just need to provide the HLS URL in `src`!

| Prop | Type | Description |
| --- | --- | --- |
| src | `string` | The URL of the video. |
| autoplay | `boolean` | Whether the video should autoplay. |
| muted | `boolean` | Whether the video should be muted. |
| loop | `boolean` | Whether the video should loop. |
| controls | `boolean` | Whether the video should have controls. |
| poster | `string` | The URL of the poster image. |
| fit | `'cover' \| 'contain' \| 'scale-down'` | The fit of the video.

---

### `<NavLink />`

Import it like this `import { NavLink } from '@makerinc/nav-sdk'`

Allows internal navigation to listing page or opening external link with built-in analytics tracking.

| Prop | Type | Description |
| --- | --- | --- |
| target | `'product' \| 'category' \| '_self' \| '_blank' \| '_parent' \| '_top'` | The target of the link. When target is `product` or `category`, Nav will perform internal navigation to listing page rather than opening external link. |
| productId | `string` | The id of the product to link to. Required only when target is set to `product` |
| variantId | `string \| undefined` | The id of the variant to link to. Required only when target is set to `product` |
| categoryId | `string` | The id of the category to link to. Required only when target is set to `category` or `product` |
| href | `string` | The URL to link to. |
| children | `React.ReactNode` | The children of the link. |
