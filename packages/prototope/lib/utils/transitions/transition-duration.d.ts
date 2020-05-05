import { Util } from "../../declarations";
declare type Duration = 1000 | 700 | 500 | 300 | 200 | 150 | 100 | 75;
/**
 * Prototope transition-duration util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const duration: (value: Duration) => Util;
export { duration };
