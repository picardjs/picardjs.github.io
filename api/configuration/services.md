# Runtime Services

Picard.js comes with a set of services that can be extended to provide more or augmented functionality.

## Service Definitions

Right now the following extensible services exist:

| Service Key Structure | Example           | Interface             | Notes         |
| --------------------- | ----------------- | --------------------- | ------------- |
| `framework.{type}`    | `framework.react` | `ConverterService`    |               |
| `format.{name}`       | `format.module`   | `ContainerService`    |               |
| `slotRel.{name}`      | `slotRel.router`  | `SlotBehaviorService` |               |
| `part.{name}`         | `part.style`      | `PartService`         | SSR only      |

Built-in services can be replaced, too. Everything passed in the `services` option overrides the default service with the same key, e.g., `esm` (evaluating ES modules), `platform` (loading scripts, modules, and JSON), or `events`. Each service is given as a function receiving the dependency injector and returning the service instance:

```js
initializePicard({
  feed,
  services: {
    // e.g., in unit tests: import ES modules via the test runner
    esm: () => ({
      load(url, depMap, parent) {
        return import(toLocalFile(url));
      },
    }),
  },
});
```

:point_right: The [Vitest sample](https://github.com/picardjs/samples/tree/main/vitest/testing) replaces the `esm` service to run Native Federation micro frontends in jsdom and happy-dom.

## Interfaces

```ts
interface ConverterService {
  convert(component: any, opts: any): ComponentLifecycle;
}
```

For an explanation of the `ComponentLifecycle` see [Generic component Lifecycle](../lifecycle/index.md).

```ts
interface ContainerService {
  createContainer(details: any): Promise<ComponentGetter>;
}
```

```ts
interface SlotBehaviorService {
  apply(attribs: Record<string, string>): [name: string, data: any];
}
```

```ts
interface PartService {
  getReplacement(document: Document, attribs: Record<string, string>): Promise<string>;
}
```
