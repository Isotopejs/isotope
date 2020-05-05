import { createUtil } from "../util";

const clearLeft = createUtil({ clear: "left" });
const clearRight = createUtil({ clear: "right" });
const clearBoth = createUtil({ clear: "both" });
const clearNone = createUtil({ clear: "none" });

export { clearLeft, clearRight, clearBoth, clearNone };
