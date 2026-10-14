# Using Picard.js with Node.js

Using Picard.js in Node.js works by importing the `initializePicard` function from the `picard-js/node` module.

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
import { initializePicard } from 'picard-js/node';

const picard = initializePicard({
  // configure here
});
```

The configuration is fully typed. For instance, to load the micro frontends from a micro frontend discovery service you can set the `feed` option:

```js
import { initializePicard } from 'picard-js/node';

const picard = initializePicard({
  feed: 'https://feed.piral.cloud/api/v1/pilet/tractor-ssr-demo',
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
import { initializePicard } from 'picard-js/node';

const picard = initializePicard({
  feed: () =>
    fetch('https://feed.piral.cloud/api/v1/pilet/tractor-ssr-demo', {
      headers: {
        // your custom headers here
      }
    }).then(res => res.json()),
});
```

## Decorating HTML

`initializePicard` returns a decorator. Its `decorate` function renders the micro frontends into a piece of HTML, from a full document down to a single element:

```js
const html = await picard.decorate(`
  <pi-component name="ssr-counter" source="pi-ssr-html" data='{"start":5}'></pi-component>
`);
```

Components without a `stringify` lifecycle, or marked with `server="none"`, are left empty. The `pi-part` elements are replaced, e.g., `<pi-part name="style">` with the stylesheets of the micro frontends.

## Resuming in the Browser

To make the server-rendered components interactive, set `interactive: true` and place `<pi-part name="script">` at the end of the body. It's replaced with the state and the [islands script](./islands.md), which hydrates the server-rendered components and renders the others:

```js
import { getIslandsFile, initializePicard } from 'picard-js/node';

const picard = initializePicard({
  feed: 'https://feed.piral.cloud/api/v1/microfrontends/picard-demos',
  interactive: true,
  // serve the islands script yourself (default: unpkg)
  scriptUrl: '/picard/picard.js',
});

app.get('/picard/:file', (req, res) => {
  const content = getIslandsFile(req.params.file);

  if (content === undefined) {
    res.sendStatus(404);
  } else {
    res.type('text/javascript').send(content);
  }
});
```

The [Server-Side Rendering guide](../integrations/ssr.md) shows how to integrate this with frameworks such as Next.js, Nuxt, SvelteKit, Angular, or Astro.

## Runtimes

The Node.js variant also runs on [Bun](https://github.com/picardjs/samples/tree/main/bun/ssr) and [Deno](https://github.com/picardjs/samples/tree/main/deno/ssr) (via `npm:picard-js/node`).

ES modules (e.g., Native Federation) are evaluated on the server with `vm.SourceTextModule`. Node.js requires the `--experimental-vm-modules` flag for this; Bun and Deno don't. Other formats work without the flag.

```sh
node --experimental-vm-modules server.mjs
```
