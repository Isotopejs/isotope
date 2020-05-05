import { Util } from "../../declarations";
import { createUtil } from "../util";

/**
 * Prototope flex-grow util.
 *
 * @param grow - Flex grow value.
 * @returns - Prototope util.
 */
const flexGrow = (grow: 0 | 1 = 0): Util => {
	return createUtil({ flexGrow: `${grow}` as any });
};

export { flexGrow };
