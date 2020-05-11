# Customization

Prototope allows you to configure some of the basic values it relies upon. To do this, you need to pass a configuration object when setting up the Prototope wrapper.

```javascript
import { Prototope } from "@isotope/prototope";
import { createDOMView } from "@isotope/core";

const view = createDOMView(element, config);
const wrapper = view.$(
	Prototope({
		breakpoints: {
			xl: 1300
		},
		colors: {
			primary: "#00ff00",
			secondary: "#00f500"
		}
	})
);
```

The config object is then merged with the default one and passed on to the utils.

```javascript
const defaultConfig = {
	breakpoints: {
		lg: 1024,
		md: 768,
		sm: 640,
		xl: 1280
	},
	colors: {
		dark: "#595b66",
		darker: "#1f2026",
		light: "#ecedef",
		lighter: "#f2f3f5",
		primary: "#e65100",
		secondary: "#ff9d00"
	}
};
```

## Custom utils

Prototope provides a great range of different utils for you to work with. However, there are cases in which you might need to use something more custom. For this purpose Prototope exposes its `createUtil()` function.

### createUtil(utilConfig)

`createUtil()` is function that creates new Prototope util (aka Isotope directive)

```javascript
import { Prototope, createUtil } from "@isotope/prototope";
import { createDOMView } from "@isotope/core";

const view = createDOMView(element, config);
const { node, getCSS } = view.$(Prototope());
// basic custom util
const bgRed = createUtil({
	bgColor: "#ff0000"
});
// configurable custom util
const color = (color) => {
	return createUtil({
		color
	});
};
// configuration-based custom util
const breakpointWidth = (breakpoint) => {
	return createUtil(({ breakpoints }) => ({
		width: `${breakpoints[breakpoint]}px` // you need to use strings with CSS units
	}));
};

node.div([bgRed, color("red"), breakpointWidth("md")]);
```

**Arguments**:

- `utilConfig: object | () => object` - Util configuration. Either an object containing style properties to be set or a function that returns such an object. A function has access to the following parameters:
  - `config: object` - The config object that was passed to Prototope and merged with defaults.
  - `data: object` - Context-like data containing the breakpoint and sub-selector the util is used with.
  - `registry: object` - Reference to Prototope CSS registry (for advanced uses only)

**Returns**:

- The created Prototope util Isotope directive.

## Custom sub-selectors

Although Prototope provides you with most frequently-used [sub-selectors](./sub-selectors.md), you can still create some on your own with the `createSubSelector()` function.

### createSubSelector(subSelector)

`createSubSelector()` is function that creates new Prototope sub-selector (aka Isotope directive)

```javascript
import { Prototope, createSubSelector, bgColor } from "@isotope/prototope";
import { createDOMView } from "@isotope/core";

const view = createDOMView(element, config);
const { node, getCSS } = view.$(Prototope());
// basic custom util
const secondChild = createSubSelector("nth-child(2)");

node.div(secondChild(bgColor("primary")));
```

**Arguments**:

- `subSelector: string` - Sub-selector to be created. It should have a form of a string containing a part of CSS selector that follows the `:` (colon) sign. If your selector requires the use of double-colon (e.g. `::after`), your string should only contain a single one (e.g. `:after`).

**Returns**:

- The created Prototope sub-selector Isotope directive.
