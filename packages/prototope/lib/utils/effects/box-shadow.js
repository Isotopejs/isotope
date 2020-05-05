import { createUtil } from "../util";
const shadowXs = createUtil({ boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)" });
const shadowSm = createUtil({ boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" });
const shadow = createUtil({
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
});
const shadowMd = createUtil({
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
});
const shadowLg = createUtil({
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
});
const shadowXl = createUtil({
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
});
const shadow2xl = createUtil({ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" });
const shadowInner = createUtil({ boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)" });
const shadowOutline = createUtil({ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)" });
const shadowNone = createUtil({ boxShadow: "none" });
export { shadowXs, shadowSm, shadow, shadowMd, shadowLg, shadowXl, shadow2xl, shadowInner, shadowOutline, shadowNone };
//# sourceMappingURL=box-shadow.js.map