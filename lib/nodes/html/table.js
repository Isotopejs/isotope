import { registerChild } from "./register";
const nodes = [
    "caption",
    "col",
    "colgroup",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr"
];
nodes.forEach((name) => {
    registerChild(name);
});
//# sourceMappingURL=table.js.map