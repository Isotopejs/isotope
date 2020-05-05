import { Colors, Util } from "../../declarations";
import { createUtil } from "../util";

/**
 * Prototope color util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const textColor = (value: keyof Colors): Util => {
	return createUtil(({ colors }) => ({
		color: colors[value]
	}));
};

export { textColor };
