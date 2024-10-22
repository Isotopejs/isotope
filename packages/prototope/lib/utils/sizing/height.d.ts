import { Util } from "../../declarations";
declare type Height = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | "px" | "auto" | "full" | "screen";
/**
 * Prototope height util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const h: (value: Height) => Util;
export { h };
