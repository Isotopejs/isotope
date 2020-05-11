# Components

Components are at the center of every Docking website. They're meant to contain all the dynamic, as well as repetitive parts of your UI nicely grouped.

## Creating components

All components should be placed within the `components` folder. Here, each direct folder (through `index` file) or file will be processed into separate component bundles.

Components in Docking are mostly based on the Isotope components, with some additional features. They can be written in both JavaScript, as well as TypeScript, and will be processed with [Babel](https://babeljs.io/). Because of that, if you intend to do any more processing (e.g. to support pre-ES6 browsers), you can adjust Babel by introducing the `babel.config.js` file to your project.

Naturally, within components, especially those more complex ones that are placed in their own folders, you can use ES6 modules.

### Component function

Within a component file, the main focus is the component function.

```javascript
const component = (page, content, parse) => (parentNode) => {
	return parentNode.span(content);
};

export default component;
```

The component function should look like a usual [Isotope component](https://areknawo.com/isotope/#docs>Ecomponents). It's provided with access to 3 values:

- `page` - the name of the page the component is used in, similar to its source Markdown file path. For example, a `content/index.md` page has name `index`, whereas `content/nested/page.md` has name `nested/page`.
- `content` - available only when rendering on the server, this value holds the content string that's provided when using the component.
- `parse` - available only when rendering on the server, Isotope directive that accepts content as a parameter for further parsing.

The component function should then be exported with `export default` or as the `component` variable (`export { component }`).

### Component type

Apart from the component function, another aspect of a Docking component you can configure is the component type. It indicates how the component should be rendered:

- `static` (default) - render component server-side-only
- `dynamic` - render component client-side-only
- `universal` - render component both on the server and client

The type can be set only when exporting component function through the `component` variable, with the use of `type` variable.

```javascript
// ...
const type = "universal";

export { component, type };
```

### TypeScript

If you're using TypeScript, you might find Docking's `ComponentFunction` type helpful, when creating component functions.

```typescript
import { ComponentFunction } from "@isotope/docking/lib/declarations";

const component: ComponentFunction = () => () => {
	// ...
};

// ...
```

### Prototope

Apart from being based on Isotope, Docking components also utilize [Prototope](https://areknawo.com/prototope) - a library for easy, utility-based CSS-in-JS UI prototyping. After adding it to your project with e.g. `npm i @isotope/prototope`, you can use it just like you would do in any other project.

```javascript
import { bgColor, h, w } from "@isotope/prototope";
const component = (page, content, parse) => (parentNode) => {
	return parentNode.div([bgColor("primary"), h(8), w(8)]);
};

export default component;
```

> > WARN: You should know that in Docking, Prototope works only on the server-side (i.e. with `static` or `universal` components). The reason for that is to prevent Prototope from adding additional size and slowing down the performance of the resulting static website. Instead, for compatibility reasons, a simple Prototope mock is loaded on the client-side, while styles are rendered and outputted to page's `<style>` element on the server.

## Using components

With a component ready, it's now time to properly utilize it! In Docking, this can be done with the `{{}}` syntax in both Markdown content files, as well as the `template.html` file.

```markdown
This is some text.

{{ Name }}{{ Name }}

This is even more text.
```

A component can be used by simply using the "component tags". There are always 2 of them - one at the start and one at the end. They consist of double curly brackets (`{{`) on each side, and a name in the middle (white-spaces are optional).
The name is **case-insensitive** and is determined by the component's file/folder name from the `components` folder. Remember that only direct descendants of the `component` folder are parsed as actual, individual components, and thus only these can be referenced with this syntax.

> WARN: In Markdown files, Docking components are parsed as block rules, and thus, you should remember about properly separating them with newlines.

### Providing content

Between the two "component tags" you can supply anything that you'd like to be passed to the component itself (under `content` parameter). It will be provided as a string, but you can still use something like JSON-stringified object to better configure the component. Otherwise, if you intend to use your component as a sort-of wrapper, you can also pass Markdown to the component which can then use the provided `parse()` function to further parse it.

Here are some examples:

- Plain text:

```markdown
This is some text.

{{ Name }}Plain text{{ Name }}

This is even more text.
```

- JSON config object:

```markdown
This is some text.

{{ Name }}{
"isJSON": true
}{{ Name }}

This is even more text.
```

- Markdown:

```markdown
This is some text.

{{ Name }}
More **Markdown**!
{{ Name }}

This is even more text.
```

### Nesting

For more complex designs, components can be easily nested:

```markdown
This is some text.

{{ First }}

{{ Second }}{{ Second }}

{{ First }}

This is even more text.
```

In this scenario, you must remember that in Markdown, component block rules should be properly spaced and that each component in the resulting build is wrapped inside an additional `<div>`.
