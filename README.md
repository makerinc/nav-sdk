# Nav SDK

### Installation

NPM:
```bash
npm install @makerinc/nav-sdk
```

Yarn:
```bash
yarn add @makerinc/nav-sdk
```

### Usage
Nav SDK provides a registry function to register your custom components. Data fetching and syncing will be handled by Nav and the regitry will pass the data down to your custom component as props.


```tsx
import { registry, Product } from '@makerinc/nav-sdk';
import React from "@makerinc/nav-sdk/react";

type Props = {
  data: Product
}

const MyCustomProductCard = ({data}: Props) => {
  const [state, setState] = React.useState(0);

  const handleClick = () => {
    setState(state + 1);
  };

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <button onClick={handleClick}>Clicked {state} times</button>
    </div>
  );
};

registry.register('product', 'my-product-card', MyCustomProductCard);

export default MyCustomProductCard;
```

### Registry API
`registry.register(type, id, component)`

| Parameter | Type | Description |
| --- | --- | --- |
| type | 'product' \| 'category' | The type of the component, this determines the type of data that will be passed to your component |
| id | string | The id of the component, this will be used to tell Nav which component to render in a specific node. It must be unique for each custom component. |
| component | React.ComponentType<any> | React component to be rendered by Nav |
