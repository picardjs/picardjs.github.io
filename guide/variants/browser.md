# Using Picard.js in the Browser

Using Picard.js in the browser works by including a `script` reference to it.

## Installation

Add the following to your `<head>` element.

```html
<script src="https://unpkg.com/picard-js"></script>
```

If you want to link to your own version of the script then download / install the [npm package](https://www.npmjs.com/package/picard-js) and copy the `picard.js` file from the `dist/browser` directory in the package.

::: tip
You should also copy the other files from the `dist/browser` directory, too. This way you ensure that other optional libraries, debug tools, and source maps can be properly loaded and used.
:::

The script can also be loaded with `defer` or `async`.

## Configuration

There are two ways to configure it:

1. You can specify some options via special attributes such as `feed`.
2. You can have another `script` element with the special `type` `pi-state`; this way you can set the initial state to some already computed state.

### Special Attributes

**The `feed` attribute**

Specifying a micro frontend discovery service with the `script` element works like this:

```html
<script
  src="https://unpkg.com/picard-js"
  feed="https://mycompany.com/microfrontends/api"
  ></script>
```

This will ensure that micro frontends will be obtained from the discovery service *in addition to* the micro frontends that are directly referenced in the web components.

### Initial State

When Picard.js starts it will look for a script tag with the `type` set to `pi-state`. The could look like:

```html
<script type="pi-state">
  {
    "microfrontends": [
      {
        "components": {},
        "details": {
          "id": "simplehtml",
          "url": "https://assets.piral.cloud/pilets/picard-demos/mf-simple-html/1.0.1/remoteEntry.js"
        },
        "format": "module",
        "name": "mf-simple-html",
        "source": "https://assets.piral.cloud/pilets/picard-demos/mf-simple-html/1.0.1/remoteEntry.js"
      }
    ]
  }
</script>
```

The provided state must match the format of Picard's internal state. One way to get this is to retrieve an export of the internal state, e.g., using the `readState()` function on `window.picard`.

::: warning
The provided state is not type-checked. As a result, any wrong or unexpected input here might lead to some undefined behavior later on.

Always just take the state as it was exported via `JSON.stringify(picard.readState())` as input for a `pi-state` script.
:::

Ideally, you don't use this thing directly, but rely on Picard.js doing it implicitly, e.g., when using SSR with an islands architecture model.

### Other Options

All other options of the [client variant](./client.md) can be set via a `config` property on the script element, e.g., in its `onload` handler. See [Initialization Options](../../api/configuration/options.md#browser).

## Without Inline Scripts

The `feed` attribute makes it possible to use Picard.js without any inline script, e.g., under a strict Content Security Policy. A browser extension can even ship the script and a local `feed.json`:

```html
<script src="picard/picard.js" feed="feed.json"></script>
```

:point_right: See the [Electron](https://github.com/picardjs/samples/tree/main/electron/client) and [browser extension](https://github.com/picardjs/samples/tree/main/extension/mv3) samples.
