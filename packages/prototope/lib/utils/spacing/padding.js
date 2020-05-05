import { createUtil } from "../util";
/**
 * Calculates padding depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated padding.
 */
const getPaddingValue = (value) => {
    const divider = 4;
    if (value === 0) {
        return "0";
    }
    else if (value === "px") {
        return "1px";
    }
    return `${value / divider}rem`;
};
/**
 * Prototope padding util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const p = (value) => {
    return createUtil({ padding: getPaddingValue(value) });
};
/**
 * Prototope padding-top & padding-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const py = (value) => {
    const processedValue = getPaddingValue(value);
    return createUtil({
        paddingBottom: processedValue,
        paddingTop: processedValue
    });
};
/**
 * Prototope padding-right & padding-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const px = (value) => {
    const processedValue = getPaddingValue(value);
    return createUtil({
        paddingLeft: processedValue,
        paddingRight: processedValue
    });
};
/**
 * Prototope padding-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const pb = (value) => {
    return createUtil({
        paddingBottom: getPaddingValue(value)
    });
};
/**
 * Prototope padding-top util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const pt = (value) => {
    return createUtil({
        paddingTop: getPaddingValue(value)
    });
};
/**
 * Prototope padding-right util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const pr = (value) => {
    return createUtil({
        paddingRight: getPaddingValue(value)
    });
};
/**
 * Prototope padding-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const pl = (value) => {
    return createUtil({
        paddingLeft: getPaddingValue(value)
    });
};
export { p, py, px, pb, pt, pr, pl };
//# sourceMappingURL=padding.js.map