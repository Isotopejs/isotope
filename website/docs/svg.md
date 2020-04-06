# SVG

Unlike with HTML elements, Isotope doesn't come with SVG [node pack](./node-packs.md) built-in. That's because there are much easier and more developer-friendly ways of using SVG and Isotope API wasn't designed with SVG in mind.

However, for simple use cases, like loading icons or static SVG graphics, Isotope supports creating SVG elements by supplying the proper `namespace` configuration option:

```javascript
// ...
const namespace = "http://www.w3.org/2000/svg";
const svgNode = view.child("svg", {
    namespace
});
```

For common use-cases, like icons, you might consider abstracting the complexity of SVG elements by creating a dedicated [component](./components.md):

```javascript
// ...
const Icon = (path) => (parent) => {
    const namespace = "http://www.w3.org/2000/svg";
    const svg = parent.child("svg", {
        attribs: {
            height: "24px",
            width: "24px",
            viewBox: "0 0 24 24"
        },
        namespace
    });

    svg.child("path", {
        attribs: {
            d: path
        },
        namespace
    });

    return svg;
};

// ...
const iconSVGPath = "...";

view.$(Icon(iconSVGPath));
```
