import { Util } from "../../declarations";
declare type Order = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "first" | "last" | "none";
/**
 * Prototope flex-grow util.
 *
 * @param value - Order value.
 * @returns - Prototope util.
 */
declare const order: (value: Order) => Util;
export { order };
