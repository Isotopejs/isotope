import { Util } from "../../declarations";
import { createUtil } from "../util";

type Padding =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 8
	| 10
	| 12
	| 16
	| 20
	| 24
	| 32
	| 40
	| 48
	| 56
	| 64
	| "px";

/**
 * Calculates padding depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated padding.
 */
const getPaddingValue = (value: Padding): string => {
	const divider = 4;

	if (value === 0) {
		return "0";
	} else if (value === "px") {
		return "1px";
	}

	return `${value / divider}rem`;
};
/**
 * Prototope padding util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const p = (value: Padding): Util => {
	return createUtil({ padding: getPaddingValue(value) });
};
/**
 * Prototope padding-top & padding-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const py = (value: Padding): Util => {
	const processedValue = getPaddingValue(value);

	return createUtil({
		paddingBottom: processedValue,
		paddingTop: processedValue
	});
};
/**
 * Prototope padding-right & padding-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const px = (value: Padding): Util => {
	const processedValue = getPaddingValue(value);

	return createUtil({
		paddingLeft: processedValue,
		paddingRight: processedValue
	});
};
/**
 * Prototope padding-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const pb = (value: Padding): Util => {
	return createUtil({
		paddingBottom: getPaddingValue(value)
	});
};
/**
 * Prototope padding-top util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const pt = (value: Padding): Util => {
	return createUtil({
		paddingTop: getPaddingValue(value)
	});
};
/**
 * Prototope padding-right util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const pr = (value: Padding): Util => {
	return createUtil({
		paddingRight: getPaddingValue(value)
	});
};
/**
 * Prototope padding-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const pl = (value: Padding): Util => {
	return createUtil({
		paddingLeft: getPaddingValue(value)
	});
};

export { p, py, px, pb, pt, pr, pl };
