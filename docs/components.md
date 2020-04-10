# Components

Components form the foundation of any UI library. They allow for easy code reuse and sharing, improving the development experience and comfort.

Isotope components are, in fact, [directives](./directives.md), which themselves are nothing more than simple functions. Given a node, they can operate on it in various different ways - including creating new child nodes.

```javascript
const component = (node) => {
    const child = node.child("div");

    return child;
};
```

A component, just like a normal directive, can be applied using the `$()` method.

```javascript
// ...
const node = view.child("div");
const childRef = node.$(component);
```

It's important to remember that if the passed function returns a value, the `$()` method forwards and returns it as its result.

## Component encapsulation

Although a directive can create multiple direct child nodes of the passed node, it's recommended to have a singular top node when designing your components.

Isotope directives have unique properties, that allow component creators to decide how they want their users to interact with their components. One of such properties is the ability to control access to component-related nodes.

A directive can either return a value or not return anything. For component directives, a very common practice would be to return the component's top-level node. After that the same node will be returned from calling the `$()` method. Remember that if a directive doesn't return anything the `$()` method will continue on to return the node it was called upon, for easier method chaining.

```javascript
// ...
const encapsulatedComponent = (node) => {
    node.child("div");
};
const node = view.child("div");
const nodeRef = node.$(encapsulatedComponent); // Directive was applied.

nodeRef === node; // true -> The original node was returned.
```

> WARN: If you're designing Isotope components for third-party use, it's important to let your users know whether the component returns a node or not. Keep in mind that, in general, returning a node is a recommended practice for component-like directives.

## Properties

Components wouldn't be the same without the ability to accept properties. In Isotope, properties can be passed to components simply through nesting functions.

```javascript
const component = (properties) => {
    return (node) => {
        return node.child("div", {
            styles: {
                background: properties.background,
                color: properties.color
            }
        });
    };
};
```

It's recommended that you accept properties in the form of an object (especially when having more than 2 of them), to make the user more aware of the meaning of certain property.

```javascript
// ...
const node = view.child("div");

node.$(
    component({
        background: "green",
        color: "white"
    })
);
```

## Reactivity

It's important to understand that Isotope components, like directives, are applied only **once**. This means that the component function won't be executed again when e.g. the parent updates. Unlike other UI libraries and frameworks, Isotope has a bit different - more static - approach to [reactivity](./reactivity.md).

To make your components reactive, you have to depend on techniques such as component's internal state, linking and using the available parent reference as a source of data.
