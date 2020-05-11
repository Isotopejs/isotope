# Breakpoints

To ease out the process of creating responsive designs, Prototope comes with breakpoints functionality built-in. You can use the `sm()`, `md()`, `lg()` and `xl()` functions to apply certain Prototope utils on certain breakpoints that can be [configured](./customizations.md.md) with the config object.

```javascript
import { Prototope, bgColor, sm } from "@isotope/prototope";
import { createDOMView } from "@isotope/core";

const view = createDOMView(element, config);
const { node } = view.$(Prototope());

node.div(sm(bgColor("primary")));
```

All breakpoint functions can be used like any other utils. They accept either a single or an array of utils, that should be applied on a certain breakpoint.

## Sub-selectors

Breakpoints can be used along-side [sub-selectors](./sub-selectors.md):

```javascript
import { Prototope, bgColor, hover, sm } from "@isotope/prototope";
import { createDOMView } from "@isotope/core";

const view = createDOMView(element, config);
const { node } = view.$(Prototope());

node.div(sm(hover(bgColor("primary"))));
```
