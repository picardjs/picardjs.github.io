# Default Component Lifecycle

## Introduction

Picard.js introduces its own lifecycle for components to ensure consistent management and orchestration across diverse frameworks and platforms. Each framework, such as React, Angular, or Vue, has unique lifecycle methods and hooks for mounting, updating, and unmounting components, leading to challenges in maintaining uniform behavior in a micro frontend architecture.

By establishing a standardized lifecycle, Picard.js abstracts these differences, providing a unified interface for component management. This independence allows Picard.js to seamlessly integrate and control components regardless of their underlying frameworks, ensuring smooth and predictable interactions within the application.

Moreover, introducing a custom lifecycle enables Picard.js to efficiently handle server-side rendering (SSR) and client-side hydration, crucial for modern web applications that require optimal performance and SEO. By defining its own lifecycle methods, Picard.js can ensure that components are rendered, updated, and unmounted consistently on both the server and client.

This approach not only simplifies the development process but also enhances the reliability and maintainability of the application, allowing developers to focus on building features without worrying about framework-specific intricacies. In essence, a unified lifecycle is pivotal for Picard.js to provide a robust, flexible, and framework-agnostic micro frontend orchestration solution.

## Exposing a Component Lifecycle

The lifecycle of Picard.js is defined by the following methods:

- `load` (client): Run on first initialization of a component; possibility to load more packages and prepare the environment
- `mount` (client): Runs once when a component should be added to the DOM
- `update` (client): Runs every time the `data` (input) of the mounted component should change
- `unmount` (client): Runs once when the mounted component should be removed from the DOM
- `unload` (client): Runs when a micro frontend is destroyed and `load` for the component was called previously
- `bootstrap` (server): Run on first initialization of a component; possibility to load more packages and prepare the environment
- `stringify` (server): Runs when a component should be rendered on the server - this has to produce a string

Pretty much all of these are *optional*, however, if you want to render a component on the client you'll need to implement at least the `mount` function. Likewise, if you require your component to be rendered on the server, you'll need to provide a `stringify` function.

### Empty Lifecycle

A simple implementation that does nothing except for satisfying the interface for a component lifecycle looks like this:

```js
const component = {
  async load() {},
  mount() {},
  update() {},
  unmount() {},
  async unload() {},
  async bootstrap() {},
  async stringify() {
    return '';
  },
};
```

### React Example

Let's create an example lifecycle for some React component referred to `Component`:

```js
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import Component from './Component';

const component = {
  async load() {},
  mount(container, props, locals) {
    locals.root = createRoot(container);
    locals.root.render(<Component {...props} />);
  },
  update(props, locals) {
    locals.root.render(<Component {...props} />);
  },
  unmount(container, locals) {
    locals.root.unmount();
  },
  async unload() {},
  async bootstrap() {},
  async stringify(props) {
    return renderToString(<Component {...props} />);
  },
};
```

To *hydrate* the server-rendered markup instead of rendering it again, check `locals.hydrate` in `mount`:

```js
mount(container, props, locals) {
  if (locals.hydrate) {
    locals.root = hydrateRoot(container, <Component {...props} />);
  } else {
    locals.root = createRoot(container);
    locals.root.render(<Component {...props} />);
  }
},
```

:point_right: The [`pi-ssr-html`](https://github.com/picardjs/samples/tree/main/shared/pi-ssr-html) and [`nf-ssr-html`](https://github.com/picardjs/samples/tree/main/shared/nf-ssr-html) micro frontends of the samples implement this lifecycle without a framework, including `update`.

In this example the `load`, `unload`, and `bootstrap` functions remain unused. In general you might want to use them to start (or end) some loading process that is relevant for the given component.
