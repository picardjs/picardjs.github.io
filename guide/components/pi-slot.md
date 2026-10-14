# Using `pi-slot`

The `pi-slot` component introduces a micro frontend independent rendering slot. It will automatically look into all currently loaded micro frontends - trying to locate exposed components by the given `name` attribute. All found components will be rendered inside the `pi-slot`.

![`pi-slot`](../../images/pi-slot.svg)

Consider the following HTML:

```html
<div class="d-flex p-2 justify-content-center">
  <pi-slot name="counter"></pi-slot>
</div>
```

Inside this area all found components with the name `counter` will be rendered. Let's say we only found one. The resulting HTML would be:

```html
<div class="d-flex p-2 justify-content-center">
  <pi-slot name="counter">
    <pi-component cid="12356"></pi-component>
  </pi-slot>
</div>
```

At this point the `pi-component` would take over; except that it does not need to resolve any micro frontend. As the `cid` attribute is set it can directly render the referenced component.

What if the `pi-slot` found multiple components? Let's say we found three. The resulting HTML could look like this:

```html
<div class="d-flex p-2 justify-content-center">
  <pi-slot name="counter">
    <pi-component cid="12356"></pi-component>
    <pi-component cid="12357"></pi-component>
    <pi-component cid="12358"></pi-component>
  </pi-slot>
</div>
```

Maybe this is exactly what we want - maybe not. If not, we might be interested in actually containing these elements in another structure.

By using a `<template>` element together with the `item-template-id` attribute we can wrap each component in another structure:

```html
<div class="d-flex p-2 justify-content-center">
  <pi-slot name="counter" item-template-id="my-template"></pi-slot>
</div>
<template id="my-template">
  <div class="some-class">
    <slot></slot>
  </div>
</template>
```

The resulting HTML is:

```html
<div class="d-flex p-2 justify-content-center">
  <pi-slot name="counter" item-template-id="my-template">
    <div class="some-class">
        <pi-component cid="12356"></pi-component>
    </div>
    <div class="some-class">
        <pi-component cid="12357"></pi-component>
    </div>
    <div class="some-class">
        <pi-component cid="12358"></pi-component>
    </div>
  </pi-slot>
</div>
<template id="my-template">
  <div class="some-class">
    <slot></slot>
  </div>
</template>
```

## Loading and Fallback Content

Like `pi-component`, a slot supports `loading-template-id` and `fallback-template-id`. The fallback is shown when no component matches the name.

## Ordering

When several micro frontends contribute to a slot, use `order-by` (`cid`, `origin`, `time`, or `none`) and `reverse-order` to control the order. See the [API](../../api/components/pi-slot.md).

## Pages

With `rel="router"`, a slot shows the page component (`page:/path`) matching the current URL. See [Client-Side Routing](../../api/usage/routing.md).
