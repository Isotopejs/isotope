# Server-Side Rendering

Although Isotope is really fast when used on the client-side, serving a pre-rendered, static HTML file to the client not only improves the performance even further but also helps you rank higher in search engine results, with better SEO.

Isotope supports **Server-Side Rendering** (SSR) through an additional `@isotope/server` package and its `createStringView()` function.

## createStringView(tag)

`createStringView()` method allows you to create a view that will output its content to a string.

```javascript
import { createStringView } from "@isotope/server";

const view = createStringView(tag);
```

**Arguments**:

- `tag: string` - DOM tag for the outer-most HTML element.

**Returns**:

- Created top-most `IsotopeNode`.

## Usage

After you set up your view together with its content, you can retrieve the rendered string by simply "stringifying" the view itself.

```javascript
import { createStringView } from "@isotope/server";

const view = createStringView("body");
const node = view.child("div", "Text");

const str = `${view}`; // "<body><div>Text</div></body>"
```

> WARN: The use of string view requires a custom, limited implementation of DOM API Element to be loaded for server-side compatibility. Thus, you must not mix it with the use of the DOM view nor expect the `element` property of nodes to have all the properties known from the DOM (only a small, necessary subset is available)!

If for whatever reason you want to only render a specific element, you can do that by following the same practice:

```javascript
// ...
const str2 = `${node}`; // "<div>Text</div>"
```

## Client-side

When you've got your HTML file already served to the client, you can decide what to do next. You can leave it as it is - perfectly static without any JavaScript code whatsoever, or add Isotope and other libraries to enable some dynamic functionalities.

Because of Isotope's **progressive** nature, you can use it either to attach to the entire HTML or just parts of it that require Isotope's dynamic functionalities. You can read more about that in the [views section](./views.md).
