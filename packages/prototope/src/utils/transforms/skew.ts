import { Util } from "../../declarations";
import { createTransformUtil } from "./transform-util";

type Skew = 0 | 3 | -3 | 6 | -6 | 12 | -12;

/**
 * Prototope transform skew x util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const skewX = (value: Skew): Util => {
	return createTransformUtil({
		skewX: value === 0 ? "0" : `${value}deg`
	});
};
/**
 * Prototope transform skew y util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const skewY = (value: Skew): Util => {
	return createTransformUtil({
		skewY: value === 0 ? "0" : `${value}deg`
	});
};

export { skewX, skewY };
