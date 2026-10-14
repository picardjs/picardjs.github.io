# Using `pi-component`

The `pi-component` can be used to render a component from a micro frontend on a website.

![`pi-component`](../../images/pi-component.svg)

Consider the following HTML:

```html
<div class="d-flex p-2 justify-content-center">
  <pi-component
    name="counter"
    source="https://assets.piral.cloud/pilets/picard-demos/pi-simple-html/1.0.1/index.meta.json"
    format="pilet"
  ></pi-component>
</div>
```

Here we say "at this position, i.e., inside the `<div>` element, render the component named `counter` from the micro frontend (pilet) located at the given URL".

Using this instruction Picard.js will load the micro frontend, get the component definition, and finally mount the component in the `pi-component` element, which acts as a container.

In case the micro frontend was already loaded from a micro frontend discovery service we can simplify the markup significantly:

```html{4}
<div class="d-flex p-2 justify-content-center">
  <pi-component
    name="counter"
    source="pi-simple-html"
  ></pi-component>
</div>
```

Here, we only need to tell Picard the name of the micro frontend as `source`. Importantly, the `format` specifier (and others) are unnecessary now - as all this has already been fully determined from the micro frontend discovery response.

## Passing Data

The `data` attribute holds the data ("props") of the component as JSON:

```html
<pi-component name="ssr-counter" source="pi-ssr-html" data='{"start":5}'></pi-component>
```

You can also set the `data` property, either to an object or to serialized JSON. Frameworks such as Vue, Svelte, Solid, or React 19 do this when you bind the attribute. When the data changes, the component's `update` lifecycle is called; it isn't mounted again.

## Loading and Fallback Content

Use templates to show something while the component loads, or when it can't be rendered (e.g., an unknown micro frontend or a failing component):

```html
<pi-component
  name="counter"
  source="pi-simple-html"
  loading-template-id="loading"
  fallback-template-id="not-available"
></pi-component>

<template id="loading"><p>Loading...</p></template>
<template id="not-available"><p>The counter is not available right now.</p></template>
```

## Server-Side Rendering

When the page is rendered on the server, the component is rendered into the element if its lifecycle supports `stringify`. Use `server="none"` to render a component only in the browser, and `client` to control when it's resumed in the browser (`load`, `idle`, `visible`, or `none`):

```html
<pi-component name="reviews" source="reviews-mf" client="visible"></pi-component>
<pi-component name="chart" source="charts-mf" server="none"></pi-component>
```

See [Server-Side Rendering](../integrations/ssr.md).

:point_right: Every [sample](../samples.md) uses `pi-component`. The [framework notes](../integrations/spa.md#framework-notes) explain how to use it in Angular, React, Vue, Svelte, and Solid.
