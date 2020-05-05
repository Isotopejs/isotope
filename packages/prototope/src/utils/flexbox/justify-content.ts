import { createUtil } from "../util";

const justifyStart = createUtil({ justifyContent: "flex-start" });
const justifyCenter = createUtil({ justifyContent: "center" });
const justifyEnd = createUtil({ justifyContent: "flex-end" });
const justifyBetween = createUtil({ justifyContent: "space-between" });
const justifyAround = createUtil({ justifyContent: "space-around" });

export { justifyStart, justifyCenter, justifyEnd, justifyBetween, justifyAround };
