import { Util } from "../../declarations";
interface TransformProperties {
    rotate?: string;
    scaleX?: string;
    scaleY?: string;
    skewX?: string;
    skewY?: string;
    translateX?: string;
    translateY?: string;
}
/**
 * Creates Prototope transform util.
 *
 * @param properties - Transform properties.
 * @returns - Prototope transform util.
 */
declare const createTransformUtil: (properties: TransformProperties) => Util;
export { createTransformUtil };
