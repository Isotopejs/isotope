import { registerChild } from "./register";
const nodes = [
    "button",
    "datalist",
    "fieldset",
    "form",
    "input",
    "label",
    "legend",
    "meter",
    "optgroup",
    "option",
    "output",
    "progress",
    "select",
    "textarea"
];
nodes.forEach((name) => {
    registerChild(name);
});
//# sourceMappingURL=form.js.map