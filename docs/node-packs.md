# Node packs

Although the `child()` method provides a very versatile way of creating child nodes, it's often too verbose for advance use. That's why Isotope provides so-called **node packs**, which extend `IsotopeNode` with methods for easier creation of specific nodes.

## HTML

For HTML, Isotope node pack introduces simple methods in the form of `[tag](config)` to ease-out the creation of such HTML nodes.

```javascript
import { createDOMView } from "@isotope/core";

const view = createDOMView(document.body);

view
    .div({
        context: {
            property: 1
        }
    })
    .span("Text");
```

Just like the `child()` method, all of HTML node pack's methods accept [optional configuration](./nodes.md). After that, they return the created child node for easier method chaining.

### Importing

When importing the library directly from `"@isotope/core"` all available node packs are loaded. Node packs aren't very big, but if you want to keep the bundle size as small as possible, you can opt-in to importing directly from the `lib` folder. With such a setup in place, you can import only the required node packs.

To import the entire HTML node pack, which contains shortcut methods for most of the HTML5 tags, you should use this line in your code:

```javascript
import "@isotope/core/lib/nodes/html";
```

You can also import only the given category of nodes, which are determined mostly according to the [listing on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element). Example for text-related tags:

```javascript
import "@isotope/core/lib/nodes/html/text";
```

For a more detailed listing of all the nodes, check out the library's source code on[GitHub](https://github.com/Isotope-js/core).

> INFO: It's important not to get too cautious about node pack-related bundle size. In big-enough projects, the cost of importing a node pack is diminished when enough Nodes are used. After all, `div()` is shorter than `child("div")`.

## Special Nodes

Apart from the HTML node pack, Isotope provides 3 more special methods, from which each comes in its own node pack. All 3 of these methods provide different functionality:

- `if()` - used for [conditional rendering](./conditional-rendering.md).
- `map()` - used for [list rendering](./list-rendering.md).
- `text()` - used for [text rendering](./text-rendering.md).

The methods also have different syntax when compared to those from the HTML node pack or the `child()` method itself.

> WARN: Special Nodes are **exclusive** meaning that they prevent the parent node from having any children other than themselves.

### Importing

Because special nodes provide a bit more complex functionality than HTML nodes, they come with a bit more code. Thus, it's recommended that you import only the necessary ones using the syntax below:

```javascript
import "@isotope/core/lib/nodes/conditional"; // for if()
import "@isotope/core/lib/nodes/map"; // for map()
import "@isotope/core/lib/nodes/text"; // for text()
```
