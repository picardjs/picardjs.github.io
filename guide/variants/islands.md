# Islands Variant

The islands variant (`picard-js/islands`) is the lightweight client that resumes a page rendered by the [Node.js variant](./node.md). You usually don't reference it yourself: with `interactive: true`, the `script` part of the server rendering includes it.

```html
<pi-part name="script"></pi-part>
```

becomes

```html
<script type="pi-config">{"componentName":"pi-component", ..., "state":{...}}</script>
<script type="module">requestAnimationFrame(()=>setTimeout(()=>import("/picard/picard.js")))</script>
```

The islands script reads the configuration and state from the `pi-config` script, so it doesn't need to fetch the feed again. It then defines the web components:

- components with server-rendered content (marked with `hydrate`) are hydrated, i.e., `mount` is called with `locals.hydrate` set,
- the others (e.g., marked with `server="none"`) are rendered in the browser,
- the `client` attribute (`load`, `idle`, `visible`, `none`) controls when each component is resumed.

It loads after the first paint, so it stays off the critical rendering path, and it loads the Module Federation runtime only when needed.

## Hosting the Script

By default the Node.js variant points to the islands variant on unpkg, matching the installed version. To serve it yourself, set `scriptUrl` and serve the files returned by `getIslandsFile`:

```ts
import { getIslandsFile, getIslandsFileNames, initializePicard } from 'picard-js/node';

const picard = initializePicard({ feed, interactive: true, scriptUrl: '/picard/picard.js' });

// per request
app.get('/picard/:file', (req, res) => { /* send getIslandsFile(req.params.file) */ });

// or at build time: write every file of getIslandsFileNames() next to the pages
```

## Client Services and Dependencies

Services and shared dependencies for the browser can't be serialized as functions. Pass them as URLs of ES modules with the `client` option of the Node.js variant:

```ts
initializePicard({
  feed,
  interactive: true,
  client: {
    // default export: the service creator
    services: { 'framework.react': '/converters/react.mjs' },
    // the module of a shared dependency
    dependencies: { 'react@18.3.1': '/deps/react.mjs' },
  },
});
```

:point_right: Every SSR and SSG sample uses the islands variant. Start with the [Server-Side Rendering guide](../integrations/ssr.md).
