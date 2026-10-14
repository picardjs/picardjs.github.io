# `pi-slot` API

## Attributes

| Name                   | Notes | Description                                                      |
| ---------------------- | ----- | ---------------------------------------------------------------- |
| `name`                 |       | Name of the components to look for                               |
| `data`                 |       | The data to forward to the components ("props")                  |
| `rel`                  | (1)   | The behavior of the slot                                         |
| `item-template-id`     |       | The ID of a template to wrap each found component                |
| `fallback-template-id` |       | The ID of a template to display as fallback                      |
| `loading-template-id`  |       | The ID of a template to display while loading                    |
| `order-by`             | (2)   | Defines the ordering of the found components                     |
| `reverse-order`        |       | If set, reverses the order in which the components are displayed |

(1) The slot behavior defines the slot's relationship to a Picard.js-internal service that is responsible for actually matching the `name` and the `data` props. Initially, a single behavior named `router` is available. This behavior matches the provided name as a `page:`-component using dynamic route matching.

(2) The ordering key must be one of `cid` (order by their component ID), `origin` (order by their micro frontend name), `time` (order by the time the component was registered), and `none` (just take the order in which the components have been found - usually equivalent to `time` and the default value).

## Properties

| Name                   | Notes | Description                                            |
| ---------------------- | ----- | ------------------------------------------------------ |
| `name`                 |       | Gets or sets the name attribute                        |
| `data`                 |       | Gets or sets the deserialized data ("props")           |

The serialized data is understood as a JSON string. It is deserialized using `JSON.parse`. Make sure to only provide valid objects here, otherwise the data will be discarded.

## Events

| Name             | Arguments            | Description                                       |
| -----------------| -------------------- | ------------------------------------------------- |
| `mounted-slot`   | `MountedSlotEvent`   | Called when the slot was fully mounted            |
| `unmounted-slot` | `UnmountedSlotEvent` | Called when the slot was fully unmounted          |

All events are emitted through the Picard.js event system.

## Interfaces

```ts
interface MountedSlotEvent {
  /**
   * The corresponding HTML element.
   */
  element: HTMLElement;
}
```

```ts
interface UnmountedSlotEvent {
  /**
   * The corresponding HTML element.
   */
  element: HTMLElement;
}
```
