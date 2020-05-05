import { createUtil } from "../util";
/**
 * Prototope grid-template-columns util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const gridCols = (value) => {
    let processedValue = "";
    if (typeof value === "number") {
        processedValue = `repeat(${value},minmax(0,1fr))`;
    }
    else {
        processedValue = "none";
    }
    return createUtil({ gridTemplateColumns: processedValue });
};
export { gridCols };
//# sourceMappingURL=grid-template-columns.js.map