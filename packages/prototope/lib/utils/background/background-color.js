import { createUtil } from "../util";
/**
 * Prototope background-color util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const bgColor = (value) => {
    return createUtil(({ colors }) => ({
        backgroundColor: colors[value]
    }));
};
export { bgColor };
//# sourceMappingURL=background-color.js.map