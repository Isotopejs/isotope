import { createUtil } from "../util";
/**
 * Prototope flex-shrink util.
 *
 * @param shrink - Flex shrink value.
 * @returns - Prototope util.
 */
const flexShrink = (shrink = 0) => {
    return createUtil({ flexShrink: `${shrink}` });
};
export { flexShrink };
//# sourceMappingURL=flex-shrink.js.map