import { createUtil } from "../util";
const rowAuto = createUtil({ gridRow: "auto" });
/**
 * Prototope grid-row util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
const rowSpan = (value) => {
    return createUtil({ gridRow: `span ${value}/span ${value}` });
};
/**
 * Prototope grid-row-start util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const rowStart = (value) => {
    return createUtil({ gridRowStart: `${value}` });
};
/**
 * Prototope grid-row-end util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const rowEnd = (value) => {
    return createUtil({ gridRowEnd: `${value}` });
};
export { rowAuto, rowSpan, rowStart, rowEnd };
//# sourceMappingURL=grid-row.js.map