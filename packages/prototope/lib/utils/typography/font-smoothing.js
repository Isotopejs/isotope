import { createUtil } from "../util";
const antialiased = createUtil({
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased"
});
const subpixelAntialiased = createUtil({
    MozOsxFontSmoothing: "auto",
    WebkitFontSmoothing: "auto"
});
export { antialiased, subpixelAntialiased };
//# sourceMappingURL=font-smoothing.js.map