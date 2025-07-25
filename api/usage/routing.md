# Client-Side Routing

Picard.js contains a client-side router that works by patching the [HTML5 history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

## Router Events

Besides the standard `popstate` some new events have been added. The `history` element now dispatches the following events at `window`:

| Name              | Events Arguments                          | Description                                                     |
| ----------------- | ----------------------------------------- | --------------------------------------------------------------- |
| `popstate`        | `PopStateEvent` with the provided `state` | More information [available online](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)
| `pushstate`       | `Event` with the sender                   | Dispatched after `pushState` has been called                    |
| `replacestate`    | `Event` with the sender                   | Dispatched after `replaceState` has been called                 |

## Presenting Router Content

Components may be registered for specific routes using a conventional component name prefixed with `page:`. For instance, a component that should be displayed at `/` should be registered with the name `page:/`.

The `rel="router"` attribute changes a `pi-slot` web component to listen to the currently active route. It will then sync the `name` attribute of the `pi-slot` instance to `page:[current-page]`, where `[current-page]` is the path using the history API.

The following piece of HTML is everything required to display those pages.

```html
<pi-slot rel="router"></pi-slot>
```

A 404 (page not found) content can be shown by introducing a fallback, like for any other `pi-slot`:

```html
<pi-slot rel="router" fallback-template-id="not-found-page"></pi-slot>

<template id="not-found-page">
  <div class="flex flex-1">
    <h1>Page Not Found</h1>
    <p>The provided page has not been found.</p>
  </div>
</template>
```

There can be multiple `pi-slot` instances on one page. All would be synced to the current path.

## Changing the Route

There are two primary ways to interact with the router:

1. By interacting with the HTML5 `history` object, e.g., `history.pushState({}, '', '/')`.
2. By placing standard `a` elements on the page that have no target (or go to `_self`) and feature a *local* `href` attribute.

In the second case clicking such anchor tags will be intercepted and the usual (full page) navigation will be aborted. Instead, the HTML5 history API is called and the scroll is reset (i.e., `window.scrollTo(0, 0)` is called).

## Route Parameters

The register page path can also consider route parameters. As an example, if you want to receive the value of a parameter `id`, which should be the ID of a product, then a route definition such as `/product/:id` would be suitable:

```
page:/product/:id
```

The router also recognizes optional segments. For instance, if a products page can be used with and without a category, you might define a route such:

```
page:/products{/:category}?
```

This way, you'd receive the `category` parameter only if it was set. Both paths, `/products` and `/products/foo` would be handled by Picard.js.

| Syntax  | Type       | Description                                         | Example       |
| ------- | ---------- | --------------------------------------------------- | ------------- |
| `:id`   | `string`   | A required parameter within a route.                | `/foo/:id`    |
| `*s`    | `string[]` | A wildcard parameter taking the remaining segments. | `/foo/*splat` |
| `{opt}` | `string?`  | An optional segment is enclosed in braces.          | `/foo{/bar}`  |
