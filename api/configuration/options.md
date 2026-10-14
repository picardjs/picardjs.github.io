# Initialization Options

## Browser

In the browser Picard.js automatically runs - all you need to do is follow [the installation guide](../../guide/variants/browser.md).

To set the initial configuration you can use a callback, e.g., on the `load` event:

```html
<script>
function configure({ target }) {
  // Place a `config` property on the associated `<script>` element, e.g.,:
  target.config = {
    // ...
  };
}
</script>
<script src="./dist/picard.js" onload="configure(event)"></script>
```

The provided configuration has to follow the definition for the client. All options except `feed` and `state` can be set.

## Client

The `initializePicard` function can be called with an options object respecting the following interface:

```ts
interface PicardOptions {
  /**
   * The name of the pi-component.
   * @default pi-component
   */
  componentName?: string;
  /**
   * The name of the pi-slot.
   * @default pi-slot
   */
  slotName?: string;
  /**
   * The name of the pi-part.
   * @default pi-part
   */
  partName?: string;
  /**
   * The micro frontend discovery service URL,
   * data from calling it, or callback function
   * to call it manually.
   */
  feed?: FeedDefinition;
  /**
   * The initial state of Picard.js - if resumed.
   */
  state?: any;
  /**
   * The application's meta data.
   */
  meta?: any;
  /**
   * The additional services to register.
   */
  services?: Record<string, any>;
  /**
   * The centrally shared dependencies to use.
   */
  dependencies?: Record<string, () => Promise<any>>;
}
```

The `feed` can be a URL, a discovery response (see [Discovery Services](../discovery/index.md)), an array of pilet definitions, or a function returning a promise of one of those. Relative URLs are resolved against the feed's URL, or against the page if the feed is not given as a URL.

`initializePicard` returns the Picard.js store, which is also available as `window.picard` with the browser variant:

```ts
interface PicardStore {
  readState(): PicardState;
  subscribe(listener: (curr: PicardState, prev: PicardState) => void): () => void;
  loadComponents(name: string, options?: OrderingOptions): Promise<Array<PicardComponent>>;
  appendMicrofrontend(mf: PicardMicrofrontend): void;
  appendMicrofrontends(mfs: Array<PicardMicrofrontend>): void;
  removeMicrofrontend(origin: string): void;
  toggleMicrofrontend(origin: string): void;
  dispose(): void;
  // ...
}
```

## Node

The `initializePicard` function can be called with an options object respecting the following interface:

```ts
interface PicardOptions {
  /**
   * The name of the pi-component.
   * @default pi-component
   */
  componentName?: string;
  /**
   * The name of the pi-slot.
   * @default pi-slot
   */
  slotName?: string;
  /**
   * The name of the pi-part.
   * @default pi-part
   */
  partName?: string;
  /**
   * The URL of the fragment service, if any.
   */
  fragmentUrl?: string;
  /**
   * The URL of the script for interactive sessions.
   * If not given the islands variant from unpkg will be used.
   * Use `getIslandsFile` to serve it from this process instead.
   */
  scriptUrl?: string;
  /**
   * The micro frontend discovery service URL,
   * data from calling it, or callback function
   * to call it manually.
   */
  feed?: FeedDefinition;
  /**
   * The initial state of Picard.js - if resumed.
   */
  state?: any;
  /**
   * The additional services to register.
   */
  services?: Record<string, any>;
  /**
   * The centrally shared dependencies to use.
   */
  dependencies?: Record<string, () => Promise<any>>;
  /**
   * Indicates that the rendering should be interactive, i.e.,
   * going into an islands architecture application.
   */
  interactive?: boolean;
  /**
   * The configuration for resuming in the browser. Only
   * used if the rendering is interactive.
   */
  client?: PicardClientOptions;
}

interface PicardClientOptions {
  /**
   * The services to add when resuming in the browser. Maps the name of
   * the service (e.g., "framework.react") to the URL of an ES module,
   * which default exports the service creator.
   */
  services?: Record<string, string>;
  /**
   * The centrally shared dependencies to use when resuming in the browser.
   * Maps the dependency (e.g., "react@18.3.1") to the URL of an ES module.
   */
  dependencies?: Record<string, string>;
}
```

`initializePicard` returns a decorator:

```ts
interface DecoratorService {
  /**
   * Renders the micro frontends into the given HTML (a document or a fragment)
   * and replaces the pi-part elements.
   */
  decorate(content: string): Promise<string>;
  /**
   * Renders all components with the given name (like a pi-slot).
   */
  render(name: string, data: any, opts?: OrderingOptions): Promise<string>;
}
```

The module also exports functions for serving the [islands script](../../guide/variants/islands.md):

```ts
/**
 * Gets the content of a file of the islands variant, e.g., "picard.js",
 * or undefined if no such file exists.
 */
function getIslandsFile(name: string): string | undefined;

/**
 * Gets the names of the files of the islands variant, e.g., to write them
 * next to statically generated pages.
 */
function getIslandsFileNames(): Array<string>;
```
