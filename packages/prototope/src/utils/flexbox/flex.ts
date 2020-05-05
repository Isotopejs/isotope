import { createUtil } from "../util";

const flexInitial = createUtil({ flex: "0 1 auto" });
const flex1 = createUtil({ flex: "1 1 0%" });
const flexAuto = createUtil({ flex: "1 1 auto" });
const flexNone = createUtil({ flex: "none" });

export { flexInitial, flex1, flexAuto, flexNone };
