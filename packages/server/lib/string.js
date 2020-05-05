import { IsotopeNode } from "@isotope/core";
import { StringElement } from "./element";
/**
 * Creates a String View.
 *
 * @param tag - Tag for the top-level Node.
 * @returns - The created top-level Node.
 */
const createStringView = (tag) => {
    if (!IsotopeNode.prototype.customDOM) {
        IsotopeNode.prototype.customDOM = {
            /** @private */
            createElement(tag) {
                return new StringElement(tag);
            },
            /** @private */
            createEvent(type) {
                return { type };
            }
        };
    }
    return new IsotopeNode(tag);
};
export { createStringView };
//# sourceMappingURL=string.js.map