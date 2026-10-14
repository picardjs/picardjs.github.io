# Desktop & Mobile Apps

Wherever there's a web view, Picard.js can run, including desktop apps, mobile apps, and browser extensions. What changes from a website is the *origin* the page runs under and the security policies that apply to it.

## Overview

| Environment | Variant | Origin of the page | Sample |
| ----------- | ------- | ------------------ | ------ |
| Electron | browser script or `picard-js/client` | `file://` (or your dev server) | [electron/client](https://github.com/picardjs/samples/tree/main/electron/client) |
| Tauri | `picard-js/client` | `tauri://localhost` / `http://tauri.localhost` | [tauri/client](https://github.com/picardjs/samples/tree/main/tauri/client) |
| Capacitor | `picard-js/client` | `https://localhost` (Android), `capacitor://localhost` (iOS) | [capacitor/app](https://github.com/picardjs/samples/tree/main/capacitor/app) |
| React Native | browser script in a WebView | the WebView's `baseUrl` | [react-native/app](https://github.com/picardjs/samples/tree/main/react-native/app) |
| Browser extension (MV3) | browser script, bundled | `chrome-extension://<id>` | [extension/mv3](https://github.com/picardjs/samples/tree/main/extension/mv3) |

## Remote Micro Frontends

The app's origin is never the origin of your micro frontends. So the discovery service and the micro frontends must be served with CORS headers, like the `picard-demos` feed is. If the app sets a Content Security Policy, it must allow:

- the origins of the feed (`connect-src`) and of the micro frontends (`script-src`, `style-src`), and
- `blob:` scripts (`script-src blob:`), which Picard.js uses to evaluate ES modules (Native Federation) with shared dependencies.

## Bundled Micro Frontends

Micro frontends can also ship *with* the app, e.g., for offline use or where remote code isn't allowed. Put the files into the app's web assets and reference them with relative URLs in a local feed. Picard.js resolves them against the page:

```json
{
  "microFrontends": {
    "app-info": [
      {
        "url": "./mfs/app-info/index.js",
        "metadata": { "version": "1.0.0" },
        "extras": { "pilet": { "spec": "v2" }, "dependencies": {} }
      }
    ]
  }
}
```

The [Capacitor sample](https://github.com/picardjs/samples/tree/main/capacitor/app) merges such a local feed with a remote one, using a function as the `feed`:

```ts
initializePicard({
  async feed() {
    const [remote, local] = await Promise.all([loadJson(remoteFeed), loadJson('./feed.json')]);
    return { ...remote, microFrontends: { ...remote.microFrontends, ...local.microFrontends } };
  },
});
```

::: warning
A feed given as a function or an object has no URL of its own. Relative URLs in it are resolved against the page, not against the location of the JSON file you loaded it from.
:::

## Browser Extensions

Manifest V3 extension pages run under `script-src 'self'`: no remote code, no inline scripts, no `eval`. The [extension sample](https://github.com/picardjs/samples/tree/main/extension/mv3) therefore:

- copies the browser script (`picard-js/dist/browser`) into the extension and configures it with the `feed` attribute instead of an inline script,
- downloads the micro frontends at build time and writes a local `feed.json` with relative URLs.

Pilets and Native Federation micro frontends can be bundled this way. Module Federation containers load their chunks by names computed at runtime, so they can only be bundled when an `mf-manifest.json` lists the files.

When the CSP forbids `blob:` scripts, Picard.js imports ES modules without shared dependencies with a native `import()` instead.

## React Native

React Native has no DOM on iOS and Android, so Picard.js runs in a `react-native-webview` hosting a small page with the browser script. On the web (react-native-web), the elements are rendered directly. Metro can't bundle `picard-js/client` because of its dynamic `import(url)` calls, so the sample loads the browser script in both cases.
