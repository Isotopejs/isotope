import { Util } from "../../declarations";
declare type Scale = 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150;
/**
 * Prototope transform scale util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const scale: (value: Scale) => Util;
/**
 * Prototope transform scale x util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const scaleX: (value: Scale) => Util;
/**
 * Prototope transform scale y util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const scaleY: (value: Scale) => Util;
export { scale, scaleX, scaleY };
