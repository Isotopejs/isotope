import { createUtil } from "../util";
/**
 * Prototope opacity util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const opacity = (value) => {
    const divider = 100;
    return createUtil({ opacity: `${value / divider}` });
};
export { opacity };
//# sourceMappingURL=opacity.js.map