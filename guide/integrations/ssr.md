# Server-Side Rendering

On the server, Picard.js *decorates* HTML. It renders the components of the micro frontends into the `pi-component` and `pi-slot` elements, and replaces the `pi-part` elements with the styles, the state, and the script that resumes everything in the browser. That script is the *islands script*: server-rendered components are hydrated, and the others are rendered in the browser. This is an islands architecture, with each micro frontend as an island.

The same works at build time for static sites. Decorate the generated pages instead of each response.

## The Building Blocks

```ts
import { getIslandsFile, initializePicard } from 'picard-js/node';

const picard = initializePicard({
  feed: 'https://feed.piral.cloud/api/v1/microfrontends/picard-demos',
  // emit the state and the islands script for <pi-part name="script">
  interactive: true,
  // where the browser loads the islands script from (default: unpkg)
  scriptUrl: '/picard/picard.js',
});

// 1. decorate HTML, e.g., in a middleware
const html = await picard.decorate(pageHtml);

// 2. serve the islands script, e.g., at /picard/:file
const content = getIslandsFile(file); // undefined for unknown files
```

The page contains the elements:

```html
<!DOCTYPE html>
<html>
<head>
  <pi-part name="style"></pi-part>
</head>
<body>
  <!-- rendered on the server, hydrated in the browser -->
  <pi-component name="ssr-counter" source="pi-ssr-html" data='{"start":5}'></pi-component>
  <!-- only rendered in the browser -->
  <pi-component name="counter" source="pi-simple-html" server="none"></pi-component>
  <pi-part name="script"></pi-part>
</body>
</html>
```

- `<pi-part name="style">` becomes Picard's base styles and the stylesheets of the micro frontends.
- `<pi-part name="script">` becomes the serialized state (`<script type="pi-config">`) and a module script loading the islands script after the first paint. It's only available with `interactive: true`.
- `server="none"` skips server rendering, e.g., for components without a `stringify` lifecycle.
- Components with server-rendered content get a `hydrate` attribute, so the browser knows to hydrate rather than render.

In the browser, the `client` attribute controls when a component is resumed: `load` (default), `idle`, `visible`, or `none` (never).

To be rendered on the server, a component needs a `stringify` function. To be hydrated, its `mount` checks `locals.hydrate` and attaches to the existing markup instead of rendering it again:

```js
const counter = {
  stringify(props) {
    return `<button class="counter">Count: ${props.start}</button>`;
  },
  mount(container, props, locals) {
    if (!locals.hydrate) {
      container.innerHTML = `<button class="counter">Count: ${props.start}</button>`;
    }

    container.querySelector('.counter').addEventListener('click', /* ... */);
  },
  update(props, locals) { /* new data */ },
  unmount(container, locals) { /* clean up */ },
};
```

