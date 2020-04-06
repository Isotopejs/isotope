import { registerChild } from "./register";
const nodes = [
    "details",
    "dialog",
    "menu",
    "summary",
    "canvas",
    "script",
    "noscript",
    "slot",
    "template"
];
nodes.forEach((name) => {
    registerChild(name);
});
//# sourceMappingURL=interactive.js.map