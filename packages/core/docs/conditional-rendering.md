# Conditional rendering

Conditional rendering allows you to render nodes depending on a certain condition. In Isotope, conditional rendering is possible through the use of special `if()` method.

## Loading

The `if()` method comes in one of special [node packs](./node-packs.md), and can be imported on-demand with the following statement:

```javascript
import "@isotope/core/lib/nodes/conditional";
```

> WARN: Remember that like any other method from special node packs, `if()` is **exclusive** and prevents the parent from having any other children.

## IsotopeNode.prototype.if(condition, onTrue, onFalse)

`if()` method renders nodes depending on a certain condition.

```javascript
// ...
node.if(
    true,
    (node) => {
        node.child("span", "Is true");
    },
    (node) => {
        node.child("span", "Is false");
    }
);
```

**Arguments**:

- `condition: boolean | string | function` - condition used to decide which nodes to render.
  - `boolean` - used for static one-off conditional rendering.
  - `string` - the state property's name, used to render depending on the value of the property.
  - `function` - a function returning boolean, given the parent node. It's executed on node creation and on every update.
- `onTrue: function` - [directive](./directives.md) to be executed when the condition is truthy.
- `onFalse?: function` - optional directive to be executed when the condition is falsy.

**Returns**:

- The node the method was called upon.

## Reactivity

The `if()` method can be called with the name of a state property, which will make the rerendering process happen every time the node is [updated](./reactivity.md).

```javascript
// ...
const node = view
    .child("div", {
        state: {
            render: true
        }
    })
    .if(
        "render",
        (node) => {
            node.child("span", "Is true");
        },
        (node) => {
            node.child("span", "Is false");
        }
    );

node.setState("render", false); // renders <span>Is false</span>
```

If you need to do some more complicated processing before determining the condition, you can also pass it in the form of a function.

```javascript
const node = view
    .child("div", {
        state: {
            render: true
        }
    })
    .if(
        (node) => {
            return !node.getState("render");
        },
        (node) => {
            node.child("span", "Is true");
        },
        (node) => {
            node.child("span", "Is false");
        }
    );
```

A function in the condition gets access to the parent node.

> INFO: When the condition changes, the `if()` method completely removes the previous element from the DOM. Because of that, it's recommended for use in scenarios where you're rendering large or deep node structures, where you can't afford to keep two node trees in the memory. For smaller node trees with more frequent updates, it's recommended to use the `display` property instead.
