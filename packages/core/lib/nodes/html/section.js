import { registerChild } from "./register";
const nodes = [
    "address",
    "article",
    "aside",
    "footer",
    "header",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hgroup",
    "main",
    "nav",
    "section"
];
nodes.forEach((name) => {
    registerChild(name);
});
//# sourceMappingURL=section.js.map