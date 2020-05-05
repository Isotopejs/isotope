import { Util } from "../../declarations";
declare type Margin = 0 | 1 | -1 | 2 | -2 | 3 | -3 | 4 | -4 | 5 | -5 | 6 | -6 | 8 | -8 | 10 | -10 | 12 | -12 | 16 | -16 | 20 | -20 | 24 | -24 | 32 | -32 | 40 | -40 | 48 | -48 | 56 | -56 | 64 | -64 | "px" | "-px";
/**
 * Prototope margin util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const m: (value: Margin) => Util;
/**
 * Prototope margin-top & margin-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const my: (value: Margin) => Util;
/**
 * Prototope margin-right & margin-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const mx: (value: Margin) => Util;
/**
 * Prototope margin-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const mb: (value: Margin) => Util;
/**
 * Prototope margin-top util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const mt: (value: Margin) => Util;
/**
 * Prototope margin-right util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const mr: (value: Margin) => Util;
/**
 * Prototope margin-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const ml: (value: Margin) => Util;
export { m, my, mx, mb, mt, mr, ml };
