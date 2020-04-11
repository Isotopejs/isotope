# Nodes

In Isotope, a **node** is the most important entity in its entire API. It's essentially a wrapper around DOM API `Element`, that gives you access to all of Isotope's goodness.

## Creation

A node can't be created directly. Instead, you have to have access to another node that will serve as a parent to the new one. The role of the top-level node is played by a [view](./views.md).

When you've got access to a node, you can create a child node with the `child()` method.

### IsotopeNode.prototype.child(tag, config)

`child()` creates a child node of the given node.

```javascript
const view = createDOMView(element, config);
const childNode = view.child("div");
```

**Arguments**:

- `tag: string` - HTML tag for the DOM Element of the node.

- `config?: string | object | function | function[]` - Optional text content string, config object, [directive](./directives.md) or an array of them.

  - `namespace?: string` - Namespace URI used to create the DOM Element. See [SVG section](./svg.md) for example with SVG elements.
  - `autoLink?: boolean` - If all future children of the created node should be automatically **linked**. See [reactivity section](./reactivity.md) for more details about linking.
  - `context?: object` - Context object. See [configurators section](./configurators.md) for more details.
  - `state?: object` - State object. See [reactivity section](./reactivity.md) for more details.

**Returns**:

- Newly-created `IsotopeNode`.

Although `child()` is the primary method for creating new nodes, it's a bit too verbose for more advanced use. For that reason, Isotope provides so-called [node packs](./node-packs.md), which improve the developer experience, through additional shortcut methods.

## Usage

Nodes are at the center of Isotope. Literally, every functionality of the library ties back to them. For more details about them, consider exploring other sections of the docs.

Here's a list of node's properties meant for public access:

- `id?: string` - Node's ID used for [list rendering](./list-rendering.md).
- `element?: CustomElement` - Node's underlying DOM element. If used on Node.js with [SSR](./ssr.md), it's a limited implementation of the DOM API subset.

> WARN: It's not recommended to access `element` directly - especially on the server. If you do need to access `element` and its properties - always check whether they're present!
