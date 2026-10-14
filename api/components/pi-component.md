# `pi-component` API

## Attributes

| Name                   | Notes | Description                                            |
| ---------------------- | ----- | ------------------------------------------------------ |
| `cid`                  | (1)   | Component ID, i.e., what should be display             |
| `name`                 | (2,3) | Name of the component in the referenced micro frontend |
| `source`               | (2,3) | Name of the micro frontend or URL to a micro frontend  |
| `format`               | (3)   | Format of the micro frontend to load                   |
| `remote-name`          | (3)   | The name of the remote in case of Module Federation v1 |
| `remote-type`          | (3)   | The type of the remote in case of Module Federation v1 |
| `data`                 |       | The data to forward to the component ("props")         |
| `framework`            |       | The framework to use for displaying the component      |
| `client`               | (4)   | The client-side rendering hints for the component      |
| `server`               | (5)   | The server-side rendering hints for the component      |
| `hydrate`              | (6)   | Marks server-rendered content to hydrate               |
| `fallback-template-id` |       | The ID of a template to display as fallback            |
| `loading-template-id`  |       | The ID of a template to display while loading          |

If (1) is used the other attribute groups (2 or 3) are not taken into consideration. If `source` is a URL leading to a new micro frontend, group (3) is also used. Otherwise, (3) has no effect.

(4) can be one of `none` (not rendered/hydrated on the client), `load` (default value, loaded as soon as possible), `idle` (loaded when the page is idle), or `visible` (loaded when the container becomes visible).

(5) can be set to `none` to skip rendering the component on the server, e.g., for components without a `stringify` lifecycle. The component is then rendered on the client.

(6) is set by the server-side decorator when the component was rendered on the server. The `mount` lifecycle then receives `locals.hydrate` set to `true`. You don't need to set it yourself.

## Properties

| Name                   | Notes | Description                                            |
| ---------------------- | ----- | ------------------------------------------------------ |
| `data`                 |       | Gets or sets the deserialized data ("props")           |

The serialized data is understood as a JSON string. It is deserialized using `JSON.parse`. Make sure to only provide valid objects here, otherwise the data will be discarded.

The `data` property accepts an object, which is serialized, or a string, which is taken as already serialized JSON. Frameworks such as Vue, Svelte, or Solid set the property with the string value of a bound attribute.

## Events

| Name                   | Arguments                 | Description                                            |
| ---------------------- | ------------------------- | ------------------------------------------------------ |
| `changed-data`         | `ChangedDataEvent`        | Called when the data is changed                        |
| `mounted-component`    | `MountedComponentEvent`   | Called when the component was fully mounted            |
| `unmounted-component`  | `UnmountedComponentEvent` | Called when the component was fully unmounted          |

All events are emitted through the Picard.js event system.

## Interfaces

```ts
interface ChangedDataEvent {
  /**
   * The currently deserialized data.
   */
  current: any;
  /**
   * The currently available data serialization.
   */
  data: string;
}
```

```ts
interface MountedComponentEvent {
  /**
   * The corresponding HTML element.
   */
  element: HTMLElement;
}
```

```ts
interface UnmountedComponentEvent {
  /**
   * The corresponding HTML element.
   */
  element: HTMLElement;
}
```
