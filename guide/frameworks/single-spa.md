# Using single-spa Components

## Introduction

The single-spa JavaScript library allows multiple frameworks like React, Angular, and Vue to coexist in a single application. It facilitates the creation of independent, self-contained components, each deployable and maintainable on its own. This component model enhances flexibility and scalability, enabling teams to work on different parts of an application simultaneously without conflicts.

The key advantage of single-spa's component model is its support for gradual upgrades and technology migrations. Developers can update or refactor individual components incrementally, ensuring continuous improvement with minimal disruption. With its straightforward API and robust features, single-spa simplifies the integration and orchestration of diverse front-end microservices, fostering modular and resilient web applications.

## Using single-spa in Picard.js

Let's see how an example single-spa component can be exposed:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  errorBoundary() {
    return <div>Error</div>;
  },
  loadRootComponent: () => import('./Product').then((mod) => mod.default),
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
export const update = lifecycles.update;
```

With this definition your component lifecycle is properly exported. The exported methods are all part of the standard single-spa component model.

Now you can use this single-spa component in a `pi-component` as follows:

```html{4}
<pi-component
  name="MyComponent"
  source="some-mfe"
  framework="single-spa"
></pi-component>
```

This will only work in the client, as single-spa does not define any functions that could be used for server-side rendering. In server-rendered pages, mark such components with `server="none"`.
