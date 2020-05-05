import { createUtil } from "../util";
/**
 * Prototope color util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const textColor = (value) => {
    return createUtil(({ colors }) => ({
        color: colors[value]
    }));
};
export { textColor };
//# sourceMappingURL=text-color.js.map