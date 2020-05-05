import { createUtil } from "../util";
/**
 * Prototope flex-grow util.
 *
 * @param order - Order value.
 * @returns - Prototope util.
 */
const order = (order) => {
    let value = "";
    if (typeof order === "number") {
        value = `${order}`;
    }
    else if (order === "first") {
        value = "-9999";
    }
    else if (order === "last") {
        value = "9999";
    }
    else {
        value = "0";
    }
    return createUtil({ order: value });
};
export { order };
//# sourceMappingURL=order.js.map