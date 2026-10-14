# Generic Component Lifecycle API

## Methods

| Name              | Region | Arguments                                             | Returns           |
| ----------------- | ------ | ----------------------------------------------------- | ----------------- |
| `load`            | Client |                                                       | `Promise<void>`   |
| `unload`          | Client |                                                       | `Promise<void>`   |
| `mount`           | Client | `container` (HTMLElement), `props` (1), `locals` (2)  | `void`            |
| `unmount`         | Client | `container` (HTMLElement), `locals` (2)               | `void`            |
| `update`          | Client | `props` (1), `locals` (2)                             | `void`            |
| `bootstrap`       | Server |                                                       | `Promise<void>`   |
| `stringify`       | Server | `props` (1)                                           | `Promise<string>` |

::: info
Hydration scenarios are covered via `mount` by looking either into `container` (would be non-empty in a hydration scenario) or into `locals` (which would contain a truthy value for `hydrate`, i.e., `!!locals.hydrate` would be `true`).
:::

(1) the `props` are the deserialized object from the `data` property

(2) the `locals` is an (initially) empty object that can be used at will to transport information between the different lifecycle methods; it is created per component instance

:point_right: See the [`pi-ssr-html`](https://github.com/picardjs/samples/tree/main/shared/pi-ssr-html) micro frontend of the samples for a minimal lifecycle with `stringify`, hydration, and `update`.
