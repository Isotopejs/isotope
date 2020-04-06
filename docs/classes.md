# Classes

Classes is a [configurator](./configurators.md) used to control CSS classes. It can be imported with:

```javascript
import "@isotope/core/lib/configurators/classes";
```

The configurator extends node's configuration by a `classes` option and adds 4 new methods:

## IsotopeNode.prototype.setClasses(classes)

`setClasses()` method sets multiple CSS classes at once.

```javascript
// ...
node.setClasses(["css-class-name"]);
// or
node.setClasses({
    "css-class-name": true
});
```

**Arguments**:

- `classes: string[] | object` - An array of CSS class names or an object with CSS class names as its keys and booleans as its values, indicating which CSS classes should be applied and which removed.

**Returns**:

- The node the method was called upon.

## IsotopeNode.prototype.addClass(className)

`addClass()` method applies a single CSS class.

```javascript
// ...
node.addClass("css-class-name");
```

**Arguments**:

- `className: string` - CSS class name to be applied.

**Returns**:

- The node the method was called upon.

## IsotopeNode.prototype.hasClass(className)

`hasClass()` method checks whether the specified CSS class name is applied.

```javascript
// ...
node.hasClass("css-class-name");
```

**Arguments**:

- `className: string` - CSS class name to be checked.

**Returns**:

- Whether the CSS class name is applied or not (boolean).

## IsotopeNode.prototype.removeClass(className)

`removeClass()` method allows you to remove the specified CSS class name.

```javascript
// ...
node.removeClass("css-class-name");
```

**Arguments**:

- `className: string` - CSS class name to be removed.

**Returns**:

- The node the method was called upon.

## Configuration

The `classes` configuration option allows you to easily set CSS classes right after a node is created. It can have a form of an array, an object, or a function.

```javascript
/ ...
const node = view.child("div", {
    classes: ["css-class-name"]
});
// or
const node = view.child("div", {
    classes: {
        "css-class-name": true
    }
});
```

Passing a function makes classes [reactive](./reactivity.md). The passed function must return either an array or an object of CSS class names.

```javascript
const node = view.child("div", {
    classes: (node) => ({
        background: node.getState("hasBackground")
    }),
    state: {
        hasBackground: false
    }
});

node.setState("hasBackground", true); // applies "background" CSS class
```

A function has access to the created node as its parameter and is run when the node is created, as well as on each node update.
