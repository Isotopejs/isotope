import { IsotopeNode } from "../node";
/**
 * Creates a DOM View.
 *
 * @param element - Element to append to.
 * @param config - DOM View config.
 * @returns - The created top-level Node.
 */
const createDOMView = (element, config) => {
    if (IsotopeNode.prototype.customDOM) {
        IsotopeNode.prototype.customDOM = null;
    }
    if (!config || (config && config.clean && !config.attach)) {
        element.textContent = "";
    }
    return new IsotopeNode(element, config);
};
export { createDOMView };
//# sourceMappingURL=dom.js.map