import { createUtil } from "../util";

const underline = createUtil({ textDecoration: "underline" });
const lineThrough = createUtil({ textDecoration: "line-through" });
const noUnderline = createUtil({ textDecoration: "none" });

export { underline, lineThrough, noUnderline };
