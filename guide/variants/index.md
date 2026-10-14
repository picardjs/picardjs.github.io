# Picard.js Variants

Picard.js is a single npm package with multiple variants. Each one is tailored to a specific platform or JavaScript runtime.

| Variant | Import | Use it for |
| ------- | ------ | ---------- |
| [Browser](./browser.md) | `<script src="https://unpkg.com/picard-js">` or `picard-js/browser` | websites without a bundler; starts automatically |
| [Client](./client.md) | `picard-js/client` | apps built with a bundler (SPAs, desktop and mobile web views) |
| [Node.js](./node.md) | `picard-js/node` | server-side rendering and static site generation (Node.js, Bun, Deno) |
| [Islands](./islands.md) | `picard-js/islands` | resuming server-rendered pages in the browser (loaded by the `script` part) |
| [Native](./native.md) | `picard-js/native` | headless orchestration without a DOM (experimental) |

The bare import `picard-js` resolves by export condition: `browser` to the client variant, `node` to the Node.js variant, and `electron` to the native variant.

See [Electron](./electron.md) for which variant to use in an Electron app.
