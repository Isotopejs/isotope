import { createUtil } from "../util";

const resizeNone = createUtil({ resize: "none" });
const resize = createUtil({ resize: "both" });
const resizeY = createUtil({ resize: "vertical" });
const resizeX = createUtil({ resize: "horizontal" });

export { resizeNone, resize, resizeY, resizeX };
