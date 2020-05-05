import { createUtil } from "../util";
/**
 * Calculates gap depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated gap.
 */
const getGapValue = (value) => {
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
 * Prototope gap util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
const gap = (value) => {
    return createUtil({ gap: getGapValue(value) });
};
/**
 * Prototope row-gap util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const rowGap = (value) => {
    return createUtil({ rowGap: getGapValue(value) });
};
/**
 * Prototope column-gap util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const colGap = (value) => {
    return createUtil({ columnGap: getGapValue(value) });
};
export { gap, rowGap, colGap };
//# sourceMappingURL=gap.js.map