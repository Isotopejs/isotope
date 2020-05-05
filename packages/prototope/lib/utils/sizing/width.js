import { createUtil } from "../util";
/**
 * Prototope width util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const w = (value) => {
    const divider = 4;
    const percentMultiplier = 100;
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
        processedValue = "100vw";
    }
    else if (typeof value === "number") {
        processedValue = `${value / divider}rem`;
    }
    else {
        const [num1, num2] = value.split("/");
        processedValue = `${(Number(num1) / Number(num2)) * percentMultiplier}%`;
    }
    return createUtil({ width: processedValue });
};
export { w };
//# sourceMappingURL=width.js.map