The [`pi-ssr-html`](https://github.com/picardjs/samples/tree/main/shared/pi-ssr-html) micro frontend of the samples is a complete example. See the [lifecycle API](../../api/lifecycle/index.md) for details.

## Integration Patterns

Integrating Picard.js on the server comes down to two questions: **where do you get at the HTML?** and **how do you serve the islands script?** The samples cover three patterns.

### Decorating the Whole Page

The simplest pattern: once your framework has produced the page, pass it through `picard.decorate`. Most frameworks have a hook for this:

| Framework | Hook | Sample |
| --------- | ---- | ------ |
| Express | the route handler | [turbo/ssr](https://github.com/picardjs/samples/tree/main/turbo/ssr) |
| Angular SSR | `server.ts`, around `AngularNodeAppEngine.handle` | [angular/ssr](https://github.com/picardjs/samples/tree/main/angular/ssr) |
| Nuxt | a Nitro plugin: `render:html` adds the parts, `render:response` decorates | [nuxt/ssr](https://github.com/picardjs/samples/tree/main/nuxt/ssr) |
| SvelteKit | `transformPageChunk` in `hooks.server.ts` | [sveltekit/ssr](https://github.com/picardjs/samples/tree/main/sveltekit/ssr) |
| SolidStart | a middleware reading the streamed body | [solid/ssr](https://github.com/picardjs/samples/tree/main/solid/ssr) |
| Astro | a middleware (also at build time) | [astro/ssg](https://github.com/picardjs/samples/tree/main/astro/ssg) |
| Bun / Deno | `Bun.serve` / `Deno.serve` | [bun/ssr](https://github.com/picardjs/samples/tree/main/bun/ssr), [deno/ssr](https://github.com/picardjs/samples/tree/main/deno/ssr) |

For example, SvelteKit:

```ts
export const handle: Handle = async ({ event, resolve }) => {
  let html = '';

  return resolve(event, {
    async transformPageChunk(chunk) {
      // streamed pages come in multiple chunks - decorate the whole page
      html += chunk.html;
      return chunk.done ? picard.decorate(html) : '';
    },
  });
};
```

Remove the `content-length` header of the original response when you replace its body. Decorating the whole page means buffering it, so a streamed page arrives at once.

### Decorating Fragments (Streaming)

With streaming frameworks, render each micro frontend separately: decorate a single `pi-component` element and insert the result. In a `Suspense` boundary, the page streams while the micro frontends are being rendered.

| Framework | Approach | Sample |
| --------- | -------- | ------ |
| Next.js (App Router) | an async Server Component awaiting `picard.decorate(...)` | [next/ssr](https://github.com/picardjs/samples/tree/main/next/ssr) |
| React Router (framework mode) | loaders return `picard.decorate(...)` without awaiting it, rendered with `Await` | [react-router/ssr](https://github.com/picardjs/samples/tree/main/react-router/ssr) |
| TanStack Start | loaders call a server function (`createServerFn`) and return its promise, rendered with `Await` | [tanstack/ssr](https://github.com/picardjs/samples/tree/main/tanstack/ssr) |
| Qwik City | a `server$` function called from a task | [qwik/ssg](https://github.com/picardjs/samples/tree/main/qwik/ssg) |

```tsx
export async function PicardComponent({ name, source, data }) {
  const html = await picard.decorate(
    `<pi-component name="${name}" source="${source}" data='${JSON.stringify(data)}'></pi-component>`,
  );
  // React must not touch the content, which is owned by Picard.js
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />;
}
```

Escape the attribute values, as the samples do. The `pi-part` elements are decorated the same way, e.g., `picard.decorate('<pi-part name="script"></pi-part>')` at the end of the body. Streamed content can't go into the head, so place the style part at the start of the body.

React moves streamed `Suspense` content from a hidden container into place. Picard.js keeps a resumed component when its element is moved, so nothing is rendered twice.

Render *every* `pi-component` this way, including the client-only ones (`server="none"`). If React rendered the element itself, the islands script could fill it before React hydrates, and React would fail the hydration and re-render the page. `suppressHydrationWarning` on the wrapper silences React's development warning about the changed inner HTML.

::: warning
Server functions and RPC endpoints (e.g., TanStack Start's `createServerFn`, Qwik's `server$`) can be called by anyone. Accept a component *reference* (name, source, data) and build the markup on the server, never raw HTML. A `pi-component` with a URL `source` and a `format` would make the server load and run code from that URL. Without `format`, Picard.js only loads micro frontends from the feed.
:::

### Decorating Outside of JavaScript

Backends in other languages and static site generators can't call Picard.js directly. Run it next to them instead:

- **As a service:** the backend posts its HTML to a small Node.js service, which returns `picard.decorate(body)` and serves the islands script. The [ASP.NET Core](https://github.com/picardjs/samples/tree/main/aspnet/ssr) and [htmx / FastAPI](https://github.com/picardjs/samples/tree/main/htmx/ssr) samples do this with a middleware.
- **As a build step:** decorate the generated HTML files in place and write the islands script next to them, as the [Hugo](https://github.com/picardjs/samples/tree/main/hugo/ssg) sample does.

The samples share one tool for both: [`picard-decorator`](https://github.com/picardjs/samples/tree/main/shared/picard-decorator).

## Serving the Islands Script

By default, `scriptUrl` points to the islands variant on unpkg. To avoid the external resource, serve the files from your own server and set `scriptUrl` accordingly:

```ts
app.get('/picard/:file', (req, res) => {
  const content = getIslandsFile(req.params.file);

  if (content === undefined) {
    res.sendStatus(404);
  } else {
    res.type('text/javascript').send(content);
  }
});
```

For static sites, write all files of `getIslandsFileNames()` next to the pages, e.g., with `getStaticPaths` in Astro or `onStaticGenerate` in Qwik.

## Navigation and Partial Updates

The islands script stays active after the first page. It unmounts the components whose elements are removed and resumes the ones that are added, including server-rendered markup that arrives later:

- **Turbo Drive** swaps the `body` on navigation. The micro frontends of the new page are hydrated. See [turbo/ssr](https://github.com/picardjs/samples/tree/main/turbo/ssr).
- **htmx** swaps fragments. Decorate the fragment responses too, without `pi-part` elements. See [htmx/ssr](https://github.com/picardjs/samples/tree/main/htmx/ssr).
- **Client-side navigation of SSR frameworks** (SvelteKit, Nuxt, SolidStart) renders the next page in the browser, so its components are rendered there. With React Router or Next.js, the loaders and Server Components run on the server, so components stay server-rendered.

## Runtimes

`picard-js/node` runs on Node.js, Bun, and Deno. Rendering ES module micro frontends (Native Federation) on the server uses `vm.SourceTextModule`:

- **Node.js** requires the `--experimental-vm-modules` flag (only for ES modules; pilets and Module Federation work without it).
- **Bun** and **Deno** support it without a flag.

The [Bun](https://github.com/picardjs/samples/tree/main/bun/ssr) and [Deno](https://github.com/picardjs/samples/tree/main/deno/ssr) samples render a Native Federation micro frontend on the server.

Keep `picard-js` external when your server is bundled (e.g., `serverExternalPackages` in Next.js), as it loads micro frontends at runtime.
