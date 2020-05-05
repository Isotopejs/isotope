import { createUtil } from "../util";

const boxBorder = createUtil({ boxSizing: "border-box" });
const boxContent = createUtil({ boxSizing: "content-box" });

export { boxBorder, boxContent };
