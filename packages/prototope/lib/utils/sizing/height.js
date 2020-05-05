import { createUtil } from "../util";
/**
 * Prototope height util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const h = (value) => {
    const divider = 4;
    let processedValue = "";
    if (value === 0) {
        processedValue = "0";
    }
    else if (value === "px") {
        processedValue = "1px";
    }
    else if (value === "auto") {
        processedValue = "auto";
    }
    else if (value === "full") {
        processedValue = "100%";
    }
    else if (value === "screen") {
        processedValue = "100vh";
    }
    else {
        processedValue = `${value / divider}rem`;
    }
    return createUtil({ height: processedValue });
};
export { h };
//# sourceMappingURL=height.js.map