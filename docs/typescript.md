# TypeScript

Although Isotope empathizes on the JS-centric approach, requiring no additional tooling to get you up & running, it's still highly compatible with other libraries and tools from the JavaScript ecosystem. The primary example of that is TypeScript.

Isotope itself is written in TypeScript. This allows it to be more maintainable, future-proof and provide useful autocompletion features in modern code editors.

If your project setup allows you to use TypeScript, you can use that to `import` directly from `src` folder, where all source `.ts` files are located (in a similar layout to the `lib` folder), allowing you to import only the features you need.

```typescript
import { createDOMView } from "@isotope/core/src/views/dom";
```

## Types

The only type that you may need to use while working with Isotope is the `IsotopeNode<S, C>` type. It's a generic type of every `IsotopeNode`, that has 2 type variables:

- `S` - the [state](./reactivity.md) object (can be interfered automatically from the config)
- `C` the [context](./configurators.md) object (can be interfered automatically from the config)
