import { createTransformUtil } from "./transform-util";
/**
 * Prototope transform rotate util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const rotate = (value) => {
    return createTransformUtil({
        rotate: value === 0 ? "0" : `${value}deg`
    });
};
export { rotate };
//# sourceMappingURL=rotate.js.map