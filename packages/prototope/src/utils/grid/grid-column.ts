import { Util } from "../../declarations";
import { createUtil } from "../util";

type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ColumnStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | "auto";
type ColumnEnd = ColumnStart;

const colAuto = createUtil({ gridColumn: "auto" });
/**
 * Prototope grid-column util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
const colSpan = (value: ColumnSpan): Util => {
	return createUtil({ gridColumn: `span ${value}/span ${value}` });
};
/**
 * Prototope grid-column-start util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const colStart = (value: ColumnStart): Util => {
	return createUtil({ gridColumnStart: `${value}` });
};
/**
 * Prototope grid-column-end util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const colEnd = (value: ColumnEnd): Util => {
	return createUtil({ gridColumnEnd: `${value}` });
};

export { colAuto, colSpan, colStart, colEnd };
