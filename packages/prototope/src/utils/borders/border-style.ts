import { createUtil } from "../util";

const borderSolid = createUtil({ borderStyle: "solid" });
const borderDashed = createUtil({ borderStyle: "dashed" });
const borderDotted = createUtil({ borderStyle: "dotted" });
const borderDouble = createUtil({ borderStyle: "double" });
const borderNone = createUtil({ borderStyle: "none" });

export { borderSolid, borderDashed, borderDotted, borderDouble, borderNone };
