# Using Picard.js in a Native App

The native variant (`picard-js/native`) is a headless orchestrator. It loads the feed and the micro frontends and gives access to their components through the [Picard.js store](../../api/configuration/options.md), but it doesn't define any web components and needs no DOM.

```js
import { initializePicard } from 'picard-js/native';

const picard = initializePicard({
  feed: 'https://feed.piral.cloud/api/v1/microfrontends/picard-demos',
});

const [component] = await picard.loadComponents('counter');
```

::: warning
This variant is experimental. Loading ES modules (e.g., Native Federation) isn't implemented yet, and how components are rendered is up to you.
:::

## React Native

Micro frontends are usually web code rendering into the DOM. In a React Native app, the most reliable approach is a WebView hosting a small page with the [browser variant](./browser.md):

```tsx
const page = `<!DOCTYPE html>
<html>
<head>
<script src="https://unpkg.com/picard-js@${version}/dist/browser/picard.js" feed="${feed}"></script>
</head>
<body><pi-component name="counter" source="pi-simple-html"></pi-component></body>
</html>`;

<WebView originWhitelist={['*']} source={{ html: page, baseUrl: 'https://localhost/' }} />
```

On the web (react-native-web) the elements can be rendered directly. Metro can't bundle `picard-js/client`, as it imports ES modules from URLs only known at runtime.

:point_right: See the [React Native sample](https://github.com/picardjs/samples/tree/main/react-native/app) and [Desktop & Mobile Apps](../integrations/apps.md).
