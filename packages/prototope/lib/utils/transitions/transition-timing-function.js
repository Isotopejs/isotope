import { createUtil } from "../util";
const easeLinear = createUtil({ transitionTimingFunction: "linear" });
const easeIn = createUtil({ transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)" });
const easeOut = createUtil({ transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" });
const easeInOut = createUtil({
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
});
export { easeLinear, easeIn, easeOut, easeInOut };
//# sourceMappingURL=transition-timing-function.js.map