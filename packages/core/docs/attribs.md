# Attribs

Attribs is a [configurator](./configurators.md) used to control attributes. It can be imported with:

```javascript
import "@isotope/core/lib/configurators/attribs";
```

The configurator extends node's configuration by an `attribs` option and adds 3 new methods:

## IsotopeNode.prototype.setAttribs(attribs)

`setAttribs()` method sets multiple attributes at once.

```javascript
// ...
node.setAttribs({
    height: "10px",
    width: "10px"
});
```

**Arguments**:

- `attribs: object` - An object with key-value pairs equivalent to attribute's name and value respectively.

**Returns**:

- The node the method was called upon.

## IsotopeNode.prototype.setAttrib(attrib, value)

`setAttrib()` method sets the value of a single attribute.

```javascript
// ...
node.setAttrib("height", "10px");
```

**Arguments**:

- `attrib: string` - Name of the attribute to be set.
- `value?: string | boolean` - Value to be set for the attribute. If not passed or `false`, the attribute is removed.

**Returns**:

- The node the method was called upon.

## IsotopeNode.prototype.getAttrib(attrib)

`getAttrib()` method retrieves the value of the specified attribute.

```javascript
// ...
node.getAttrib("height"); // "10px"
```

**Arguments**:

- `attrib: string` - Name of the attribute to be retrieved.

**Returns**:

- The value of the attribute (if exists).

## Configuration

The `attribs` configuration option allows you to easily set attributes right after a node is created.

```javascript
/ ...
const node = view.child("div", {
    attribs: {
        height: "10px",
        width: "10px"
    }
});
```

You can also pass a function to the property, making attributes [reactive](./reactivity.md).

```javascript
const node = view.child("div", {
    attribs: (node) => ({
        height: "10px",
        width: `${node.getState("width")}px`
    }),
    state: {
        width: 10
    }
});

node.setState("width", 20); // width attrib is updated
```

A function has access to the created node as its parameter and is run when the node is created, as well as on each node update.
