# Reactivity

Isotope has a bit different approach to reactivity than other UI libraries and frameworks you might know.

There's no complex virtual DOM under-the-hood and nodes are static by default. This approach has its pros and cons. Static nodes are much faster to create and if not used, can be removed immediately after they're created, allowing the garbage collector to free the memory and thus, improve the performance.

However, this **statically-dynamic** approach requires a bit more work from the developer to strictly define what's dynamic and what's not. With that said Isotope tries to keep this process as simple and straightforward as possible, requiring you to understand only 2 concepts - **state** and **linking**.

## State

There are 2 ways to make a node dynamic. The most basic one is by defining its **state**.

State is a [configurator](./configurators.md) that updates the node upon the change of one of its properties.

```javascript
// ...
const node = view.child("div", {
    state: {
        property: 1
    }
});
```

After initialization, you can interact with the state through two methods:

### IsotopeNode.prototype.getState(key)

`getState()` method retrieves a property from the node's state.

```javascript
// ...
node.getState("property"); // 1
```

**Arguments**:

- `key: string` - State property key.

**Returns**:

- State property value (if exists).

### IsotopeNode.prototype.setState(state)

`setState()` method updates node's state and triggers node's update.

```javascript
node.setState({ property: 2 });
```

**Arguments**:

- `state: object` - object containing properties to be added/updated in the state.

**Returns**:

- The node the method was called upon.

## Linking

The second way to make a node dynamic is through **linking**. Linking is a process that links the specified node to another, effectively making it update when the first one does so.

### IsotopeNode.prototype.link(node, position)

`link()` method links the specified Node to the one the method is called upon.

```javascript
// ...
const secondNode = view.child("div");

node.link(secondNode);
```

**Arguments**:

- `node: IsotopeNode` - Node to be linked.
- `position?: number` - Position to place the linked Node at in the linked nodes array. It's used internally for e.g. [list rendering](./list-rendering.md)

**Returns**:

- The node the method was called upon.

### Ways of linking

Linking is an easy way to make nodes depend on one another. When one node is updated (because of state change or through another link), all the linked nodes update as well.

> INFO: A node can have multiple nodes linked to itself, but it can't be linked to more than 1 node.

You can create links not only between parent and child nodes but in all the possible ways. A node deep in the hierarchy can link to the node close to the top and vice-versa.

Isotope provides `autoLink` [configuration option](./nodes.md), to automatically link new direct child nodes to the parent.

### Data passing

Links themselves don't pass any data - they're simply responsible for triggering an update. If linked nodes are meant to share some data (e.g. through the state), it's required to have access to at least one node that contains the mentioned data.

## Detecting updates

When a node updates (either because of a link or state change) you have to have proper setup in place, in order to detect and react to the update.

Isotope provides you with 2 ways to react to node updates - through [events](./events.md) or external configurators (i.e. [attribs](./attribs.md), [classes](./classes.md) and [styles](./styles.md)).
