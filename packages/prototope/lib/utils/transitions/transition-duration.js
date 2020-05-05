import { createUtil } from "../util";
/**
 * Prototope transition-duration util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const duration = (value) => {
    return createUtil({ transitionDuration: `${value}ms` });
};
export { duration };
//# sourceMappingURL=transition-duration.js.map