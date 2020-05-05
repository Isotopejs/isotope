import { createUtil } from "../util";
const colAuto = createUtil({ gridColumn: "auto" });
/**
 * Prototope grid-column util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
const colSpan = (value) => {
    return createUtil({ gridColumn: `span ${value}/span ${value}` });
};
/**
 * Prototope grid-column-start util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const colStart = (value) => {
    return createUtil({ gridColumnStart: `${value}` });
};
/**
 * Prototope grid-column-end util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const colEnd = (value) => {
    return createUtil({ gridColumnEnd: `${value}` });
};
export { colAuto, colSpan, colStart, colEnd };
//# sourceMappingURL=grid-column.js.map