import { registerChild } from "./register";
const nodes = ["area", "audio", "img", "track", "video"];
nodes.forEach((name) => {
    registerChild(name);
});
//# sourceMappingURL=media.js.map