import { registerChild } from "./register";
const nodes = ["embed", "iframe", "object", "param", "picture", "source"];
nodes.forEach((name) => {
    registerChild(name);
});
//# sourceMappingURL=embed.js.map