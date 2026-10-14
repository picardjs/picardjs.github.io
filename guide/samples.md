# Samples

The [samples repository](https://github.com/picardjs/samples) shows Picard.js in all kinds of applications: single-page apps, server-side rendering with streaming, static site generators, backends written in other languages, desktop and mobile apps, a browser extension, and unit tests. Every sample has a README explaining what Picard.js does there and exactly where it is integrated.

::: tip
Looking for a starting point? Pick the sample closest to your stack, then read the matching integration guide: [Single-Page Apps](./integrations/spa.md), [Server-Side Rendering](./integrations/ssr.md), [Desktop & Mobile Apps](./integrations/apps.md), or [Testing](./integrations/testing.md).
:::

## Rendering in the Browser

| Sample | Stack | Where Picard.js is integrated |
| ------ | ----- | ----------------------------- |
| [Angular SPA](https://github.com/picardjs/samples/tree/main/angular/spa) | Angular 19 | `main.ts` next to `bootstrapApplication`, `CUSTOM_ELEMENTS_SCHEMA` |
| [React SPA](https://github.com/picardjs/samples/tree/main/react/spa) | React 19, Vite | `main.tsx`, JSX typing for `pi-component` |
| [Svelte SPA](https://github.com/picardjs/samples/tree/main/svelte/spa) | Svelte 5, Vite | `main.ts`, no configuration needed |
| [Vue SPA](https://github.com/picardjs/samples/tree/main/vue/spa) | Vue 3, Vite | `main.ts`, `isCustomElement` |
| [Rsbuild](https://github.com/picardjs/samples/tree/main/rsbuild/mf) | Rsbuild 2, Module Federation | a Module Federation host sharing its remotes with Picard.js |

## Rendering on the Server

| Sample | Stack | Where Picard.js is integrated |
| ------ | ----- | ----------------------------- |
| [Angular SSR](https://github.com/picardjs/samples/tree/main/angular/ssr) | Angular 19, Express | `server.ts` decorates the response of the Angular engine |
| [ASP.NET Core](https://github.com/picardjs/samples/tree/main/aspnet/ssr) | .NET 10 | a middleware calls a decorator service |
| [Bun](https://github.com/picardjs/samples/tree/main/bun/ssr) | Bun | `Bun.serve` routes, incl. Native Federation on the server |
| [Deno](https://github.com/picardjs/samples/tree/main/deno/ssr) | Deno 2 | `Deno.serve` with an `npm:` import |
| [Hotwire Turbo](https://github.com/picardjs/samples/tree/main/turbo/ssr) | Express, Turbo 8 | each route decorates its page; Turbo swaps the `body` |
| [htmx](https://github.com/picardjs/samples/tree/main/htmx/ssr) | Python, FastAPI | a middleware decorates pages and htmx fragments via a decorator service |
| [Next.js](https://github.com/picardjs/samples/tree/main/next/ssr) | Next.js 16 | async Server Components in `Suspense` (streaming) |
| [Nuxt](https://github.com/picardjs/samples/tree/main/nuxt/ssr) | Nuxt 4 | a Nitro plugin (`render:html`, `render:response`) |
| [React Router](https://github.com/picardjs/samples/tree/main/react-router/ssr) | React Router 8 | loaders return `decorate` promises, rendered with `Await` (streaming) |
| [SolidStart](https://github.com/picardjs/samples/tree/main/solid/ssr) | SolidStart 2 | a middleware; a signal bound to `data` |
| [SvelteKit](https://github.com/picardjs/samples/tree/main/sveltekit/ssr) | SvelteKit 3 | `transformPageChunk` in `hooks.server.ts` |

## Rendering at Build Time

| Sample | Stack | Where Picard.js is integrated |
| ------ | ----- | ----------------------------- |
| [Astro](https://github.com/picardjs/samples/tree/main/astro/ssg) | Astro 7 | a middleware and a static endpoint for the islands script |
| [Hugo](https://github.com/picardjs/samples/tree/main/hugo/ssg) | Hugo | a decorator CLI runs after `hugo` |
| [Qwik](https://github.com/picardjs/samples/tree/main/qwik/ssg) | Qwik City 1 | a `server$` function in a component |

## Desktop, Mobile, and Other Environments

| Sample | Stack | Where Picard.js is integrated |
| ------ | ----- | ----------------------------- |
| [Browser extension](https://github.com/picardjs/samples/tree/main/extension/mv3) | Chromium, Manifest V3 | browser script and micro frontends bundled into the extension |
| [Capacitor](https://github.com/picardjs/samples/tree/main/capacitor/app) | Capacitor 8 | `picard-js/client` with a feed combining bundled and remote micro frontends |
| [Electron](https://github.com/picardjs/samples/tree/main/electron/client) | Electron 35 | browser script in the renderer |
| [React Native](https://github.com/picardjs/samples/tree/main/react-native/app) | Expo 57 | a WebView on iOS / Android, the DOM on the web |
| [Tauri](https://github.com/picardjs/samples/tree/main/tauri/client) | Tauri 2 | `main.ts` in the webview |
| [Vitest](https://github.com/picardjs/samples/tree/main/vitest/testing) | Vitest 5, jsdom, happy-dom | the page under test starts `picard-js/client` |

## The Demo Micro Frontends

All samples use the `picard-demos` feed (`https://feed.piral.cloud/api/v1/microfrontends/picard-demos`). Its micro frontends are framework-less on purpose, and each one uses a different format:

| Micro frontend | Format | Component | Rendering |
| -------------- | ------ | --------- | --------- |
| `mf-simple-html` | Module Federation | `column` | client only |
| `nfsimplehtml` | Native Federation | `column` | client only |
| `pi-simple-html` | Pilet | `counter` | client only |
| [`pi-ssr-html`](https://github.com/picardjs/samples/tree/main/shared/pi-ssr-html) | Pilet | `ssr-counter` | server and client (hydrated) |
| [`nf-ssr-html`](https://github.com/picardjs/samples/tree/main/shared/nf-ssr-html) | Native Federation | `ssr-likes` | server and client (hydrated) |

The sources of the two server-renderable micro frontends are part of the samples repository. They're a compact reference for writing a [component lifecycle](../api/lifecycle/index.md) that supports `stringify`, hydration, and `update`.

The repository also contains [`picard-decorator`](https://github.com/picardjs/samples/tree/main/shared/picard-decorator), a small Node.js tool that renders micro frontends into HTML produced by something other than a Node.js server. It runs as an HTTP service or as a build step.

## Examples in the Picard.js Repository

The [Picard.js repository](https://github.com/picardjs/picard/tree/develop/examples) has more examples, which focus on individual features rather than on frameworks:

- [static pages](https://github.com/picardjs/picard/tree/develop/examples/01-static-page), [with a feed](https://github.com/picardjs/picard/tree/develop/examples/02-static-page-feed), [with slots](https://github.com/picardjs/picard/tree/develop/examples/03-static-page-slots), and [with routing](https://github.com/picardjs/picard/tree/develop/examples/05-static-page-with-routing)
- [single-spa components](https://github.com/picardjs/picard/tree/develop/examples/06-static-page-single-spa) and [dependency sharing across formats](https://github.com/picardjs/picard/tree/develop/examples/10-dependencies-sharing)
- [server-side rendering](https://github.com/picardjs/picard/tree/develop/examples/08-ssr-tractor), [islands](https://github.com/picardjs/picard/tree/develop/examples/16-ssr-islands), and [slot](https://github.com/picardjs/picard/tree/develop/examples/14-slot-capabilities) / [component capabilities](https://github.com/picardjs/picard/tree/develop/examples/15-component-capabilities)
