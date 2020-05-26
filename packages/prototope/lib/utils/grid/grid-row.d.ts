import { Util } from "../../declarations";
declare type RowSpan = 1 | 2 | 3 | 4 | 5 | 6;
declare type RowStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | "auto";
declare const rowAuto: (node: import("@isotope/core/lib/node").IsotopeNode<any, import("../../declarations").PrototopeContext>) => void;
/**
 * Prototope grid-row util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
declare const rowSpan: (value: RowSpan) => Util;
/**
 * Prototope grid-row-start util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const rowStart: (value: RowStart) => Util;
/**
 * Prototope grid-row-end util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const rowEnd: (value: RowStart) => Util;
export { rowAuto, rowSpan, rowStart, rowEnd };
