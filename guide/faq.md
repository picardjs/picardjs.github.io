# Frequently Asked Questions

**Is Picard.js ready for production?**

> Picard.js is in an early preview: the 0.3 release is being finalized and published as pre-releases. Check the [changelog](https://github.com/picardjs/picard/blob/main/CHANGELOG.md) for the current state.

**How does SSR work with web components?**

> On the server, the `decorate` function of `picard-js/node` looks at the HTML and renders the referenced components into the `pi-component` and `pi-slot` elements. In the browser, the islands script hydrates the server-rendered components and renders the others. See [Server-Side Rendering](./integrations/ssr.md).

**Does Picard.js work with my framework?**

> Very likely. Picard.js only uses custom elements, so any framework able to render HTML can use it. The [samples](./samples.md) cover Angular, React, Vue, Svelte, Solid, Qwik, Next.js, Nuxt, SvelteKit, React Router, SolidStart, Astro, Hugo, Hotwire Turbo, htmx, ASP.NET Core, Electron, Tauri, Capacitor, React Native, and more.

**Do I need Node.js on the server for SSR?**

> Picard.js needs a JavaScript runtime: Node.js, Bun, or Deno. Backends in other languages (e.g., .NET, Python, PHP) can call a small decorator service, and static site generators can run a decorator as a build step. See [Decorating Outside of JavaScript](./integrations/ssr.md#decorating-outside-of-javascript).

**Why do Native Federation micro frontends not render on my Node.js server?**

> Evaluating ES modules on the server requires `vm.SourceTextModule`. Start Node.js with `--experimental-vm-modules`, or use Bun or Deno, which support it without a flag.

**Does Picard.js work under a strict Content Security Policy?**

> Yes. The browser script can be configured via attributes, so no inline script is needed. Remote micro frontends need their origins allowed. Picard.js evaluates ES modules with shared dependencies via `blob:` scripts; without `blob:`, it imports modules without shared dependencies directly. A [browser extension sample](https://github.com/picardjs/samples/tree/main/extension/mv3) bundles everything locally.

**Can I unit test pages using Picard.js?**

> Yes, e.g., with Vitest in jsdom or happy-dom. See [Testing](./integrations/testing.md).

**What formats (micro frontend frameworks) are supported?**

> Picard.js supports micro frontends using SystemJS like Piral, but also Module Federation (v1 and v2), Native Federation, as well as plain native esm modules.

**What UI libraries (frameworks) are supported?**

> Picard.js supports every UI library as long as it can be converted to Picard's own [lifecycle definition](../api/lifecycle/index.md) or to an integrated target [such as single-spa](./frameworks/single-spa.md).

**Can dependencies be shared between the different formats, such as module federation and native federation?**

> Yes.

**Is native federation also capable of rendering server-side?**

> In general yes - that, of course, depends if your component is capable of being server-side rendered.

**How can I contribute to the project?**

> Reporting issues, writing fixes or new features, writing an article or sharing your success story. There are multiple ways to contribute!

**What's the story behind Picard.js and Piral? Is Picard.js the successor of Piral?**

> No, but it will be the base library for Piral v2 - effectively replacing `piral-base` in the process.

**Can the Piral Cloud Feed Service work with Picard.js?**

> Yes, it works with anything that you can throw into Picard.js.

**What micro frontend discovery services can work with Picard?**

> Any service providing one of the known [discovery formats](../api/discovery/index.md) works out of the box. For anything else you can use a callback and convert the response.

**Can you go into details regarding how Picard.js loads and orchestrates the micro frontends?**

> Sure, have a look at our [architecture documentation](https://github.com/picardjs/picard/blob/develop/ARCHITECTURE.md) in the repo.

**Why should I use module federation with Picard.js over just plain module federation?**

> There can be multiple reasons, such as (1) you also need to integrate micro frontends using something else (2) you need to be flexible regarding the choice of tooling (3) you want to fully embrace a powerful micro frontend discovery service without needing to know Module Federation internals (4) you want to be loosely coupled and fully resiliant in your application

**Do I need to integrate Picard.js from the get-go or can I just wait / use it when necessary?**

> You can also wait and progressively go into Picard.js. The beauty of web components is that you can already use them - in the worst case they would just not render (yet).

**Will there be articles available for Picard.js?**

Yes! And there will be [more videos](https://www.youtube.com/watch?v=_XPytuQrKaY), too.
