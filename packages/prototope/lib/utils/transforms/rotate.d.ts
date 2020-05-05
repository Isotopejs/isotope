import { Util } from "../../declarations";
declare type Rotate = 0 | 45 | -45 | 90 | -90 | 180 | -180;
/**
 * Prototope transform rotate util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const rotate: (value: Rotate) => Util;
export { rotate };
