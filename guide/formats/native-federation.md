# Referencing Native Federation Modules

## Introduction

[Native Federation](https://github.com/angular-architects/module-federation-plugin/tree/main/libs/native-federation) brings the mental model of Module Federation to web standards. Micro frontends are plain ES modules, described by a `remoteEntry.json` that lists the exposed modules and the shared dependencies. Because it doesn't depend on a specific bundler, any build tool producing ES modules can create Native Federation micro frontends.

## Using Native Federation

Native Federation modules can be used either as part of a discovery service response or directly by referencing a component using a `source` with `format` set to `native`.

### Native Federation

```html
<pi-component
  name="MyComponent"
  source="https://yourcompany.com/example/remoteEntry.json"
  format="native"
></pi-component>
```

Required:

- `format` has to be set to `native`

## Server-Side Rendering

Native Federation micro frontends can be rendered on the server, too. As they are ES modules, the [Node.js variant](../variants/node.md) evaluates them with `vm.SourceTextModule`, which requires `--experimental-vm-modules` in Node.js. Bun and Deno support it without a flag.

## Content Security Policy

In the browser, Picard.js evaluates ES modules via `blob:` scripts to resolve their shared dependencies. Under a Content Security Policy forbidding `blob:` scripts (e.g., in browser extensions), modules without shared dependencies are imported directly instead.

:point_right: The [`nf-ssr-html`](https://github.com/picardjs/samples/tree/main/shared/nf-ssr-html) micro frontend of the samples is a minimal Native Federation micro frontend that is rendered on the server by the [Bun](https://github.com/picardjs/samples/tree/main/bun/ssr) and [Deno](https://github.com/picardjs/samples/tree/main/deno/ssr) samples.
