import { Util } from "../../declarations";
declare type GridTemplateRows = 1 | 2 | 3 | 4 | 5 | 6 | "none";
/**
 * Prototope grid-template-rows util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
declare const gridRows: (value: GridTemplateRows) => Util;
export { gridRows };
