import { Util } from "../../declarations";
import { createUtil } from "../util";

type RowSpan = 1 | 2 | 3 | 4 | 5 | 6;
type RowStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | "auto";
type RowEnd = RowStart;

const rowAuto = createUtil({ gridRow: "auto" });
/**
 * Prototope grid-row util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
const rowSpan = (value: RowSpan): Util => {
	return createUtil({ gridRow: `span ${value}/span ${value}` });
};
/**
 * Prototope grid-row-start util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const rowStart = (value: RowStart): Util => {
	return createUtil({ gridRowStart: `${value}` });
};
/**
 * Prototope grid-row-end util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const rowEnd = (value: RowEnd): Util => {
	return createUtil({ gridRowEnd: `${value}` });
};

export { rowAuto, rowSpan, rowStart, rowEnd };
