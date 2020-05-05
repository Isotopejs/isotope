# Configurators

Isotope's configurators are special entities that are meant to **configure** and **extend** [node](./nodes.md)'s capabilities. They can introduce new methods to the nodes, extend their configuration options or provide entirely new functionalities.

Isotope itself provides you with 5 different configurators:

- **State** - used to allow for [reactivity](./reactivity.md).
- **Context** - used to pass data down the node tree.
- **Attribs** - used to configure node's DOM element's attributes.
- **Classes** - used to configure node's DOM element's CSS classes.
- **Styles** - used to configure node's DOM element's inline styles.

## Context

Context is the simplest configurator. It's meant for passing static, contextual data down the node tree.

To set up context, you need to use the `context` configuration option:

```javascript
// ...
const node = view.child("div", {
    context: {
        property: 1
    }
});
```

After that, you can access context properties using the `getContext()` method.

### getContext(key)

```javascript
// ...
node.getContext("property"); // 1
```

**Arguments**:

- `key: string` - Context property key.

**Returns**:

- Context property value (if exists).

### Nesting

The context is passed down the node tree and so, you can access its properties even on deeply-nested child Nodes.

If you want to add or modify context properties for the given child node and all of its descendants, you can do this by once again using the `context`.

```javascript
// ...
const child = node.child("div", {
    context: {
        secondProperty: 2
    }
});
```

Now the newly-created node and all of its descendants have access to not only its context properties but also the ones from the nodes even higher in the hierarchy (unless they were modified on the way).

```javascript
node.getContext("property"); // 1
node.getContext("secondProperty"); // null

child.getContext("property"); // 1
child.getContext("secondProperty"); // 2
```

> INFO: Context is always passed down from the top-most node in the hierarchy, and can be extended/modified along the way.

## External configurators

Apart from state and context, all of Isotope's DOM element-related configurators are **external**. This means that if you're using NPM, you can choose whether you want to use them or not.

```javascript
import { createDOMView } from "@isotope/core/lib/views/dom";
import "@isotope/core/lib/configurators/attribs"; // attribs configurator
import "@isotope/core/lib/configurators/classes"; // classes configurator
import "@isotope/core/lib/configurators/styles"; // styles configurator
// import "@isotope/core/lib/configurators" imports all external configurators.
// import {createDOMView} from "@isotope/core"; imports the entire Isotope library
```

You can read more about all of the external configurators, in their respective docs sections:

- [attribs](./attribs.md)
- [classes](./classes.md)
- [styles](./styles.md)
