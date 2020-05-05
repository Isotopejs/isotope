import { Colors, Util } from "../../declarations";
import { createUtil } from "../util";

/**
 * Prototope background-color util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const bgColor = (value: keyof Colors): Util => {
	return createUtil(({ colors }) => ({
		backgroundColor: colors[value]
	}));
};

export { bgColor };
