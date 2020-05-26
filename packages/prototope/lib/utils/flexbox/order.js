import { createUtil } from "../util";
/**
 * Prototope flex-grow util.
 *
 * @param value - Order value.
 * @returns - Prototope util.
 */
const order = (value) => {
    let processedValue = "";
    if (typeof value === "number") {
        processedValue = `${value}`;
    }
    else if (value === "first") {
        processedValue = "-9999";
    }
    else if (value === "last") {
        processedValue = "9999";
    }
    else {
        processedValue = "0";
    }
    return createUtil({ order: processedValue });
};
export { order };
//# sourceMappingURL=order.js.map