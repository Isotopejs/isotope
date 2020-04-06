import { registerChild } from "./register";
const nodes = [
    "blockquote",
    "dd",
    "div",
    "dl",
    "dt",
    "figcaption",
    "figure",
    "hr",
    "li",
    "main",
    "ol",
    "p",
    "pre",
    "ul"
];
nodes.forEach((name) => {
    registerChild(name);
});
//# sourceMappingURL=content.js.map