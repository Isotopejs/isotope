import { createUtil } from "../util";
/**
 * Prototope grid-template-rows util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const gridRows = (value) => {
    let processedValue = "";
    if (typeof value === "number") {
        processedValue = `repeat(${value},minmax(0,1fr))`;
    }
    else {
        processedValue = "none";
    }
    return createUtil({ gridTemplateRows: processedValue });
};
export { gridRows };
//# sourceMappingURL=grid-template-rows.js.map