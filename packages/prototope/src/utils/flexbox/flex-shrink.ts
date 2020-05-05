import { Util } from "../../declarations";
import { createUtil } from "../util";

/**
 * Prototope flex-shrink util.
 *
 * @param shrink - Flex shrink value.
 * @returns - Prototope util.
 */
const flexShrink = (shrink: 0 | 1 = 0): Util => {
	return createUtil({ flexShrink: `${shrink}` as any });
};

export { flexShrink };
