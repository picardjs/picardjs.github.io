# Testing

Pages using Picard.js can be unit tested in DOM implementations such as [jsdom](https://github.com/jsdom/jsdom) or [happy-dom](https://github.com/capricorn86/happy-dom), with Picard.js really running: custom elements, script loading, and component lifecycles. The [Vitest sample](https://github.com/picardjs/samples/tree/main/vitest/testing) runs the same tests in both.

## Setup

1. Serve the micro frontends under test from a local HTTP server (e.g., in Vitest's `globalSetup`), and pass a feed object pointing to it. The tests then don't depend on the internet.
2. Start Picard.js with `initializePicard` from `picard-js/client`.
3. Render your page and wait for the components, e.g., with `vi.waitFor`.

```ts
beforeAll(() => {
  initializePicard({ feed, services: { esm } });
  document.body.innerHTML = `<pi-component name="ssr-counter" source="pi-ssr-html" data='{"start":5}'></pi-component>`;
});

it('renders a pilet', async () => {
  const component = document.querySelector('pi-component')!;
  await vi.waitFor(() => expect(component.querySelector('button')?.textContent).toBe('Count: 5'));
});
```

## What the DOM Implementations Need

**Running scripts.** Pilets are loaded with script elements, which both implementations ignore by default:

```ts
// vitest.config.ts
environmentOptions: {
  jsdom: { resources: 'usable', runScripts: 'dangerously' },
  happyDOM: { settings: { enableJavaScriptEvaluation: true, disableJavaScriptFileLoading: false } },
},
```

**Sharing globals (jsdom).** jsdom runs scripts in its own window, while Vitest exposes the jsdom globals on Node.js's global object. Copy the `System` global defined by Picard.js (used by pilets) to jsdom's window: `jsdom.window.System = globalThis.System`.

**ES modules.** Picard.js evaluates ES modules (Native Federation) via `blob:` scripts, which neither implementation runs, and Node.js can't `import()` from `http:` URLs. Replace the `esm` service with one that imports the files through your test runner:

```ts
const esm = () => ({
  load(url: string) {
    const file = resolve(sharedDir, url.substring(server.length));
    return import(/* @vite-ignore */ file);
  },
});
```

The `services` option overrides any built-in [runtime service](../../api/configuration/services.md), which is the general way to adapt Picard.js to an environment.
