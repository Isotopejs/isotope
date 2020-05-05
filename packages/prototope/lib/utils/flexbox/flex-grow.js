import { createUtil } from "../util";
/**
 * Prototope flex-grow util.
 *
 * @param grow - Flex grow value.
 * @returns - Prototope util.
 */
const flexGrow = (grow = 0) => {
    return createUtil({ flexGrow: `${grow}` });
};
export { flexGrow };
//# sourceMappingURL=flex-grow.js.map