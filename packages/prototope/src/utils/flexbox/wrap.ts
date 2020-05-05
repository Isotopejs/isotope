import { createUtil } from "../util";

const flexNoWrap = createUtil({ flexWrap: "nowrap" });
const flexWrap = createUtil({ flexWrap: "wrap" });
const flexWrapReverse = createUtil({ flexWrap: "wrap-reverse" });

export { flexNoWrap, flexWrap, flexWrapReverse };
