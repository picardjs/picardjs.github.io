# Single-Page Apps

In a single-page app, Picard.js runs in the browser next to your framework. The framework renders `pi-component` (and `pi-slot`) elements, and Picard.js renders the micro frontends into them. Both sides stay independent: your framework owns the elements, and Picard.js owns their content.

## Setup

Install the package and start Picard.js once, usually in the entry module next to the start of your app:

```sh
npm i picard-js
```

```ts
import { initializePicard } from 'picard-js/client';

initializePicard({
  feed: 'https://feed.piral.cloud/api/v1/microfrontends/picard-demos',
});
```

Then use the elements anywhere in your templates:

```html
<pi-component name="counter" source="pi-simple-html"></pi-component>
```

There's no need to wait for Picard.js before rendering your app. The elements upgrade as soon as Picard.js has defined them, and they render once their micro frontend is known.

## Framework Notes

Each framework needs to accept `pi-*` as custom elements. Beyond that, there's little to do:

| Framework | What to do | Sample |
| --------- | ---------- | ------ |
| Angular | Add `CUSTOM_ELEMENTS_SCHEMA` to the `schemas` of the component using the elements. | [angular/spa](https://github.com/picardjs/samples/tree/main/angular/spa) |
| React | Nothing at runtime. For TypeScript, add `pi-component` to `JSX.IntrinsicElements`. | [react/spa](https://github.com/picardjs/samples/tree/main/react/spa) |
| Vue | Set `compilerOptions.isCustomElement: (tag) => tag.startsWith('pi-')` in the Vue plugin options. | [vue/spa](https://github.com/picardjs/samples/tree/main/vue/spa) |
| Svelte | Nothing. Write JSON data as an expression, e.g., `data={'{"start":5}'}`, because Svelte interprets curly braces in attributes. | [svelte/spa](https://github.com/picardjs/samples/tree/main/svelte/spa) |
| Solid | Declare the `pi-*` elements for JSX. | [solid/ssr](https://github.com/picardjs/samples/tree/main/solid/ssr) |

React example for the typing:

```tsx
declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      ['pi-component']: { name: string; source: string; data?: string };
    }
  }
}
```

## Passing Data

The `data` of a component can be given as an attribute with serialized JSON, or as a property with an object or serialized JSON:

```html
<pi-component name="ssr-counter" source="pi-ssr-html" data='{"start":5}'></pi-component>
```

```js
element.data = { start: 5 };
element.data = '{"start":5}'; // the same
```

Many frameworks (Vue, Svelte, Solid, React 19) set the *property* when one exists, often with the attribute's string value, so both forms are accepted. When the data changes, Picard.js calls the component's `update` lifecycle instead of mounting it again. The [SolidStart sample](https://github.com/picardjs/samples/tree/main/solid/ssr) binds a signal to `data` and shows the micro frontend updating as you type.

## Mounting and Unmounting

When your framework removes a `pi-component` element (e.g., on a route change), Picard.js unmounts the component. When the element is only *moved* (e.g., by a keyed list or by streamed rendering), the component is kept.

## Module Federation Hosts

If your app is itself a Module Federation host (webpack, rspack, Rsbuild, or Vite with the Module Federation plugin), Picard.js can join it. Picard.js uses its own Module Federation runtime instance, but initializes containers with the share scope of the page's runtime. A remote used by both is loaded only once, and the shared dependencies are negotiated together. See the [Rsbuild sample](https://github.com/picardjs/samples/tree/main/rsbuild/mf).

## Client-Side Routing

Picard.js has an optional router for pages exposed by micro frontends (`pi-slot rel="router"`, see [Routing](../../api/usage/routing.md)). It only intercepts link clicks while such a slot is on the page. If your framework brings its own router, or you use a multi-page site, the links behave as usual.
