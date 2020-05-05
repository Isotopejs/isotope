import { createUtil } from "../util";
/**
 * Prototope line-height util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const leading = (value) => {
    const divider = 4;
    let processedValue = "";
    if (value === "none") {
        processedValue = "1";
    }
    else if (value === "tight") {
        processedValue = "1.25";
    }
    else if (value === "snug") {
        processedValue = "1.375";
    }
    else if (value === "normal") {
        processedValue = "1.5";
    }
    else if (value === "relaxed") {
        processedValue = "1.625";
    }
    else if (value === "loose") {
        processedValue = "2";
    }
    else {
        processedValue = `${value / divider}rem`;
    }
    return createUtil({ lineHeight: processedValue });
};
export { leading };
//# sourceMappingURL=line-height.js.map