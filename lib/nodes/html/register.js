import { IsotopeNode } from "../../node";
/**
 * Registers new Node child function.
 *
 * @param name - Name for the child.
 */
const registerChild = (name) => {
    /** @private */
    if (!IsotopeNode.prototype[name]) {
        IsotopeNode.prototype[name] = function (config) {
            return this.child(name, config);
        };
    }
};
export { registerChild };
//# sourceMappingURL=register.js.map