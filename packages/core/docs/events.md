# Events

Events are among the most important aspects of UI development. They allow developers to respond to user's actions and run code non-linearly.

Isotope handles events with minimal overhead, through simple methods that utilize native functionalities of the `Element` under-the-hood. In this way, the same methods can be used to listen to both custom Isotope and user's events, as well as native DOM events (like `click` or `mouseup`).

## IsotopeNode.prototype.on(event, handler, options)

`on()` method sets up an event listener for the specified event.

```javascript
// ...
node.on("click", () => {
    console.log("Clicked!");
});
```

**Arguments**:

- `event: string` - Name of the event to listen to.
- `handler: function` - Event handler function.
- `options: boolean | object` - Event listener options (used for DOM events)

**Returns**:

- The node the method was called upon.

## IsotopeNode.prototype.off(event, handler, options)

`off()` method removes the specified event listener.

```javascript
// ...
const listener = () => {
    console.log("Clicked!");
};

node.on("click", listener);
node.off("click", listener);
```

**Arguments**:

- `event: string` - Name of the event the listener was listening to.
- `handler: function` - The registered event handler function.
- `options: boolean | object` - Event listener options (used for DOM events) that were passed when registering the original event listener.

**Returns**:

- The node the method was called upon.

## IsotopeNode.prototype.emit(event, data)

`emit()` method emits a custom event with the specified data.

```javascript
// ...
const listener = () => {
    console.log("Clicked!");
};

node.on("click", listener);
node.off("click", listener);
```

**Arguments**:

- `event: string` - Name of the event to be emitted.
- `handler: object` - Data for the listeners.

**Returns**:

- The node the method was called upon.

## Isotope lifecycle events

Isotope emits additional custom events throughout the node's lifecycle:

- `state-changed` - fired when a node's own state is changed.
- `node-updated` - fired when a node is updated (either after its state has changed or in a result of [a link](./reactivity.md)).
- `node-removed` - fired when a node is removed.

All lifecycle events pass an object with the `node` property to the listeners, for easier access to the node the event is referring to.

```javascript
// ...
const node = view.child("div");

node.on("node-updated", (event) => {
    event.node === node; // true
});
```
