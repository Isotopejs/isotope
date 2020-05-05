import { createTransformUtil } from "./transform-util";
/**
 * Calculates translate transform depending on the passed config value.
 *
 * @param value - Config value.
 * @returns - Calculated translate transform.
 */
const getTranslateValue = (value) => {
    const divider = 4;
    if (value === "1/2") {
        return "50%";
    }
    else if (value === "-1/2") {
        return "-50%";
    }
    else if (value === "px") {
        return "1px";
    }
    else if (value === "-px") {
        return "-1px";
    }
    else if (value === "full") {
        return "100%";
    }
    else if (value === "-full") {
        return "-100%";
    }
    return `${value / divider}rem`;
};
/**
 * Prototope transform rotate util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const translateX = (value) => {
    return createTransformUtil({
        translateX: getTranslateValue(value)
    });
};
/**
 * Prototope transform rotate util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const translateY = (value) => {
    return createTransformUtil({
        translateY: getTranslateValue(value)
    });
};
export { translateX, translateY };
//# sourceMappingURL=translate.js.map