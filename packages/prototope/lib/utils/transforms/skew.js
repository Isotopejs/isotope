import { createTransformUtil } from "./transform-util";
/**
 * Prototope transform skew x util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const skewX = (value) => {
    return createTransformUtil({
        skewX: value === 0 ? "0" : `${value}deg`
    });
};
/**
 * Prototope transform skew y util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const skewY = (value) => {
    return createTransformUtil({
        skewY: value === 0 ? "0" : `${value}deg`
    });
};
export { skewX, skewY };
//# sourceMappingURL=skew.js.map