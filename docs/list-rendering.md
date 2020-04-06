# List rendering

Any time you want to map your static data to a set of UI elements, you can use Isotope, together with native JS methods:

```javascript
// ...
const data = ["Hello", "World", "In", "JavaScript", "!"];
const list = view.child("ul");
const listItems = data.map((text) => list.child("li", text));
```

Such a solution is perfect for any type of static lists. However, when dealing with dynamic lists, where items get added, removed, moved, etc., you'll have to use the special `map()` method.

## Loading

The `map()` method comes in one of the special [node packs](./node-packs.md), and can be imported on-demand with the following statement:

```javascript
import "@isotope/core/lib/nodes/map";
```

You have to know that `map()` is the largest of special methods, as it requires an implementation of list diffing algorithm to work correctly. Because of that, you should import it only when truly necessary.

> WARN: Remember that like any other method from special node packs, `map()` is **exclusive** and prevents the parent from having any other children.

## IsotopeNode.prototype.map(items, createItem)

`map()` maps list data to a set of nodes.

```javascript
// ...
node.map([1, 2, 3, 4], (item, node) => {
    node.child("div", `Item: ${item}`);
});
```

**Arguments**:

- `items: string | (string | number | object)[] | function` - items to be rendered.
  - `string` - name of the state property which contains a dynamic items list.
  - `(string | number | object)[]` - array of items to render - can be an array of strings, numbers or objects with `id` property.
  - `function` - a function returning an array of items.
- `createItem: function` - function to be used to map each item. It gets access to 3 parameters:
  - `item: string | number | object` - the currently-processed item.
  - `node: IsotopeNode` - the parent node the `map()` was called upon.
  - `index: number` - the current item's index.

**Returns**:

- The node the method was called upon.

## Reactivity

The `map()` method can be used to render both static and dynamic lists. If you want your list to be dynamic, you have to pass it in the form of either state property name or a function.

```javascript
// ...
const node = view
    .child("div", {
        state: {
            list: [1, 2, 3, 4, 5]
        }
    })
    .map("list", (item, node) => node.child("div", item));
// or
const node = view.child("div").map(
    () => {
        return [1, 2, 3, 4, 5];
    },
    (item, node) => node.child("div", item)
);
```

If you're using a function, remember that it has access to the parent node through its first parameter.

### Indexing

To work properly, the `map()` method requires all nodes created with it to have their own **identifiers**. This process is done automatically, however, it requires 2 conditions to be met:

- The `createItem()` function must return a node which is meant to be indexed. Because of that, the method should limit the number of top-level nodes to only 1.
- The mapped items must be either unique by themselves (when they're strings or numbers) or have unique values of the `id` property.

Although limiting, these conditions allow Isotope to maintain high performance throughout list updates. Keep in mind that you don't have to meet them if you're using `map()` to render static lists.
