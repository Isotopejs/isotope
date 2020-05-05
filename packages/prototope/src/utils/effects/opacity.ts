import { Util } from "../../declarations";
import { createUtil } from "../util";

type Opacity = 100 | 75 | 50 | 25 | 0;

/**
 * Prototope opacity util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const opacity = (value: Opacity): Util => {
	const divider = 100;

	return createUtil({ opacity: `${value / divider}` });
};

export { opacity };
