import { createUtil } from "../util";
/**
 * Prototope border-color util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const borderColor = (value) => {
    return createUtil(({ colors }) => ({
        borderColor: colors[value]
    }));
};
export { borderColor };
//# sourceMappingURL=border-color.js.map