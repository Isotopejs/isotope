import { Util } from "../../declarations";
import { createUtil } from "../util";

type Gap =
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
 * Calculates gap depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated gap.
 */
const getGapValue = (value: Gap): string => {
	const divider = 4;

	if (value === 0) {
		return "0";
	} else if (value === "px") {
		return "1px";
	}

	return `${value / divider}rem`;
};
/**
 * Prototope gap util.
 *
 * @param value - Config  value.
 * @returns - Prototope util.
 */
const gap = (value: Gap): Util => {
	return createUtil({ gap: getGapValue(value) });
};
/**
 * Prototope row-gap util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const rowGap = (value: Gap): Util => {
	return createUtil({ rowGap: getGapValue(value) });
};
/**
 * Prototope column-gap util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const colGap = (value: Gap): Util => {
	return createUtil({ columnGap: getGapValue(value) });
};

export { gap, rowGap, colGap };
