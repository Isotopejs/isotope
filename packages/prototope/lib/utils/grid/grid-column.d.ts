import { Util } from "../../declarations";
declare type ColumnStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | "auto";
declare const colAuto: (node: import("@isotope/core/lib/node").IsotopeNode<any, import("../../declarations").PrototopeContext>) => void;
/**
 * Prototope grid-column util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
declare const colSpan: (value: 2 | 11 | 1 | 4 | 8 | 3 | 5 | 6 | 7 | 9 | 10 | 12) => Util;
/**
 * Prototope grid-column-start util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const colStart: (value: ColumnStart) => Util;
/**
 * Prototope grid-column-end util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const colEnd: (value: ColumnStart) => Util;
export { colAuto, colSpan, colStart, colEnd };
