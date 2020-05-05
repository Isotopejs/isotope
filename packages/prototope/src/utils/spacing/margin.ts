import { Util } from "../../declarations";
import { createUtil } from "../util";

type Margin =
	| 0
	| 1
	| -1
	| 2
	| -2
	| 3
	| -3
	| 4
	| -4
	| 5
	| -5
	| 6
	| -6
	| 8
	| -8
	| 10
	| -10
	| 12
	| -12
	| 16
	| -16
	| 20
	| -20
	| 24
	| -24
	| 32
	| -32
	| 40
	| -40
	| 48
	| -48
	| 56
	| -56
	| 64
	| -64
	| "px"
	| "-px";

/**
 * Calculates margin depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated margin.
 */
const getMarginValue = (value: Margin): string => {
	const divider = 4;

	if (value === 0) {
		return "0";
	} else if (value === "px") {
		return "1px";
	} else if (value === "-px") {
		return "-1px";
	}

	return `${value / divider}rem`;
};
/**
 * Prototope margin util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const m = (value: Margin): Util => {
	return createUtil({ margin: getMarginValue(value) });
};
/**
 * Prototope margin-top & margin-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const my = (value: Margin): Util => {
	const processedValue = getMarginValue(value);

	return createUtil({
		marginBottom: processedValue,
		marginTop: processedValue
	});
};
/**
 * Prototope margin-right & margin-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const mx = (value: Margin): Util => {
	const processedValue = getMarginValue(value);

	return createUtil({
		marginLeft: processedValue,
		marginRight: processedValue
	});
};
/**
 * Prototope margin-bottom util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const mb = (value: Margin): Util => {
	return createUtil({
		marginBottom: getMarginValue(value)
	});
};
/**
 * Prototope margin-top util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const mt = (value: Margin): Util => {
	return createUtil({
		marginTop: getMarginValue(value)
	});
};
/**
 * Prototope margin-right util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const mr = (value: Margin): Util => {
	return createUtil({
		marginRight: getMarginValue(value)
	});
};
/**
 * Prototope margin-left util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const ml = (value: Margin): Util => {
	return createUtil({
		marginLeft: getMarginValue(value)
	});
};

export { m, my, mx, mb, mt, mr, ml };
