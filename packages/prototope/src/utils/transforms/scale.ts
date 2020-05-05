import { Util } from "../../declarations";
import { createTransformUtil } from "./transform-util";

type Scale = 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150;

/**
 * Prototope transform scale util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const scale = (value: Scale): Util => {
	const divider = 100;
	const scale = `${value / divider}`;

	return createTransformUtil({
		scaleX: scale,
		scaleY: scale
	});
};
/**
 * Prototope transform scale x util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const scaleX = (value: Scale): Util => {
	const divider = 100;

	return createTransformUtil({
		scaleX: `${value / divider}`
	});
};
/**
 * Prototope transform scale y util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const scaleY = (value: Scale): Util => {
	const divider = 100;

	return createTransformUtil({
		scaleY: `${value / divider}`
	});
};

export { scale, scaleX, scaleY };
