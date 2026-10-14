# Using Picard.js with Bundlers for SPAs

Using Picard.js with bundlers to produce a SPA works by importing the `initializePicard` function from the `picard-js/client` module.

## Installation

First, make sure to install the `picard-js` package from npm:

```sh
npm i picard-js
```

You can also use some other package manager such as:

```sh
# Yarn
yarn add picard-js

# PNPM
pnpm add picard-js
```

## Configuration

Unlike the [browser variant](./browser.md) you will need to start Picard explicitly.

The following shows how this is done.

```js
import { initializePicard } from 'picard-js/client';

const picard = initializePicard({
  // configure here
});
```

The configuration is fully typed. For instance, to load the micro frontends from a micro frontend discovery service you can set the `feed` option:

```js
import { initializePicard } from 'picard-js/client';

const picard = initializePicard({
  feed: 'https://feed.piral.cloud/api/v1/pilet/tractor-demo',
});
```

The `feed` can be supplied as

- a `string` (URL of a micro frontend discovery service),
- an array of pilet definitions following [`PiletMetadata`](https://docs.piral.io/reference/specifications/pilet-specification#root-module-layout),
- an object representing the result of calling a micro frontend discovery service (either following the [Piral Feed Service](https://docs.piral.io/reference/specifications/feed-api-specification) or the [MFEWG schema](https://github.com/awslabs/frontend-discovery/blob/main/schema/v1-pre.json)),
- an object representing a map of names to (native federation) manifest definitions,
- a function returning a promise leading to one of the previous objects.

So, if you want to provide some custom headers when making the request to the micro frontends discovery service you should implement a function:

```js
import { initializePicard } from 'picard-js/client';

const picard = initializePicard({
  feed: () =>
    fetch('https://feed.piral.cloud/api/v1/pilet/tractor-demo', {
      headers: {
        // your custom headers here
      }
    }).then(res => res.json()),
});
```

::: info
Relative URLs in a feed that is given as an object or a function are resolved against the page. Only a feed given as a URL is used as the base for the URLs it contains.
:::

## Using It with a Framework

Start Picard.js once, e.g., in the entry module, and use the `pi-component` elements in your templates. Most frameworks only need to be told that `pi-*` are custom elements. See [Single-Page Apps](../integrations/spa.md) for Angular, React, Vue, Svelte, and Solid, and for coexisting with a Module Federation host.

:point_right: See the [Angular](https://github.com/picardjs/samples/tree/main/angular/spa), [React](https://github.com/picardjs/samples/tree/main/react/spa), [Svelte](https://github.com/picardjs/samples/tree/main/svelte/spa), and [Vue](https://github.com/picardjs/samples/tree/main/vue/spa) samples.
