# AI Assistants

Picard.js publishes an [`llms.txt`](/llms.txt) at

```
https://picard.js.org/llms.txt
```

It follows the [llms.txt convention](https://llmstxt.org): a single plain-text file written for language models. It starts with a compact cheat sheet:

- which variant to use in which environment (browser, bundler, server, WebView),
- the attributes of `pi-component` and `pi-slot`,
- what each framework needs to accept the custom elements,
- the recipe for server-side rendering and the islands script, including streaming frameworks and non-JavaScript backends,
- the component lifecycle, the feed formats, and common pitfalls (CORS, CSP, `--experimental-vm-modules`, DOM shims in tests).

After that, it links to the relevant pages of this documentation.

Assistants have the same knowledge cutoff problem as everyone else: Picard.js is young and changes between pre-releases. Giving your assistant `llms.txt` is the quickest way to get code that uses the current API.

## Using It

How you add it depends on your tool. Common options:

- **Ask for it in the prompt**, e.g., *"Read https://picard.js.org/llms.txt, then integrate Picard.js into this app."* Assistants that can fetch URLs (such as Claude Code) will read it first.
- **Reference it in your project's instructions**, e.g., in `CLAUDE.md`, `AGENTS.md`, or your editor's rules file, so every session starts with it:

  ```md
  This project uses Picard.js for micro frontends.
  Before changing related code, read https://picard.js.org/llms.txt.
  ```

- **Add it as documentation** in editors that index docs by URL.

## Pair It with a Sample

`llms.txt` explains the rules. The [samples](./samples.md) show them applied to a concrete framework. For the best results, also point your assistant to the sample closest to your stack, e.g., *"Follow the approach of https://github.com/picardjs/samples/tree/main/sveltekit/ssr."* Each sample's README explains exactly where Picard.js is integrated.
