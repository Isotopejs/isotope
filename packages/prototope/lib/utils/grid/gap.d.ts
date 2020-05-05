import { Util } from "../../declarations";
declare type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | "px";
/**
 * Prototope gap util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
declare const gap: (value: Gap) => Util;
/**
 * Prototope row-gap util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const rowGap: (value: Gap) => Util;
/**
 * Prototope column-gap util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const colGap: (value: Gap) => Util;
export { gap, rowGap, colGap };
