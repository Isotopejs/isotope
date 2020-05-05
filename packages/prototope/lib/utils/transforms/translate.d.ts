import { Util } from "../../declarations";
declare type Translate = 0 | 1 | -1 | 2 | -2 | 3 | -3 | 4 | -4 | 5 | -5 | 6 | -6 | 8 | -8 | 10 | -10 | 12 | -12 | 16 | -16 | 20 | -20 | 24 | -24 | 32 | -32 | 40 | -40 | 48 | -48 | 56 | -56 | 64 | -64 | "1/2" | "-1/2" | "px" | "-px" | "full" | "-full";
/**
 * Prototope transform rotate util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const translateX: (value: Translate) => Util;
/**
 * Prototope transform rotate util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const translateY: (value: Translate) => Util;
export { translateX, translateY };
