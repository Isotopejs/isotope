# Text rendering

For quick, one-off text inserts, you can pass string instead of a configuration object during the node creation.

```javascript
// ...
const node = view.child("span", "Text");
```

The text is set through the `textContent` property, so it's interpreted as pure text, without any HTML parsing.

However, if you require your text to be [reactive](./reactivity.md) or you need to configure the node with a config object, you'll need to use a special `text()` method.

## Loading

The `text()` method comes in one of the special [node packs](./node-packs.md), and can be imported on-demand with the following statement:

```javascript
import "@isotope/core/lib/nodes/text";
```

> WARN: Remember that like any other method from special node packs, `text()` is **exclusive** and prevents the parent from having any other children.

## IsotopeNode.prototype.text(text)

`text()` method allows you to set the text of the node's DOM element.

```javascript
// ...
node.text("Text");
```

**Arguments**:

- `text: string | function` - Text to be set. If it's a function the text becomes reactive.

**Returns**:

- The node the method was called upon.

## Reactivity

The `text()` method can be called with a function returning a string, in order to make the text of the node's DOM element reactive.

```javascript
// ...
const node = view
    .child("div", {
        state: {
            text: "text"
        }
    })
    .text((node) => node.getState("text"));

node.setState("text", "New text"); // text changes to "New text"
```

The function gets access to the node it was called upon.
