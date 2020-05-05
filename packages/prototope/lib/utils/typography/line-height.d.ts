import { Util } from "../../declarations";
declare type Leading = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
/**
 * Prototope line-height util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const leading: (value: Leading) => Util;
export { leading };
