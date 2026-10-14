# Using Picard.js in an Electron App

In Electron, micro frontends are rendered in the *renderer* process, which is a regular web page. So Picard.js runs there like on any website:

- Without a bundler, reference the [browser variant](./browser.md) from the installed package:

  ```html
  <script
    src="../node_modules/picard-js/dist/browser/picard.js"
    feed="https://feed.piral.cloud/api/v1/microfrontends/picard-demos"></script>
  ```

- With a bundler (e.g., Electron Forge with Vite or webpack), import `initializePicard` from the [client variant](./client.md).

The main process doesn't need Picard.js.

## Things to Consider

- **Origin.** A renderer loaded with `loadFile` has a `file://` origin. Remote micro frontends need CORS headers.
- **Content Security Policy.** If you set one, allow the origins of the feed and the micro frontends, and `blob:` scripts (used for ES modules with shared dependencies).
- **Packaging.** When `picard-js` is a regular dependency, Electron Forge packages it, so relative paths into `node_modules` keep working in the packaged app.

:point_right: See the [Electron sample](https://github.com/picardjs/samples/tree/main/electron/client). [Tauri](https://github.com/picardjs/samples/tree/main/tauri/client) works the same way, with `picard-js/client` in the webview. More in [Desktop & Mobile Apps](../integrations/apps.md).
