import { createUtil } from "../util";
const breakNormal = createUtil({
    overflowWrap: "normal",
    wordBreak: "normal"
});
const breakWords = createUtil({ overflowWrap: "break-word" });
const breakAll = createUtil({ wordBreak: "break-all" });
const truncate = createUtil({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
});
export { breakNormal, breakWords, breakAll, truncate };
//# sourceMappingURL=word-break.js.map