# Views

In Isotope, **views** are simply top-level [nodes](./nodes.md), that are created using dedicated functions. The library you with one of such functions - `createDOMView()`.

## createDOMView(element, config)

`createDOMView()` method allows you to create a view that will use DOM as its rendering output.

```javascript
import { createDOMView } from "@isotope/core"; // or "@isotope/core/lib/view"

const view = createDOMView(element, config);
```

**Arguments**:

- `element: Element` - DOM element to attach the view to.

- `config?: object` - Optional configuration object.

  - `attach: boolean = false` - whether the view's child nodes should try to attach to the existing DOM elements.
  - `clean: boolean = true` - whether the content of view's DOM element should be cleaned. (Always `false` when `attach` is set to `true`)

**Returns**:

- Created `IsotopeNode`.

## Usage

When you've got your view set up, you can use it just like a usual node.

## Server-Side Rendering

Isotope supports SSR rendering through a separate `@isotope/server` package. You can learn more about this [here](./ssr.md).
