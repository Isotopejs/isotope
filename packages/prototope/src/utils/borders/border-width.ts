import { Util } from "../../declarations";
import { createUtil } from "../util";

type BorderWidth = 0 | 2 | 4 | 8;

/**
 * Calculates border-width depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated border-width.
 */
const getBorderWidth = (value?: BorderWidth): string => {
	if (value === 0) {
		return "0";
	} else if (value) {
		return `${value}px`;
	}

	return "1px";
};
/**
 * Prototope border-width util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const border = (value?: BorderWidth): Util => {
	return createUtil({ borderWidth: getBorderWidth(value) });
};
/**
 * Prototope border-top-width util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const borderT = (value?: BorderWidth): Util => {
	return createUtil({ borderTopWidth: getBorderWidth(value) });
};
/**
 * Prototope border-bottom-width util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const borderB = (value?: BorderWidth): Util => {
	return createUtil({ borderBottomWidth: getBorderWidth(value) });
};
/**
 * Prototope border-right-width util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const borderR = (value?: BorderWidth): Util => {
	return createUtil({ borderRightWidth: getBorderWidth(value) });
};
/**
 * Prototope border-left-width util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const borderL = (value?: BorderWidth): Util => {
	return createUtil({ borderLeftWidth: getBorderWidth(value) });
};

export { border, borderT, borderB, borderR, borderL };
