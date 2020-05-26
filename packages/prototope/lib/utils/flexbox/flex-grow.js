import { createUtil } from "../util";
/**
 * Prototope flex-grow util.
 *
 * @param value - Flex grow value.
 * @returns - Prototope util.
 */
const flexGrow = (value = 0) => {
    return createUtil({ flexGrow: `${value}` });
};
export { flexGrow };
//# sourceMappingURL=flex-grow.js.map