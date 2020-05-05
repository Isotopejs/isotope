import { createUtil } from "../util";

const $static = createUtil({ position: "static" });
const fixed = createUtil({ position: "fixed" });
const absolute = createUtil({ position: "absolute" });
const relative = createUtil({ position: "relative" });
const sticky = createUtil({ position: "sticky" });

export { $static, fixed, absolute, relative, sticky };
