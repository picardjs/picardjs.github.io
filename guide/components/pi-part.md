# Using `pi-part`

The `pi-part` component is available exclusively on the server. On the client, this component won't render at all.

This component is essentially a replacement rule that is applied by the `decorate` function of Picard.

![`pi-part`](../../images/pi-part.svg)

Consider the following HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Picard.js</title>
    <pi-part name="style"></pi-part>
</head>
<body></body>
</html>
```

When the decorator sees a `pi-part`, it replaces the element with the replacement provided for its name. For the `style` part, this is Picard's base styles followed by the stylesheets of the micro frontends:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Picard.js</title>
    <style>pi-slot { display: contents; } pi-component { display: contents; } pi-part { display: none; }</style>
    <link rel="stylesheet" href="https://example.com/mf/style.css" data-origin="some-mfe" data-ref-id="...">
</head>
<body></body>
</html>
```

## Available Parts

| Name     | Replacement | Availability |
| -------- | ----------- | ------------ |
| `style`  | the base styles and the stylesheets of the loaded micro frontends | always |
| `script` | the state (`<script type="pi-config">`) and the [islands script](../variants/islands.md) resuming the page in the browser | with `interactive: true` |

A typical page places the `style` part in the head and the `script` part at the end of the body:

```html
<head>
  <pi-part name="style"></pi-part>
</head>
<body>
  <!-- pi-component elements -->
  <pi-part name="script"></pi-part>
</body>
```

The parts don't need to be in the same `decorate` call as the components. Streaming setups (e.g., Next.js or React Router) decorate each part separately. Unknown parts are replaced with an HTML comment.

::: tip
You can define additional replacement services. The used service name is `part.{name}`, where `{name}` refers to the name of the part that you want to provide.
:::

:point_right: See the [Server-Side Rendering guide](../integrations/ssr.md) for where frameworks let you place the parts.
