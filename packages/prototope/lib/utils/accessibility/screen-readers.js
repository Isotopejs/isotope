import { createUtil } from "../util";
const srOnly = createUtil({
    borderWidth: "0",
    clip: "rect(0, 0, 0, 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px"
});
const notSrOnly = createUtil({
    clip: "auto",
    height: "auto",
    margin: "0",
    overflow: "visible",
    padding: "0",
    position: "static",
    whiteSpace: "normal",
    width: "auto"
});
export { srOnly, notSrOnly };
//# sourceMappingURL=screen-readers.js.map