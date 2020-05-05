import { Util } from "../../declarations";
declare type Skew = 0 | 3 | -3 | 6 | -6 | 12 | -12;
/**
 * Prototope transform skew x util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const skewX: (value: Skew) => Util;
/**
 * Prototope transform skew y util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const skewY: (value: Skew) => Util;
export { skewX, skewY };
