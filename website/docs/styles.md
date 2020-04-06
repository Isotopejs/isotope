# Styles

Styles is a [configurator](./configurators.md) used to control node's CSS styles. It can be imported with:

```javascript
import "@isotope/core/lib/configurators/styles";
```

The configurator extends the node's configuration by a `styles` option and adds 3 new methods:

> INFO: All of styles configurator methods and the `styles` configuration option interpret numbers as pixel values, so `10` becomes `"10px"`.

## IsotopeNode.prototype.setStyles(styles)

`setStyles()` method sets multiple CSS style properties at once.

```javascript
// ...
node.setStyles({
    background: "green",
    width: 10
});
```

**Arguments**:

- `styles: object` - An object where key-value pairs are equivalent to style property's name and value respectively.

**Returns**:

- The node the method was called upon.

## IsotopeNode.prototype.setStyle(property, value)

`setStyle()` method sets a single style property's value.

```javascript
// ...
node.setStyle("background", "green");
```

**Arguments**:

- `property: string` - Name of the style property to be set.
- `value: string | number` - Value to be set for the style property.

**Returns**:

- The node the method was called upon.

## IsotopeNode.prototype.getStyle(property)

`getStyle()` method retrieves the value of the specified style property.

```javascript
// ...
node.getStyle("background"); // "green"
```

**Arguments**:

- `property: string` - Name of the style property to be retrieved.

**Returns**:

- The value of the style property (if exists).

## Configuration

The `styles` configuration property allows you to easily set CSS styles right after a new node is created.

```javascript
// ...
const node = view.child("div", {
    styles: {
        background: "green",
        width: 10
    }
});
```

You can also pass a function returning an object to the property, effectively making CSS styles [reactive](./reactivity.md).

```javascript
const node = view.child("div", {
    state: {
        color: "green"
    },
    styles: (node) => ({
        background: node.get("color"),
        width: 10
    })
});

node.setState("color", "red"); // "background" property is changed to "red"
```

A function has access to the created node as its parameter and is run when the node is created, as well as on each node update.
