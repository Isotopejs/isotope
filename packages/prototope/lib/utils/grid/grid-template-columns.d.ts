import { Util } from "../../declarations";
declare type GridTemplateColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "none";
/**
 * Prototope grid-template-columns util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const gridCols: (value: GridTemplateColumns) => Util;
export { gridCols };
