# Sub-selectors

To support applying styles to selectors like `:hover`, Prototope comes with so-called sub-selector utils, which have similar syntax to [breakpoint utils](./breakpoints.md).

```javascript
import { Prototope, bgColor, hover } from "@isotope/prototope";
import { createDOMView } from "@isotope/core";

const view = createDOMView(element, config);
const { node } = view.$(Prototope());

node.div(hover(bgColor("primary")));
```

All sub-selector functions can be used like any other utils. They accept either a single or an array of utils, that should be applied to the provided selector.

Prototope has multiple sub-selectors built-in:

- `first()` - equivalent to `:first-child`
- `last()` - `:last-child`
- `after()` - `::after`
- `before()` - `::before`
- `odd()` - `:nth-child(odd)`
- `even()` - `:nth-child(even)`
- `hover()` - `:hover`
- `focus()` - `:focus`
- `active()` - `:active`
- `visited()` - `:visited`
- `disabled()` - `:disabled`
- `placeholder()` - `::placeholder`

For more special use-cases, you can also [create your own](./customizations.md)
