import { Colors, Util } from "../../declarations";
import { createUtil } from "../util";

/**
 * Prototope border-color util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const borderColor = (value: keyof Colors): Util => {
	return createUtil(({ colors }) => ({
		borderColor: colors[value]
	}));
};

export { borderColor };
