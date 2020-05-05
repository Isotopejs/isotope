import { after } from "../../sub-selectors";
import { createUtil } from "../util";
const floatRight = createUtil({
    float: "right"
});
const floatLeft = createUtil({ float: "left" });
const floatNone = createUtil({ float: "none" });
const clearfix = after(createUtil({
    clear: "both",
    content: `""`,
    display: "table"
}));
export { floatRight, floatLeft, floatNone, clearfix };
//# sourceMappingURL=float.js.map