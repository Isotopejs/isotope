import { Util } from "../../declarations";
import { createTransformUtil } from "./transform-util";

type Rotate = 0 | 45 | -45 | 90 | -90 | 180 | -180;

/**
 * Prototope transform rotate util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const rotate = (value: Rotate): Util => {
	return createTransformUtil({
		rotate: value === 0 ? "0" : `${value}deg`
	});
};

export { rotate };
