import { Util } from "../../declarations";
import { createUtil } from "../util";

/**
 * Prototope flex-grow util.
 *
 * @param value - Flex grow value.
 * @returns - Prototope util.
 */
const flexGrow = (value: 0 | 1 = 0): Util => {
	return createUtil({ flexGrow: `${value}` as any });
};

export { flexGrow };
