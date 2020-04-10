# Directives

Isotope API is designed to be **composable**. It allows you to organize your code the way you want it. Because Isotope is a library, not a framework, it empathizes on the use of native JS code organization solution (i.e. functions, objects, etc.) instead of forcing you to use anything "proprietary".

According to this philosophy, Isotope **directives** are nothing more than simple functions, that given a node, can transform it in various different ways.

```javascript
const directive = (node) => {
    node.setStyle("background", "green");
    node.setAttrib("height", "10px");
};
```

Inside a directive you can use the entire `IsotopeNode` API, including [events](./events.md), [configurators](./configurators.md), and even other directives, by applying them with the `$()` method.

## IsotopeNode.prototype.\$(directives)

`$()` method allows you to apply one or multiple directives to the node.

```javascript
// ...
const node = view.child("div");

node.$(directive);
```

**Arguments**:

- `directives: function | function[]` - A single directive or an array of them.

**Returns**:

- The node it was called upon (default). If a single directive that returns a value was passed, the same value is returned.

## Component directives

Because of their versatile nature, directives can not only alter the original node but also create new ones, making them a perfect choice for creating reusable **components**. For more details about this, read [components section](./components.md) of the docs.
