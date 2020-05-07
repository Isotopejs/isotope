import { Util } from "../../declarations";
import { createTransformUtil } from "./transform-util";

type Translate =
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
	| "1/2"
	| "-1/2"
	| "px"
	| "-px"
	| "full"
	| "-full";

/**
 * Calculates translate transform depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated translate transform.
 */
const getTranslateValue = (value: Translate): string => {
	const divider = 4;

	if (value === "1/2") {
		return "50%";
	} else if (value === "-1/2") {
		return "-50%";
	} else if (value === "px") {
		return "1px";
	} else if (value === "-px") {
		return "-1px";
	} else if (value === "full") {
		return "100%";
	} else if (value === "-full") {
		return "-100%";
	}

	return `${value / divider}rem`;
};
/**
 * Prototope transform translate X util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const translateX = (value: Translate): Util => {
	return createTransformUtil({
		translateX: getTranslateValue(value)
	});
};
/**
 * Prototope transform translate Y util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const translateY = (value: Translate): Util => {
	return createTransformUtil({
		translateY: getTranslateValue(value)
	});
};

export { translateX, translateY };
