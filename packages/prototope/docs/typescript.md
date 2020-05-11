# TypeScript

Like most libraries in the Isotope ecosystem, Prototope is written in TypeScript. This makes the integration process with this language very easy.

TypeScript plays a crucial role in Prototope. It's nature as a utility library and vast amount of different functions, make TypeScript and its advantages like code editor autocompletion even more compelling.

With TypeScript support in place, you can feel free to import directly from the `src` directory:

```typescript
import { bgColor } from "@isotope/prototope/src/utils/background";

// ...
```

## Types

While correct types should be interfered automatically most of the time, Prototope exposes `PrototopeContext` typescript interface, which can be used with Isotope's `IsotopeNode<S,C>` interface to directly inform the node that Prototope has been initialized in the context.

```typescript
import { PrototopeContext, bgColor } from "@isotope/prototope";
import { createDOMView } from "@isotope/core";

const view = createDOMView(element, config);
const component = (parentNode: IsotopeNode<{}, PrototopeContext>) => {
	return parentNode.div(bgColor);
};
const { node, getCSS } = view.$(Prototope());

node.$(component);
```
