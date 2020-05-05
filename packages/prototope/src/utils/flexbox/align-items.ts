import { createUtil } from "../util";

const itemsStretch = createUtil({ alignItems: "stretch" });
const itemsStart = createUtil({ alignItems: "flex-start" });
const itemsCenter = createUtil({ alignItems: "center" });
const itemsEnd = createUtil({ alignItems: "flex-end" });
const itemsBaseline = createUtil({ alignItems: "center" });

export { itemsStretch, itemsStart, itemsCenter, itemsEnd, itemsBaseline };
