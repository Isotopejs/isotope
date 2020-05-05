import { createUtil } from "../util";
/**
 * Calculates margin depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated margin.
 */
const getMarginValue = (value) => {
    const divider = 4;
    if (value === 0) {
        return "0";
    }
    else if (value === "px") {
        return "1px";
    }
    else if (value === "-px") {
        return "-1px";
    }
    return `${value / divider}rem`;
};
/**
 * Prototope margin util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const m = (value) => {
    return createUtil({ margin: getMarginValue(value) });
};
/**
 * Prototope margin-top & margin-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const my = (value) => {
    const processedValue = getMarginValue(value);
    return createUtil({
        marginBottom: processedValue,
        marginTop: processedValue
    });
};
/**
 * Prototope margin-right & margin-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const mx = (value) => {
    const processedValue = getMarginValue(value);
    return createUtil({
        marginLeft: processedValue,
        marginRight: processedValue
    });
};
/**
 * Prototope margin-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const mb = (value) => {
    return createUtil({
        marginBottom: getMarginValue(value)
    });
};
/**
 * Prototope margin-top util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const mt = (value) => {
    return createUtil({
        marginTop: getMarginValue(value)
    });
};
/**
 * Prototope margin-right util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const mr = (value) => {
    return createUtil({
        marginRight: getMarginValue(value)
    });
};
/**
 * Prototope margin-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const ml = (value) => {
    return createUtil({
        marginLeft: getMarginValue(value)
    });
};
export { m, my, mx, mb, mt, mr, ml };
//# sourceMappingURL=margin.js.map