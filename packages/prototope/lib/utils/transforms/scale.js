import { createTransformUtil } from "./transform-util";
/**
 * Prototope transform scale util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const scale = (value) => {
    const divider = 100;
    const scale = `${value / divider}`;
    return createTransformUtil({
        scaleX: scale,
        scaleY: scale
    });
};
/**
 * Prototope transform scale x util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const scaleX = (value) => {
    const divider = 100;
    return createTransformUtil({
        scaleX: `${value / divider}`
    });
};
/**
 * Prototope transform scale y util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const scaleY = (value) => {
    const divider = 100;
    return createTransformUtil({
        scaleY: `${value / divider}`
    });
};
export { scale, scaleX, scaleY };
//# sourceMappingURL=scale.js.map